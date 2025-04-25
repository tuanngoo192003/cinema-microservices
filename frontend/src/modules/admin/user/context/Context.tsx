import { createContext } from "react";
import { IPagination } from "../../../core/models/core";
import { IProfile } from "../models/user";

type UserContextType = {
    users: IPagination<IProfile> | null;
    loading: boolean
    handleGetUserList: (search: string, page: number, perpage: number) => Promise<void>
}

export const UserContext = createContext<UserContextType>({
    users: null,
    loading: false,
    handleGetUserList: async () => {},
})