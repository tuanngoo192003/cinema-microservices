package payload

type UserRequest struct {
	Username    string `json:"username" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Status      string `json:"status" binding:"required"`
	Password    string `json:"password" binding:"required,min=6"`
	RoleID      uint   `json:"roleId" binding:"required"`
	FirstName   string `json:"first_name" binding:"required"`
	LastName    string `json:"last_name" binding:"required"`
	DateOfBirth string `json:"date_of_birth"`
	PhoneNumber string `json:"phone_number"`
}

type UpdateUserRequest struct {
	UserID      uint   `json:"userId" binding:"required"`
	Email       string `json:"email" binding:"email"`
	Status      string `json:"status"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	DateOfBirth string `json:"dateOfBirth"`
	PhoneNumber string `json:"phoneNumber"`
	Avatar		string `json:"avatar"`
	IsDeleted   bool   `json:"isDeleted"`
}

type UserResponse struct {
	UserID      uint   `json:"userId" binding:"required"`
	Email       string `json:"email" binding:"email"`
	Status      string `json:"status"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	DateOfBirth string `json:"dateOfBirth"`
	PhoneNumber string `json:"phoneNumber"`
	Avatar		string `json:"avatar"`
	RoleName	string `json:"roleName"`
}
