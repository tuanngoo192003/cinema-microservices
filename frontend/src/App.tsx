import "./index.css";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./modules/core/locales/i18n";
import {AppRouter} from "./modules/core/components/AppRouter.tsx";
import {SnackbarProvider} from "notistack";
import {AuthContextProvider} from "./modules/user/context/AuthContextProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./modules/user/context/UserContextProvider.tsx";

const App: React.FC = () => (
    <>
        <I18nextProvider i18n={i18n}>
            <SnackbarProvider>
                <BrowserRouter>
                    <AuthContextProvider>
                        <UserProvider>
                            <AppRouter/>
                        </UserProvider>
                    </AuthContextProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </I18nextProvider>
    </>
)

export default App;