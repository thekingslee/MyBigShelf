import { useState } from "react";
import { Button } from "./ui/button";
import Google from "../assets/devicon_google.svg";
import { ClipLoader } from "react-spinners";
import { useCartStore } from "@/stores/cartStore";
import UserProfile from "./UserProfile";
import { useLocation } from "react-router-dom";

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useCartStore((state) => state.isAuthenticated);
  const location = useLocation();

  const handleGoogleSignIn = () => {
    setLoading(true);

    // Store current location and search params
    localStorage.setItem("preAuthPath", location.pathname);
    localStorage.setItem("preAuthParams", location.search);

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = encodeURIComponent(
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
    );
    const state = Math.random().toString(36).substring(7);

    const authorizationUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      "&response_type=code" +
      `&scope=${scope}` +
      `&state=${state}`;

    localStorage.setItem("googleOAuthState", state);
    window.location.href = authorizationUrl;
  };

  if (isAuthenticated) {
    return <UserProfile />;
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-[250px] lg:w-[280px] h-[48px] lg:flex gap-[8px] text-custom-black-50 text-lg font-medium font-bodyMediumFont px-[16px] py-[13px] bg-custom-text-primary rounded-[12px]"
    >
      {loading ? (
        <ClipLoader color="#ffffff" size={24} />
      ) : (
        <>
          <img src={Google} alt="Google Icon" />
          <p>Login with Google</p>
        </>
      )}
    </Button>
  );
};

export default GoogleSignInButton;
