import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PRESERVED_PARAMS = ["affiliate", "haul", "order-id"];
const AUTH_PATH = "/auth/google/callback";
const STORAGE_KEY = "preservedParams";

const PreserveParamsWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialFilteredParams = React.useRef("");

  useEffect(() => {
    if (location.pathname.includes(AUTH_PATH)) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const filteredParams = new URLSearchParams();

    PRESERVED_PARAMS.forEach((param) => {
      const value = searchParams.get(param);
      if (value !== null) {
        filteredParams.set(param, value);
      }
    });

    const filteredParamsString = filteredParams.toString();

    // On first render with params, store them
    if (!initialFilteredParams.current && filteredParamsString) {
      initialFilteredParams.current = filteredParamsString;
      // Store in sessionStorage for the current browser session
      sessionStorage.setItem(STORAGE_KEY, filteredParamsString);
    }

    // If we've lost our params (like after auth), try to restore them
    if (!hasPreservedParams(location.search)) {
      const paramsToRestore =
        initialFilteredParams.current ||
        sessionStorage.getItem(STORAGE_KEY);

      if (paramsToRestore) {
        navigate(
          {
            pathname: location.pathname,
            search: paramsToRestore,
          },
          { replace: true }
        );
      }
    }
  }, [location.pathname, location.search, navigate]);

  const hasPreservedParams = (search: string): boolean => {
    const searchParams = new URLSearchParams(search);
    return PRESERVED_PARAMS.some((param) => searchParams.has(param));
  };

  return <Outlet />;
};

export default PreserveParamsWrapper;