import "./index.css";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./modules/core/locales/i18n";
import { AppRouter } from "./modules/core/components/AppRouter.tsx";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./modules/user/context/AuthContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { MovieContextProvider } from "./modules/cinema/context/MovieContextProvider.tsx";
import { MovieScheduleContextProvider } from "./modules/cinema/context/MovieScheduleContextProvider.tsx";
import { UserProvider } from "./modules/admin/user/context/UserContextProvider.tsx";
import { AuditoriumContextProvider } from "./modules/admin/cinema/context/AuditoriumContextProvider.tsx";
import { AdminMovieContextProvider } from "./modules/admin/cinema/context/AdminMovieContextProvider.tsx";
import { AdminMovieScheduleContextProvider } from "./modules/admin/cinema/context/AdminMovieScheduleContextProvider.tsx";
import BookingContextProvider from "./modules/booking/context/BookingContextProvider.tsx";
import ReservedSeatContextProvider from "./modules/booking/context/ReservedSeatContextProvider.tsx";

const App: React.FC = () => (
    <>
        <I18nextProvider i18n={i18n}>
            <SnackbarProvider>
                <BrowserRouter>
                    <AuthContextProvider>
                        <UserProvider>
                            <MovieContextProvider>
                                <MovieScheduleContextProvider>
                                    <BookingContextProvider>
                                        <ReservedSeatContextProvider>
                                            <AuditoriumContextProvider>
                                                <AdminMovieScheduleContextProvider>
                                                    <AdminMovieContextProvider>
                                                        <AppRouter />
                                                    </AdminMovieContextProvider>
                                                </AdminMovieScheduleContextProvider>
                                            </AuditoriumContextProvider>
                                        </ReservedSeatContextProvider>
                                    </BookingContextProvider>
                                </MovieScheduleContextProvider>
                            </MovieContextProvider>
                        </UserProvider>
                    </AuthContextProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </I18nextProvider>
    </>
)

export default App;