import { useContext } from "react";
import {AuthContext, UserContext} from "../context/Context.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useUser = () => {
    return useContext(UserContext);
};