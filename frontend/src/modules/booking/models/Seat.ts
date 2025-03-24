import { HttpStatusCode } from "axios";

export type Seat = {
  id: string;
  status: "AVAILABLE" | "RESERVED" | "BOOKED" | "CHOOSED";
};

export type ReservedSeatResponse = {
  status: HttpStatusCode;
  message: string;
};

export type ReservedSeatRequest = {
  movieId: string;
  seatId: string;
};
