import { useContext } from "react";
import { AuditoriumContext } from "../context/Context";

export const useAuditorium = () => {
    return useContext(AuditoriumContext)
}