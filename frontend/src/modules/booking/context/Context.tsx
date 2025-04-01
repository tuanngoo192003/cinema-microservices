import { createContext } from "react"
import { IBookingParam, IMovieSchedule } from "../models/booking"
import { IReservedSeat, IReservedSeatParam, IReservedSeatSearch } from "../models/reserved_seat"

type BookingContextType = {
    movieSchedule: IMovieSchedule | null 
    loading: boolean 
    handleGetMovieDetails: (movieId: number) => Promise<void>
    handleBooking: (body: IBookingParam, id: number) => Promise<void>
}

export const BookingContext = createContext<BookingContextType>({
    movieSchedule: null,
    loading: false,
    handleGetMovieDetails: async () => {},
    handleBooking: async () => {}
})

type ReservedSeatType = {
    reservedSeat: IReservedSeat | null 
    loading: boolean 
    handleReservedSeat: (body: IReservedSeatParam) => Promise<void>
    handleGetResevedSeat: (search: IReservedSeatSearch) => Promise<void>
    handleRemoveReservedSeat: (id: number) => Promise<void>
}

export const ReservedSeatContext = createContext<ReservedSeatType>({
    reservedSeat: null,
    loading: false, 
    handleReservedSeat: async () => {},
    handleGetResevedSeat: async () => {},
    handleRemoveReservedSeat: async () => {},
})