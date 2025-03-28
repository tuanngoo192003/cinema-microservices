import { HttpStatusCode } from "axios";

export type IResponse<T> = {
    status: HttpStatusCode;
    message: string;
    data: T;
};

export type IPaging = {
    page: number;
    total: number;
    limit: number;
};

export type IPagination<T> = {
    data: T[];
    page: number;
    perpage: number;
    totalPage: number;
    totalRecord: number;
};
