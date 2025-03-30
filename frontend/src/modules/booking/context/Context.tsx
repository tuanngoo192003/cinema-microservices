import { createContext } from "react"
import { IMovieSchedule } from "../models/booking"

type BookingContextType = {
    movieSchedule: IMovieSchedule | null 
    loading: boolean 
    handleGetMovieDetails: (movieId: number) => Promise<void>
}

export const BookingContext = createContext<BookingContextType>({
    movieSchedule: null,
    loading: false,
    handleGetMovieDetails: async () => {}
})