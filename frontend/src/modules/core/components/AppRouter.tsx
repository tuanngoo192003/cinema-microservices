import {Outlet, Route, Routes} from "react-router-dom";
import LoginUI from "../../user/components/LoginUI.tsx";
import {RegisterForm} from "../../user/components/RegisterUI.tsx";
import {NavBar} from "./NavBar.tsx";
import {UserList} from "../../user/components/UserListUI.tsx";
import {Page404} from "./404.tsx";
import {HomeUI} from "../../cinema/components/HomeUI.tsx";
import {MovieDetailsUI} from "../../cinema/components/MovieDetailsUI.tsx";
import {HOME, LOGIN, MOVIE_DETAILS, PAGE404, REGISTER, USER_LIST} from "../constants/redirectURI.ts";

export const AppRouter = () => (
    <Routes>
        <Route path={PAGE404} element={<Page404/>} />
        <Route path={LOGIN} element={<LoginUI/>} />
        <Route
            path="/"
            element={
                <NavBar>
                    <Outlet/>
                </NavBar>
            }
        >
            <Route path={HOME} element={<HomeUI/>}/>
            <Route path={REGISTER} element={<RegisterForm/>} />
            <Route path={USER_LIST} element={<UserList/>} />
            <Route path={MOVIE_DETAILS} element={<MovieDetailsUI/>} />
        </Route>
    </Routes>
)