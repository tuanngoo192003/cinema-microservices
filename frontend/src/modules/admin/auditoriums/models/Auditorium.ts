import { HttpStatusCode } from "axios";

export type Auditorium = {
  auditorium_id: number;
  auditorium_name: string;
  capacity: number;
  is_deleted: boolean;
  created_by: string;
  last_modified_by: string;
  created_at: string;
  last_modified_at: string;
};

export type SearchRequest = {
  page: number;
  pageSize: number;
};

export type Response<T> = {
  status: HttpStatusCode;
  message: string;
  data: T;
};

export type CreateRequest = {
  auditorium_name: string;
  rows: number;
  columns: number;
};
