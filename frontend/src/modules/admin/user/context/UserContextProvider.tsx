import React, {useEffect, useState} from "react";
import {IProfile} from "../models/user.ts";
import { UserContext } from "./Context.tsx";
import {GetListUserAPI} from "../services";
import { IPagination } from "../../../core/models/core.ts";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<IPagination<IProfile> | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

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
    useEffect(() => {
        handleGetUserList(); // Fetch users on mount
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, handleGetUserList }}>
            {children}
        </UserContext.Provider>
    );
};