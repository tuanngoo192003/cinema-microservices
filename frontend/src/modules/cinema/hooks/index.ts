import { useContext } from "react"
import { CinemaContext, MovieScheduleContext } from "../context/Context"

export const useMovie = () => {
    return useContext(CinemaContext)
}

export const useMovieSchedule = () => {
    return useContext(MovieScheduleContext)
}