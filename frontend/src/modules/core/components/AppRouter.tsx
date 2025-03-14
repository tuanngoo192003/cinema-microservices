import {Outlet, Route, Routes} from "react-router-dom";
import LoginUI from "../../user/components/LoginUI.tsx";
import {RegisterForm} from "../../user/components/RegisterUI.tsx";
import {NavBar} from "./NavBar.tsx";
import {UserList} from "../../user/components/UserListUI.tsx";
import {Page404} from "./404.tsx";

export const AppRouter = () => (
    <Routes>
        <Route path="/404" element={<Page404/>} />
        <Route path="/login" element={<LoginUI/>} />
        <Route
            path="/"
            element={
                <NavBar>
                    <Outlet/>
                </NavBar>
            }
        >
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/user/list" element={<UserList/>} />
        </Route>
    </Routes>
)