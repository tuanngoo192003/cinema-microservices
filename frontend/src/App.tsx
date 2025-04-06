import "./index.css";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./modules/core/locales/i18n";
import { AppRouter } from "./modules/core/components/AppRouter.tsx";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./modules/core/context/AppContextProvider.tsx";

const App: React.FC = () => (
    <>
        <I18nextProvider i18n={i18n}>
            <SnackbarProvider>
                <BrowserRouter>
                    <AppContextProvider>
                        <AppRouter />
                    </AppContextProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </I18nextProvider>
    </>
)

export default App;