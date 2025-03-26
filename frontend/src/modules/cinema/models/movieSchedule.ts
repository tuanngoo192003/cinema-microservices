export interface IMovieSchedule {
    ScheduleID: number 
    MovieID: number
    AuditoriumID: number 
    StartAt: Date
    EndAt: Date
    ScheduleStatus: string
    SeatLeft: number
}

export function transformMovieSchedules(schedules: IMovieSchedule[]): Record<number, { AuditoriumID: number; startAt: Date; endAt: Date; seatLeft: number }[]> {
    return schedules.reduce((acc, schedule) => {
        if (!acc[schedule.ScheduleID]) {
            acc[schedule.ScheduleID] = [];
        }

        acc[schedule.ScheduleID].push({
            AuditoriumID: schedule.AuditoriumID,
            startAt: schedule.StartAt,
            endAt: schedule.EndAt,
            seatLeft: schedule.SeatLeft
        });

        return acc;
    }, {} as Record<number, { AuditoriumID: number; startAt: Date; endAt: Date; seatLeft: number }[]>);
}