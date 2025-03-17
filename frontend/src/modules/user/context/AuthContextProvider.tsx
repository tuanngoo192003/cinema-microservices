import {useSnackbar} from "notistack";
import {ErrorResponse, useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {IProfile} from "../models/user.ts";
import Cookies from "js-cookie";
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

    const handleGetProfile = useCallback(async (id: number) => {
        setLoading(true);
        try {
            const data = await GetProfileAPI(id);
            setProfile(data);
        } catch (error) {
            HandleError(error as Error | AxiosError<ErrorResponse>);
            setProfile(null);
            setLoading(false);

            Cookies.remove(ACCESS_TOKEN_KEY);
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        setProfile(null);
        navigate("/login");
    };

    const handleLogin = async (data: ILoginParams) => {
        setLoading(true);
        try {
            const res = await LoginApi(data);
            const token = res.accessToken as unknown as string;
            const refreshToken = res.refreshToken as unknown as string;
            Cookies.set(ACCESS_TOKEN_KEY, token);
            Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
            await handleGetProfile(res.id as unknown as number);
            navigate("/");
        } catch (error) {
            const err = HandleError(error as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.error("Login failed", error);
        } finally {
            setLoading(false); // Stop loading after login attempt
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