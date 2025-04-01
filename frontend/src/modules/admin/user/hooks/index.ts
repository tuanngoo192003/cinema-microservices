import { useContext } from "react";
import { UserContext } from "../context/Context";

export const useUser = () => {
    return useContext(UserContext);
};