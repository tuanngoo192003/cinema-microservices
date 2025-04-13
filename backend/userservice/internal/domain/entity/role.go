package entity 

type SystemRole string

const (
	ADMIN    SystemRole = "ADMIN"
	MANAGER  SystemRole = "MANAGER"
	EMPLOYEE SystemRole = "CUSTOMER"
)

type Role struct {
	RoleID         uint       `json:"roleId" gorm:"primaryKey;autoIncrement;<-:false"`
	RoleName       SystemRole `json:"roleName" gorm:"size:255;not null"`
	Description    *string    `json:"description"` //Nullable feild using pointer
	IsDeleted      bool       `json:"isDeleted"`
	CreatedBy      string     `json:"createdBy"`
	LastModifiedBy string     `json:"lastModifiedBy"`
	CreatedAt      string     `json:"createdAt"`
	LastModifiedAt string     `json:"lastModifiedAt"`
}

type RoleRequest struct {
	RoleName    string  `json:"name"`
	Description *string `json:"description"`
}
