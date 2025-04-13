import { useContext } from "react";
import {AuthContext} from "../context/Context.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};