import { useContext } from "react";
import { AuditoriumContext, MovieContext, MovieScheduleContext } from "../context/Context";

export const useAuditorium = () => {
    return useContext(AuditoriumContext)
}

export const useMovie = () => {
    return useContext(MovieContext)
}

export const useMovieSchedule = () => {
    return useContext(MovieScheduleContext)
} 