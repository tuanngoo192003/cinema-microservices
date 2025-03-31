package job

import (
	"cinema-service/internal/repo"
	"cinema-service/internal/usecase"

	"gorm.io/gorm"
)

func SetupJob(db *gorm.DB) {
	// Initialize the job scheduler and add the reserved seat cleanup job
	usecaseReservedSeat := usecase.NewReservedSeatUsecase(repo.NewReservedSeatRepo(db))
	reservedSeatCleanupJob := NewReservedSeatCleanupJob(usecaseReservedSeat)
	usecaseSchedule := usecase.NewScheduleUsecase(repo.NewScheduleRepo(db))
	expiredScheduleJob := NewExpiredScheduleJob(usecaseSchedule)
	go expiredScheduleJob.Run()
	go reservedSeatCleanupJob.Run()
}
