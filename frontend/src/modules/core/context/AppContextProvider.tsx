import { AuthContextProvider } from "../../user/context/AuthContextProvider";
import { UserProvider } from "../../admin/user/context/UserContextProvider";
import { MovieContextProvider } from "../../cinema/context/MovieContextProvider";
import { MovieScheduleContextProvider } from "../../cinema/context/MovieScheduleContextProvider";
import BookingContextProvider from "../../booking/context/BookingContextProvider";
import ReservedSeatContextProvider from "../../booking/context/ReservedSeatContextProvider";
import { AuditoriumContextProvider } from "../../admin/cinema/context/AuditoriumContextProvider";
import { AdminMovieScheduleContextProvider } from "../../admin/cinema/context/AdminMovieScheduleContextProvider";
import { AdminMovieContextProvider } from "../../admin/cinema/context/AdminMovieContextProvider";
import { composeProviders } from "./composeProviders";


const providers = [
    AuthContextProvider,
    UserProvider,
    MovieContextProvider,
    MovieScheduleContextProvider,
    BookingContextProvider,
    ReservedSeatContextProvider,
    AuditoriumContextProvider,
    AdminMovieScheduleContextProvider,
    AdminMovieContextProvider,
];

export const AppContextProvider = composeProviders(providers);
