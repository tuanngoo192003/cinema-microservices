import { useContext } from "react";
import { BookingContext, ReservedSeatContext } from "../context/Context";

export const useBooking = () => {
    return useContext(BookingContext)
}

export const useReservedSeat = () => {
    return useContext(ReservedSeatContext)
}