--userservicedb tables 
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


-- cinemaservicedb tables 
CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255),
    image_url VARCHAR(50),
    duration INT,
    description TEXT,
    release_date DATE,
    movie_genre VARCHAR(500),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE auditoriums (
    auditorium_id SERIAL PRIMARY KEY,
    auditorium_name VARCHAR(50),
    capacity INT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TYPE config_type_enum AS ENUM ('A1', 'A2', 'A3', 'A4');
CREATE TYPE schedule_status_enum AS ENUM ('DRAFT', 'FINAL');

CREATE TABLE movie_schedule (
    schedule_id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    auditorium_id INT REFERENCES auditoriums(auditorium_id) ON DELETE CASCADE,
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    config_type config_type_enum,
    schedule_status schedule_status_enum,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TYPE seat_status_enum AS ENUM ('AVAILABLE', 'RESERVED', 'BOOKED');

CREATE TABLE seats (
    seat_id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES movie_schedule(schedule_id), 
    auditorium_id INT REFERENCES auditoriums(auditorium_id) ON DELETE CASCADE,
    seat_code VARCHAR(5),
    current_status seat_status_enum DEFAULT 'AVAILABLE',
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(50),
    last_modified_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE reserved_seat (
    id SERIAL PRIMARY KEY,
    schedule_id INT REFERENCES movie_schedule(schedule_id) ON DELETE CASCADE,
    seat_id INT REFERENCES seats(seat_id) ON DELETE CASCADE,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
