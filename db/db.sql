CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) CHECK (role_name IN ('ADMIN', 'MANAGER', 'CUSTOMER')),
    description TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('ACTIVE', 'INACTIVE', 'TERMINATED')),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(13),
    date_of_birth date,
    avatar VARCHAR(255),
    role_id INT REFERENCES roles(role_id) ON DELETE SET NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens (
    token_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL, 
    token VARCHAR(255) NOT NULL,
    expired_at TIMESTAMP,
    role_name VARCHAR(50)
);

INSERT INTO roles (role_id, role_name, description) VALUES
    (1, 'ADMIN', 'ADMIN'),
    (2, 'MANAGER', 'MANAGER'),
    (3, 'CUSTOMER', 'CUSTOMER');

INSERT INTO users (user_id, email, password, username, role_id) VALUES 
(1, 'tuan.nguyenhuu@vti.com.vn', '$2a$10$kzZwQiR.CQJ/F80AzAeMFO1/hiAfx56UxxS6C/s6fXX/QbLV0zXIi', 'tuan.nguyenhuu', 1);
