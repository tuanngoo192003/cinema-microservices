import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../constants/storage";
import { LOGIN } from "../constants/redirectURI";

interface RequireLoginProps {
    children: React.ReactNode
}

const RequireLogin: React.FC<{ children: React.ReactNode }> = ({ children }: RequireLoginProps) => {

    const navigate = useNavigate();

    const [isUserLogin, setIsUserLogin] = useState(
      !!Cookies.get(ACCESS_TOKEN_KEY)
    );
  
    useEffect(() => {
      const checkAuth = () => {
        setIsUserLogin(!!Cookies.get(ACCESS_TOKEN_KEY));
      };
  
      window.addEventListener("storage", checkAuth);
      return () => {
        window.removeEventListener("storage", checkAuth);
      };
    }, []);
  
    useEffect(() => {
      if (!isUserLogin) {
        navigate(LOGIN, { replace: true });
      }
    }, [isUserLogin, location.pathname, navigate]);

    return (
        <>
            {isUserLogin ? (<>
                {children}
            </>) : (<></>)}
        </>

    )
}

export default RequireLogin