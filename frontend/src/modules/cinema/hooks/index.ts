import { useContext } from "react"
import { CinemaContext } from "../context/Context"

export const useMovie = () => {
    return useContext(CinemaContext)
}