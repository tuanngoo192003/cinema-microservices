import {IProfile} from "../models/user.ts";
import {ILoginParams} from "../models/auth.ts";
import {createContext} from "react";

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



