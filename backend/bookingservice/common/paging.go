package common

import (
	"strings"
)

type Paging struct {
	Page       int    `json:"page" form:"page" query:"page"`
	Limit      int    `json:"limit" form:"limit" query:"limit"`
	Total      int64  `json:"total" form:"total" query:"total"`
	FakeCursor string `json:"cursor" form:"cursor" query:"cursor"`
	NextCursor string `json:"next_cursor" form:"next_cursor" query:"next_cursor"`
}

func (p *Paging) Fulfill() {
	if p.Page <= 0 {
		p.Page = 1
	}

	if p.Limit <= 0 || p.Limit > 100 {
		p.Limit = 10
	}

	p.FakeCursor = strings.TrimSpace(p.FakeCursor)
}
