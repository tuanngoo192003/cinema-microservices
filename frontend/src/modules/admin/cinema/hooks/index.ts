import { useContext } from "react";
import { AuditoriumContext, AdminMovieContext, AdminMovieScheduleContext } from "../context/Context";

export const useAuditorium = () => {
    return useContext(AuditoriumContext)
}

export const useMovie = () => {
    return useContext(AdminMovieContext)
}

export const useMovieSchedule = () => {
    return useContext(AdminMovieScheduleContext)
} 