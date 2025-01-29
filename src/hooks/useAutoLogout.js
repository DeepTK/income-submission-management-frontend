import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAutoLogout = (clearAuth) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decoded.exp;

        if (expirationTime > currentTime) {
          const timeLeft = (expirationTime - currentTime) * 1000;

          const timeoutId = setTimeout(() => {
            clearAuth();
          }, timeLeft);

          return () => clearTimeout(timeoutId);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
      }
    } else {
      clearAuth();
    }
  }, [clearAuth]);
};

export default useAutoLogout;
