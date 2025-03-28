import { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar.tsx";
import { Page404 } from "./404.tsx";
import AdminSideBar from "./AdminSideBar.tsx";
import {
  ADMIN_AUDITORIUMS,
  ADMIN_AUDITORIUMS_CREATE,
  ADMIN_AUDITORIUMS_UPDATE,
  ADMIN_USERS,
  BOOKING,
  HOME,
  LOGIN,
  MOVIE_DETAILS,
  PAGE403,
  PAGE404,
  REGISTER,
  USER_LIST,
} from "../constants/redirectURI.ts";
import { Page403 } from "./403.tsx";

const LoginUI = lazy(() => import("../../user/components/LoginUI.tsx"));
const RegisterForm = lazy(() => import("../../user/components/RegisterUI.tsx"));
const UserList = lazy(() => import("../../admin/user/components/UserListUI.tsx"));
const HomeUI = lazy(() => import("../../cinema/components/HomeUI.tsx"));
const MovieDetailsUI = lazy(
  () => import("../../cinema/components/MovieDetailsUI.tsx")
);
const BookingUI = lazy(() => import("../../booking/components/BookingUI.tsx"));
const AuditoriumsList = lazy(
  () => import("../../admin/cinema/components/AuditoriumsList.tsx")
);
const UsersList = lazy(
  () => import("../../admin/user/components/UserListUI.tsx")
);
const AuditoriumCreate = lazy(
  () => import("../../admin/cinema/components/AuditoriumCreate.tsx")
);
const AuditoriumUpdate = lazy(
  () => import("../../admin/cinema/components/AuditoriumUpdate.tsx")
);

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path={PAGE404} element={<Page404 />} />
      <Route path={PAGE403} element={<Page403 />} />
      <Route path={LOGIN} element={<LoginUI />} />
      <Route
        path="/"
        element={
          <NavBar>
            <Outlet />
          </NavBar>
        }
      >
        <Route path={HOME} element={<HomeUI />} />
        <Route path={REGISTER} element={<RegisterForm />} />
        <Route path={USER_LIST} element={<UserList />} />
        <Route path={MOVIE_DETAILS} element={<MovieDetailsUI />} />
        <Route path={BOOKING} element={<BookingUI />} />
      </Route>
      <Route
        path="/admin/"
        element={
          <AdminSideBar>
            <Outlet />
          </AdminSideBar>
        }
      >
        <Route path={ADMIN_AUDITORIUMS} element={<AuditoriumsList />} />
        <Route path={ADMIN_AUDITORIUMS_CREATE} element={<AuditoriumCreate />} />
        <Route path={ADMIN_AUDITORIUMS_UPDATE} element={<AuditoriumUpdate />} />
        <Route path={ADMIN_USERS} element={<UsersList />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  </Suspense>
);
