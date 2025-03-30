import { useContext } from "react";
import { BookingContext } from "../context/Context";

export const useBooking = () => {
    return useContext(BookingContext)
}