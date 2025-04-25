package job

import (
	"cinema-service/internal/usecase"
	"strconv"

	"github.com/robfig/cron/v3"
)

type ExpiredScheduleJob struct {
	usecase *usecase.ScheduleUsecase
}

func NewExpiredScheduleJob(scheduleUsecase *usecase.ScheduleUsecase) *ExpiredScheduleJob {
	return &ExpiredScheduleJob{usecase: scheduleUsecase}
}

func (j *ExpiredScheduleJob) Run() {
	cJob := cron.New()
	duration := 10
	cronSpec := "*/" + strconv.Itoa(duration) + " * * * *"
	cJob.AddFunc(cronSpec, func() {
		j.usecase.UpdateExpired()
	})
	cJob.Start()
	defer cJob.Stop()
	select {}
}
