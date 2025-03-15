import {useSnackbar} from "notistack";
import {ErrorResponse, useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {IProfile} from "../models/user.ts";
import {GetProfileAPI, LoginApi} from "../services";
import {HandleError} from "../../core/services/axios.ts";
import {AxiosError} from "axios";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../../core/constants/storage.ts";
import {ILoginParams} from "../models/auth.ts";
import {LoadingPage} from "../../core/components/LoadingPage.tsx";
import {AuthContext} from "./AuthContext.tsx";

interface AuthProfileProps {
    children?: React.ReactNode
}

export function AuthContextProvider({children}: AuthProfileProps) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<IProfile | null>(null);

    const handleGetProfile = useCallback(async () => {
        try {
            const data = await GetProfileAPI();
            setProfile(data);
        } catch (error) {
            HandleError(error as Error | AxiosError<ErrorResponse>);
            setProfile(null);
            setLoading(false);

            localStorage.removeItem("access_token");
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        setProfile(null);
        navigate("/login");
    };

    const handleLogin = async (data: ILoginParams) => {
        try {
            const res = await LoginApi(data);
            const token = res.accessToken as unknown as string;
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
            await handleGetProfile();
            navigate("/");
        } catch (error) {
            const err = HandleError(error as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.error("Login failed", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                profile,
                handleLogin,
                handleLogout,
            }}
        >
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
}