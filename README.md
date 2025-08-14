# Frive 🗃️

Frive is a **lightweight Google Drive–like storage application** built with **Node.js** and **Express.js**.
It allows users to create folders, upload files, move and rename them, and download content — all stored via **Supabase** and managed in a **PostgreSQL** database with **Prisma ORM**.

---

## Demo

---

## ✨ Features

- **Authentication**

  - Local authentication with Passport.js
  - JWT-based authentication for protected routes

- **Storage**

  - Supabase integration for file storage
  - Multer for file uploads

- **Database**

  - PostgreSQL with Prisma ORM

- **Views**

  - EJS for rendering server-side views

- **Folder Management**

  - Create, delete, rename, move folders
  - Nested folder support

- **File Management**

  - Upload, delete, rename, move files
  - Download files from storage

---

## 🛠️ Tech Stack

| Category        | Technology                |
| --------------- | ------------------------- |
| Runtime         | Node.js                   |
| Framework       | Express.js                |
| Auth            | Passport.js (Local & JWT) |
| ORM             | Prisma                    |
| Database        | PostgreSQL                |
| Storage         | Supabase                  |
| Upload Handling | Multer                    |
| Views           | EJS                       |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Frive.git
cd Frive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/frive
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key
BUCKET_NAME=your_supabase_bucket_name
JWT_SECRET=your_jwt_secret
PORT=port_process
```

### 4. Migrate the database

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm run dev
```

---

## 🔑 Authentication Routes

| Method | Endpoint  | Description                               |
| ------ | --------- | ----------------------------------------- |
| GET    | `/`       | Home page (auth landing)                  |
| GET    | `/signup` | Signup form                               |
| POST   | `/signup` | Create new account                        |
| GET    | `/login`  | Login form                                |
| POST   | `/login`  | Authenticate and redirect to `/mystorage` |

---

## 📦 Storage Routes

### **Main Storage**

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/mystorage`        | Main storage view (auth req) |
| GET    | `/mystorage/logout` | Logout and clear cookies     |

### **Folder Routes** (`/mystorage/folder`)

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | `/:id`        | Open folder      |
| POST   | `/:id`        | Create subfolder |
| PUT    | `/:id/rename` | Rename folder    |
| PUT    | `/move/:id`   | Move folder      |
| DELETE | `/:id`        | Delete folder    |

### **File Routes** (`/mystorage/file`)

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/:folderId`    | Upload file       |
| GET    | `/:id`          | Show file details |
| PUT    | `/:id/rename`   | Rename file       |
| PUT    | `/:id/move`     | Move file         |
| DELETE | `/:id`          | Delete file       |
| GET    | `/:id/download` | Download file     |

---

## 🧩 Middleware Overview

- **isAuth** — Ensures the user is authenticated.
- **populateUser** — Loads user info for request handling.
- **populateMainFolder** — Loads user's root folder.
- **handleUploads** — Multer setup for handling file uploads.
- **signToken** — Signs JWT after successful login and assign cookies.

---

## 📌 Future Improvements

- Drag-and-drop file upload
- File preview in browser
- Sharing files via link
- Real-time collaboration

---

## 📜 License

This project is licensed under the MIT License.
