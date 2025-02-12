import React, { useEffect } from "react";
import axios from "axios";

const useVisitorTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
    let visitorId = localStorage.getItem("visitorId");
    const currentPath = window.location.pathname;

    const trackVisit = async () => {
      try {
        if (!visitorId) {
          visitorId = "v_" + Math.random().toString(36).substr(2, 9);
          localStorage.setItem("visitorId", visitorId);
        }

        const ua = navigator.userAgent;
        const deviceInfo = {
          type: /Mobile|Android|iPhone/i.test(ua) ? "mobile" : "desktop",
          browser: getBrowserInfo(),
          os: getOSInfo(),
        };

        await axios.post(`${process.env.REACT_APP_API_URL}visitor/track`, {
          visitorId,
          path: currentPath,
          device: deviceInfo,
        });
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    const trackTime = async () => {
      try {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);

        await axios.post(`${process.env.REACT_APP_API_URL}visitor/track-time`, {
          visitorId,
          path: currentPath,
          timeSpent,
        });
      } catch (error) {
        console.error("Error tracking time:", error);
      }
    };

    trackVisit();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackTime();
      } else {
        startTime = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      trackTime();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      trackTime();
    };
  }, []);

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Other";
  };

  const getOSInfo = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "MacOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iOS")) return "iOS";
    return "Other";
  };
};

const VisitorTracker = ({ children }) => {
  useVisitorTracking();
  return <>{children}</>;
};

export default VisitorTracker;
