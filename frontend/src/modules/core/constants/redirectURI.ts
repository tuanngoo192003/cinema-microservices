/* public pages */
export const HOME = "/home";
export const REGISTER = "/register";
export const LOGIN = "/login";
export const PAGE404 = "/404";
export const PAGE403 = "/403"

/* user pages */
export const PROFILE = "/profile";
export const USER_LIST = "/user/list";
export const MY_BOOKING_LIST = "/user/booking"

/* cinema pages */
export const MOVIE_DETAILS_FORMAT_URI = (id: number) => `/movie/details/${id}`;
export const MOVIE_DETAILS = "/movie/details/:id";

/* booking pages */
export const BOOKING_FORMAT_URI = (id: number) => `/booking/${id}`;
export const BOOKING = "/booking/:id";

/* admin pages */
export const ADMIN_DASHBOARD = "/admin/"
export const ADMIN_AUDITORIUMS = "/admin/auditoriums";
export const ADMIN_USERS = "/admin/users";

export const ADMIN_AUDITORIUMS_CREATE = "/admin/auditoriums/create";
export const ADMIN_AUDITORIUMS_UPDATE = "/admin/auditoriums/:id";
export const ADMIN_AUDITORIUMS_UPDATE_FORMAT_URI = (id: number) =>
  `/admin/auditoriums/${id}`;

export const ADMIN_MOVIES = "/admin/movies"
export const ADMIN_MOVIES_CREATE = "/admin/movies/create"
export const ADMIN_MOVIES_UPDATE = "/admin/movies/:id"
export const ADMIN_MOVIES_UPDATE_FORMAT_URI = (id: number) => 
  `/admin/movies/${id}`;

export const ADMIN_MOVIE_SCHEDULES = "/admin/movie-schedules"
export const ADMIN_MOVIE_SCHEDULES_CREATE = "/admin/movie-schedules/create"
export const ADMIN_MOVIE_SCHEDULES_UPDATE = "/admin/movie-schedules/:id"
export const ADMIN_MOVIE_SCHEDULES_UPDATE_FORMAT_URI = (id: number) => 
  `/admin/movies/${id}`;


