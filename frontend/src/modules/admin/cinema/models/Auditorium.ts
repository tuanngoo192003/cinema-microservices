
export interface IAuditorium {
    auditorium_id: number;
    auditorium_name: string;
    rows: number;
    columns: number;
    is_deleted: boolean;
    created_by: string;
    last_modified_by: string;
    created_at: string;
    last_modified_at: string;
  };
  
  export interface IAuditoriumParam {
    auditorium_name: string;
    rows: number;
    columns: number;
  }
  