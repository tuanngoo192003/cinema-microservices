package job

import (
	"cinema-service/internal/usecase"
	"fmt"
	"strconv"

	"github.com/robfig/cron/v3"
)

type ReservedSeatCleanupJob struct {
	usecase *usecase.ReservedSeatUseCase
}

func NewReservedSeatCleanupJob(reservedSeatUseCase *usecase.ReservedSeatUseCase) *ReservedSeatCleanupJob {
	return &ReservedSeatCleanupJob{usecase: reservedSeatUseCase}
}

func (j *ReservedSeatCleanupJob) Run() {
	cJob := cron.New()
	duration := 5
	cronSpec := "*/" + strconv.Itoa(duration) + " * * * *"
	cJob.AddFunc(cronSpec, func() {
		fmt.Println("🔹 Running expired seat cleaner...")
		j.usecase.Clean(duration)
	})
	cJob.Start()
	defer cJob.Stop()
	select {}
}
