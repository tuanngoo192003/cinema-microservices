
# 🎬 Absolute Cinema 

## Project structure
 - This is a side project for learning purpose.
 - For a quick understanding of the project infrastructure i will have a brief image below:

https://i.postimg.cc/jjNMLN88/TALE-Trang-1.jpg

## 📦 Stack

### Frontend

- **ReactJS**
- **Ant Design (Antd)**
- **React i18n**
- **TypeScript**
- **Others:** ESLint, TailwindCSS

### Backend

- **Golang**
- **GORM** (Golang ORM)
- **AWS S3**

### Database

- **PostgreSQL**
- **MongoDB**

### Other

- **Docker**
- **Docker Compose**
- **Nginx**
- **Lua** (Inject middleware into Nginx forward)

---

## 🚀 App Features

### Auth

- Login / Register

### Profile

- Update profile
- Upload avatar
- View booked tickets

### Admin 

- CRUD movies
- CRUD auditoriums
- CRUD movie schedules
- View users

### Cinema

- Display movies list
- View movie details & show schedules
- Display seats in a room (Booked, Available, Reserved)
- Reserve seats (temporary hold)
- Booking logic (must book adjacent seats)
- Purchase tickets

---

## ⚙️ Install

### Option 1: Run with DockerHub Images

#### 1. Create & Access Workspace Directory

```bash
mkdir env 
cd env 
touch db-password.txt
```

Add your PostgreSQL DB password into `db-password.txt`.

#### 2. Create Environment Files

```bash
touch .env
# Add environment variables as per .env.example
```

#### 3. Create `docker-compose.yml` in your root workspace and paste the following:

<details>
<summary>Click to expand Docker Compose file</summary>

```yaml
services:
  userservice:
    container_name: userservice-cinema-microservices
    image: tuanngoo192003/cinema-microservices-userservice
    env_file:
      - env/.env
    ports:  
      - "8000:8000"
    depends_on:
      - userdb
        
  userdb:
    container_name: userdb-cinema-microservices
    image: postgres
    restart: always
    secrets:
      - db-password
    volumes:
      - user-db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=userservicedb
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    ports:
      - "5432:5432"

  cinemaservice:
    container_name: cinemaservice-cinema-microservices
    image: tuanngoo192003/cinema-microservices-cinemaservice
    env_file:
      - env/.env
    ports:
      - "8001:8001"
    volumes:
      - cinema-sqlite-data:/root/data
    depends_on:
      - cinemadb
 
  cinemadb:
    container_name: cinemadb-cinema-microservices
    image: postgres
    restart: always
    secrets:
      - db-password
    volumes:
      - cinema-db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=cinemaservicedb
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    ports:
      - "5433:5432"

  bookingservice:
    container_name: bookingservice-cinema-microservices
    image: tuanngoo192003/cinema-microservices-bookingservice
    env_file:
      - env/.env
    ports:
      - "8002:8002"
    depends_on:
      - bookingdb

  bookingdb:
    container_name: bookingdb-cinema-microservices
    image: mongo
    restart: always
    volumes:
      - booking-db-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=bookingservicedb
    ports:
      - "27017:27017"

  reactapp:
    container_name: reactapp-cinema-microservices
    image: tuanngoo192003/cinema-microservices-reactapp
    volumes:
      - react-build:/app/dist
    ports:
      - "3000:3000"

  proxy:
    container_name: proxy-cinema-microservices
    image: tuanngoo192003/cinema-microservices-proxy
    ports:
      - 80:80
    volumes:
      - react-build:/usr/share/nginx/html
    depends_on: 
      - userservice
      - cinemaservice 
      - bookingservice

volumes:
  user-db-data:
  cinema-db-data:
  booking-db-data:
  cinema-sqlite-data:
  react-build:

secrets:
  db-password:
    file: env/db-password.txt
```
</details>

#### 4. Run the containers

```bash
docker compose up -d
```

---

### Option 2: Run from Source Code

1. Clone the repository:

```bash
git clone https://github.com/tuanngoo192003/cinema-microservices.git
```

2. Create `.env` file inside the `env/` directory based on `.env.example`.

3. Navigate to the root folder and run:

```bash
docker compose up -d
```

---

## 🗃️ Database Setup

1. **Connect to `userservicedb` on port `5432`**
   - Run **line 1–46** from `db/db.sql`

2. **Connect to `cinemaservicedb` on port `5433`**
   - Run the **rest of the file** from `db/db.sql`

> **Why no GORM migrations?**  
> Because _"I just don't like GORM migrations."_ 😄

---

## 🔐 Admin Account

- **Username:** `tuan.nguyenhuu`
- **Password:** _(Auto-filled on the login page)_

> Visit [http://localhost:3000/login](http://localhost:3000/login), log in, and enjoy the show! 🍿
