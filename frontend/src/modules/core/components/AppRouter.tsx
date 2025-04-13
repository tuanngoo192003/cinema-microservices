import { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar.tsx";
import { Page404 } from "./404.tsx";
import AdminSideBar from "./AdminSideBar.tsx";
import {
  ADMIN_AUDITORIUMS,
  ADMIN_AUDITORIUMS_CREATE,
  ADMIN_AUDITORIUMS_UPDATE,
  ADMIN_MOVIE_SCHEDULES,
  ADMIN_MOVIE_SCHEDULES_CREATE,
  ADMIN_MOVIE_SCHEDULES_UPDATE,
  ADMIN_MOVIES,
  ADMIN_MOVIES_CREATE,
  ADMIN_MOVIES_UPDATE,
  ADMIN_USERS,
  BOOKING,
  HOME,
  LOGIN,
  MOVIE_DETAILS,
  MY_BOOKING_LIST,
  PAGE403,
  PAGE404,
  PROFILE,
  REGISTER,
  USER_LIST,
} from "../constants/redirectURI.ts";
import { Page403 } from "./403.tsx";
import MyBookingListUI from "../../booking/components/MyBookingListUI.tsx";

const RequireAdmin = lazy(() => import("../../core/components/RequireAdmin.tsx"))
const RequireLogin = lazy(() => import("../../core/components/RequireLogin.tsx"))
const LoginUI = lazy(() => import("../../user/components/LoginUI.tsx"));
const RegisterForm = lazy(() => import("../../user/components/RegisterUI.tsx"));
const UserList = lazy(() => import("../../admin/user/components/UserListUI.tsx"));
const HomeUI = lazy(() => import("../../cinema/components/HomeUI.tsx"));
const MovieDetailsUI = lazy(
  () => import("../../cinema/components/MovieDetailsUI.tsx")
);
const BookingUI = lazy(() => import("../../booking/components/BookingUI.tsx"));
const AuditoriumsList = lazy(
  () => import("../../admin/cinema/components/AuditoriumsListUI.tsx")
);
const UsersList = lazy(
  () => import("../../admin/user/components/UserListUI.tsx")
);
const AuditoriumCreate = lazy(
  () => import("../../admin/cinema/components/AuditoriumCreateUI.tsx")
);
const AuditoriumUpdate = lazy(
  () => import("../../admin/cinema/components/AuditoriumUpdateUI.tsx")
);
const MovieList = lazy(
  () => import("../../admin/cinema/components/MovieListUI.tsx")
);
const MovieCreate = lazy(
  () => import("../../admin/cinema/components/MovieCreateUI.tsx")
);
const MovieUpdate = lazy(
  () => import("../../admin/cinema/components/MovieUpdateUI.tsx")
);
const MovieScheduleList = lazy(
  () => import("../../admin/cinema/components/MovieScheduleListUI.tsx")
);
const MovieScheduleCreate = lazy(
  () => import("../../admin/cinema/components/MovieScheduleCreateUI.tsx")
);
const MovieScheduleUpdate = lazy(
  () => import("../../admin/cinema/components/MovieScheduleUpdateUI.tsx")
);
const ProfileUI = lazy(
  () => import("../../user/components/ProfileUI.tsx")
)

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
        <Route path={BOOKING} element={<RequireLogin> <BookingUI /> </RequireLogin>} />
        <Route path={PROFILE} element={<RequireLogin> <ProfileUI /> </RequireLogin>} />
        <Route path={MY_BOOKING_LIST} element={<RequireLogin> <MyBookingListUI /> </RequireLogin>} />
      </Route>
      <Route
        path="/admin/"
        element={
          <RequireAdmin>
            <AdminSideBar>
              <Outlet />
            </AdminSideBar>
          </RequireAdmin>
        }
      >
        <Route path={ADMIN_AUDITORIUMS} element={<AuditoriumsList />} />
        <Route path={ADMIN_AUDITORIUMS_CREATE} element={<AuditoriumCreate />} />
        <Route path={ADMIN_AUDITORIUMS_UPDATE} element={<AuditoriumUpdate />} />
        <Route path={ADMIN_USERS} element={<UsersList />} />
        <Route path={ADMIN_MOVIES} element={<MovieList />} />
        <Route path={ADMIN_MOVIES_CREATE} element={<MovieCreate />} />
        <Route path={ADMIN_MOVIES_UPDATE} element={<MovieUpdate />} />
        <Route path={ADMIN_MOVIE_SCHEDULES} element={<MovieScheduleList />} />
        <Route path={ADMIN_MOVIE_SCHEDULES_CREATE} element={<MovieScheduleCreate />} />
        <Route path={ADMIN_MOVIE_SCHEDULES_UPDATE} element={<MovieScheduleUpdate />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  </Suspense>
);
