/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';
import { axiosInstance } from '@/services/api-client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUserProfile } = useCartStore();
  const authAttempted = useRef(false);

  const override: CSSProperties = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const getGoogleUserProfile = async (authorizationCode: string) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    const redirectUri = `${window.location.origin}/auth/google/callback`;

    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: authorizationCode,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;
      const profileResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return profileResponse.data;
    } catch (error) {
      console.error('Error in getGoogleUserProfile:', error);
      throw error;
    }
  };

  const sendProfileToBackend = async (userProfile: any) => {
    try {
      const response = await axiosInstance.post('/auth/google', userProfile, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending profile to backend:', error);
      throw error;
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      if (authAttempted.current) return;
      authAttempted.current = true;

      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = localStorage.getItem('googleOAuthState');

      const preAuthPath = localStorage.getItem('preAuthPath') || '/';
      const preAuthParams = localStorage.getItem('preAuthParams') || '';

      if (state !== storedState) {
        setError('State mismatch. Possible CSRF attack.');
        navigate('/');
        return;
      }

      if (code) {
        try {
          const userProfile = await getGoogleUserProfile(code);
          const backendResponse = await sendProfileToBackend(userProfile);

          if (backendResponse.token) {
            localStorage.setItem('jwt', backendResponse.token);

            // Set user profile first
            setUserProfile({
              name: userProfile.name,
              email: userProfile.email,
              picture: userProfile.picture,
            });

            // Then trigger authentication (which will handle cart sync)
            await setIsAuthenticated(true);

            navigate(`${preAuthPath}${preAuthParams}`);
          } else {
            console.warn('No token received from backend');
            navigate('/');
          }
        } catch (error) {
          console.error('Authentication failed', error);
          setError('Authentication failed. Please try again.');
          navigate('/');
        }
      } else {
        setError('No authentication code received');
        navigate('/');
      }

      localStorage.removeItem('googleOAuthState');
      localStorage.removeItem('preAuthPath');
      localStorage.removeItem('preAuthParams');
    };

    handleCallback();
  }, [location, navigate, setIsAuthenticated, setUserProfile]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ScaleLoader
        color="#1E1E1E"
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default AuthCallback;
