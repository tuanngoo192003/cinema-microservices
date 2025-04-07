export interface IMovieSchedule {
    id: number
    movieId: number
    movieName: string 
    auditoriumId: number
    auditoriumName: string 
    startAt: string
    endAt: string
    scheduleStatus: string
    seatLeft: number
}

export interface IMovieScheduleTab {
    ScheduleID: number 
    AuditoriumID: number; 
    StartAt: string; 
    EndAt: string; 
    SeatLeft: number
}

export function transformMovieSchedules(schedules: IMovieSchedule[]): Record<number, IMovieScheduleTab[]> {
    return schedules.reduce((acc, schedule) => {
        if (!acc[schedule.id]) {
            acc[schedule.id] = [];
        }

        acc[schedule.id].push({
            ScheduleID: schedule.id,
            AuditoriumID: schedule.auditoriumId,
            StartAt: schedule.startAt,
            EndAt: schedule.endAt,
            SeatLeft: schedule.seatLeft
        });
        return acc;
    }, {} as Record<number, IMovieScheduleTab[]>);
}