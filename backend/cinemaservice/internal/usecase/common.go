package usecase

import "time"

func getDefaultTimeStart() time.Time {
	return time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC)
}
func getDefaultTimeEnd() time.Time {
	return time.Date(2100, 1, 1, 0, 0, 0, 0, time.UTC)
}
