import { IPagination } from "../../../core/models/core";
import { Auditorium, SearchRequest } from "../models/Auditorium";

const data: Auditorium[] = [
  {
    auditorium_id: 1,
    auditorium_name: "Main Hall",
    capacity: 300,
    is_deleted: true,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 2,
    auditorium_name: "Small Theater",
    capacity: 150,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 3,
    auditorium_name: "Conference Room A",
    capacity: 80,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 4,
    auditorium_name: "Conference Room B",
    capacity: 100,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 5,
    auditorium_name: "Lecture Hall 1",
    capacity: 200,
    is_deleted: false,
    created_by: "User1",
    last_modified_by: "User2",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 6,
    auditorium_name: "Lecture Hall 2",
    capacity: 220,
    is_deleted: false,
    created_by: "User3",
    last_modified_by: "User4",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 7,
    auditorium_name: "Cinema Hall",
    capacity: 500,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 8,
    auditorium_name: "Exhibition Hall",
    capacity: 400,
    is_deleted: false,
    created_by: "User5",
    last_modified_by: "User6",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 9,
    auditorium_name: "Music Hall",
    capacity: 350,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 10,
    auditorium_name: "Sports Arena",
    capacity: 1000,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 11,
    auditorium_name: "Sports Arena",
    capacity: 1000,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
];

export const GetAuditoriumsList = (
  request: SearchRequest
): Promise<IPagination<Auditorium>> => {
  return new Promise((resolve) => {
    console.log(`Call API with request: ${JSON.stringify(request)}`);

    const { page, pageSize } = request;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(startIndex, endIndex);
    const totalRecord = data.length;
    const totalPage = Math.ceil(totalRecord / pageSize);

    setTimeout(
      () =>
        resolve({
          data: paginatedData,
          page,
          perpage: pageSize,
          totalPage,
          totalRecord,
        }),
      1000
    );
  });
};
