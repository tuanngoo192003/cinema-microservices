import {IProfile, IUserParam} from "../models/user.ts";
import {ILoginParams} from "../models/auth.ts";
import {createContext} from "react";
import {IPagination} from "../../core/models/core.ts";

type AuthContextType = {
    profile: IProfile | null;
    loading: boolean
    handleLogin: (data: ILoginParams) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    profile: null,
    loading: false, // Change to false
    handleLogin: async () => {},
    handleLogout: () => {},
});

type UserContextType = {
    users: IPagination<IProfile> | null;
    loading: boolean
    handleGetUserList: (search: string, page: number, perpage: number) => Promise<void>
    handleCreateUser: (body: IUserParam) => Promise<void>
}

export const UserContext = createContext<UserContextType>({
    users: null,
    loading: false,
    handleGetUserList: async () => {},
    handleCreateUser: async () => {},
})



