package entity

type UsetStatus string

const (
	ACTIVE     = "ACTIVE"
	INACTIVE   = "INACTIVE"
	TERMINATED = "TERMINATED"
)

type User struct {
	UserID         uint   `json:"userId" gorm:"primaryKey;autoIncremented;<-:false"`
	Username       string `json:"username" gorm:"column:username;size:255;not null"`
	Password       string `json:"password" gorm:"size:255;not null"`
	Status         string `json:"status" gorm:"not null"`
	FirstName      string `json:"firstName" gorm:"size:255"`
	LastName       string `json:"lastName" gorm:"size:255"`
	DateOfBirth    string `json:"dateOfBirth"`
	PhoneNumber    string `json:"phoneNumber" gorm:"size:13"`
	Email          string `json:"email" gorm:"size:255;not null"`
	Avatar		   string `json:"avatar" gorm:"size:255"`
	RoleID		   uint   `json:"roleId"`
	Roles          Role   `json:"roles" gorm:"foreignKey:RoleID;references:RoleID"`
	IsDeleted      bool   `json:"isDeleted"`
	CreatedBy      string `json:"createdBy"`
	LastModifiedBy string `json:"lastModifiedBy"`
	CreatedAt      string `json:"createdAt"`
	LastModifiedAt string `json:"lastModifiedAt"`
}

type RefreshToken struct {
	TokenID   uint   `json:"tokenId" gorm:"primaryKey;autoIncremented;<-false"`
	Username  string `json:"username" gorm:"not null"`
	Token     string `json:"token" gorm:"size:255;not null"`
	ExpiredAt string `json:"expiredAt"`
	RoleName  string `json:"roleName" gorm:"not null"`
}

