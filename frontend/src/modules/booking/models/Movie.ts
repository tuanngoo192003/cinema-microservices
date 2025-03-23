export type MovieDetailResponse = {
  movieId: string;
  name: string;
  genre: string;
  timeInMinute: number;
  startAt: string;
  auditorium: string;
  rows: string;
  colums: number;
  booked: string[];
  reserved: string[];
};
