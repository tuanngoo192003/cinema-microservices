import { useSnackbar } from "notistack";
import { ErrorResponse, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IProfile, IUserParam } from "../models/user.ts";
import Cookies from "js-cookie";
import { GetProfileAPI, LoginApi, RegisterUserAPI } from "../services";
import { HandleError } from "../../core/services/axios.ts";
import { AxiosError } from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../core/constants/storage.ts";
import { ILoginParams } from "../models/auth.ts";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";
import { AuthContext } from "./Context.tsx";
import { useTranslation } from "react-i18next";

interface AuthProfileProps {
    children?: React.ReactNode
}

export function AuthContextProvider({ children }: AuthProfileProps) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<IProfile | null>(() => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile ? JSON.parse(storedProfile) : null;
    });

    const updateProfile = (profileData: IProfile | null) => {
        if (profileData) {
            localStorage.setItem("profile", JSON.stringify(profileData));
        } else {
            localStorage.removeItem("profile");
        }
        setProfile(profileData);
    };

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        updateProfile(null);
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

            const profileData = await GetProfileAPI(res.id as unknown as number);
            updateProfile(profileData);
            navigate("/home");
        } catch (error) {
            const err = HandleError(error as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.error("Login failed", error);
            handleLogout()
        } finally {
            setLoading(false); // Stop loading after login attempt
        }
    };

    const handleRegister = async (body: IUserParam) => {
        setLoading(true);
        try {
            const response = await RegisterUserAPI(body)
            console.log(response)
            enqueueSnackbar(t('labels.success'), { variant: "success" });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            const err = HandleError(error as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.error("Error fetching user list", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                profile,
                handleLogin,
                handleLogout,
                handleRegister,
            }}
        >
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
}