import React, {useEffect, useState} from "react";
import {IPagination} from "../../core/models/core.ts";
import {IProfile, IUserParam} from "../models/user.ts";
import { UserContext } from "./Context.tsx";
import {GetListUserAPI, RegisterUserAPI} from "../services";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<IPagination<IProfile> | null>(null);
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleGetUserList = async (search: string = "", page: number = 1, perpage: number = 15) => {
        setLoading(true);
        try {
            const response = await GetListUserAPI(search, page, perpage);
            setUsers(response);
        } catch (error) {
            console.error("Error fetching user list", error);
        } finally {
            setLoading(false);
        }
    };
    const handleCreateUser = async (body: IUserParam) => {
        setLoading(true);
        try {
            const response = await RegisterUserAPI(body)
            console.log(response)
            enqueueSnackbar(t('labels.success'), { variant: "success" });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error fetching user list", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetUserList(); // Fetch users on mount
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, handleGetUserList, handleCreateUser }}>
            {children}
        </UserContext.Provider>
    );
};