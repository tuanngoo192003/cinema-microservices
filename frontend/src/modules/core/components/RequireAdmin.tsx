import React, { useEffect } from "react";
import { useAuth } from "../../user/hooks";
import { useNavigate } from "react-router-dom";
import { PAGE403 } from "../constants/redirectURI";

interface RequireAdminProps {
    children: React.ReactNode
}

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }: RequireAdminProps) => {

    const { profile } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = () => {
            if (profile?.role != 'ADMIN') {
                navigate(PAGE403)
            }
            if (!profile) {
                navigate(PAGE403)
            }
        };

        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    return (
        <>
            {profile ? (<>
                {children}
            </>) : (<></>)}
        </>

    )
}

export default RequireAdmin