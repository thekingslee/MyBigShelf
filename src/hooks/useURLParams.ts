/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useCallback, useRef, useMemo } from "react";

interface URLParamsConfig {
  [key: string]: {
    type?: "string" | "boolean" | "number";
    default?: any;
    transform?: (value: any) => any;
  };
}

export const useURLParams = <T extends Record<string, any>>(
  config: URLParamsConfig = {}
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const previousParams = useRef<string>("");

  // Parse URL params based on config
  const parseURLParams = useCallback(() => {
    const parsedParams: Record<string, any> = {};

    // Get all parameters from URL
    for (const [key, value] of searchParams.entries()) {
      const paramConfig = config[key] || { type: "string" };

      let parsedValue: any = value;

      // Transform value based on type
      switch (paramConfig.type) {
        case "boolean":
          parsedValue = value === "true";
          break;
        case "number":
          parsedValue = parseFloat(value);
          break;
        default:
          // Apply custom transform if provided
          if (paramConfig.transform) {
            parsedValue = paramConfig.transform(value);
          }
          // Remove quotes if string
          if (typeof parsedValue === "string") {
            parsedValue = parsedValue.replace(/['"]+/g, "");
          }
      }

      parsedParams[key] = parsedValue;
    }

    // Add default values for missing parameters
    Object.entries(config).forEach(([key, conf]) => {
      if (!(key in parsedParams) && "default" in conf) {
        parsedParams[key] = conf.default;
      }
    });

    return parsedParams as T;
  }, [searchParams, config]);

  // Update URL when params change
  const updateURLParams = useCallback(
    (updates: Partial<T>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      const newParamsString = newParams.toString();
      if (previousParams.current !== newParamsString) {
        previousParams.current = newParamsString;
        setSearchParams(newParams);
      }
    },
    [searchParams, setSearchParams]
  );

  // Get current params without triggering re-render
  const getCurrentParams = useCallback(() => {
    return parseURLParams();
  }, [parseURLParams]);

  // Get full current URL including search params
  const currentURL = useMemo(() => {
    const baseURL = window.location.origin + window.location.pathname;
    const searchString = searchParams.toString();
    return searchString ? `${baseURL}?${searchString}` : baseURL;
  }, [searchParams]);

  return {
    params: parseURLParams(),
    updateParams: updateURLParams,
    getCurrentParams,
    searchParams,
    setSearchParams,
    currentURL,
  };
};
