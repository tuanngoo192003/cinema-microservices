/* public pages */
export const HOME = "/home";
export const REGISTER = "/register";
export const LOGIN = "/login";
export const PAGE404 = "/404";

/* user pages */
export const PROFILES = "/profile";
export const USER_LIST = "/user/list";

/* cinema pages */
export const MOVIE_DETAILS_FORMAT_URI = (id: number) => `/movie/details/${id}`;
export const MOVIE_DETAILS = "/movie/details/:id";

/* booking pages */
export const BOOKING_FORMAT_URI = (id: number) => `/booking/${id}`;
export const BOOKING = "/booking/:id";

export const ADMIN_AUDITORIUMS = "/admin/auditoriums";
export const ADMIN_USERS = "/admin/users";
export const ADMIN_AUDITORIUMS_CREATE = "/admin/auditoriums/create";
export const ADMIN_AUDITORIUMS_UPDATE = "/admin/auditoriums/:id";
export const ADMIN_AUDITORIUMS_UPDATE_FORMAT_URI = (id: number) =>
  `/admin/auditoriums/${id}`;
