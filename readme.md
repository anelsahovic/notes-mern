# Notes App (MERN + TypeScript)

A full-stack **Notes Application** built using the **MERN (MongoDB, Express, React, Node.js) stack with TypeScript**. This app allows users to **create, read, update, and delete (CRUD) notes**, with authentication and authorization.

## 🚀 Features

- User authentication with **Express Sessions**
- Secure **protected routes** using middleware
- **CRUD operations** for managing notes
- **Responsive UI** with Bootstrap
- **React Router** for seamless navigation
- Backend validation with **Mongoose & Envalid**

## 🛠 Tech Stack

### **Frontend:**

- **React 19** (TypeScript)
- **React Router DOM** for navigation
- **React Hook Form** for form handling
- **Bootstrap 5 & React-Bootstrap** for UI

### **Backend:**

- **Node.js & Express.js** (TypeScript)
- **MongoDB (MongoDB Atlas) & Mongoose**
- **Express Sessions** for authentication
- **Bcrypt** for password hashing
- **Envalid** for environment variable validation

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/anelsahovic/notes-mern.git
cd notes-mern
```

### **2️⃣ Install Dependencies**

#### **Backend**

```bash
cd backend
npm install
```

#### **Frontend**

```bash
cd ../frontend
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the `server` directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=port_number_5000
```

### **4️⃣ Run the Application**

#### **Start Backend**

```bash
cd backend
npm start
```

#### **Start Frontend**

```bash
cd frontend
npm start
```

---

## 🔑 Authentication & Security

- Uses **express-session** for user authentication.
- Passwords are **hashed** using **bcrypt**.
- Middleware is implemented to protect API routes.

---

## 📌 API Routes

### **Auth Routes**

- `POST /api/users/signup` → Register a new user
- `POST /api/users/login` → Log in user
- `POST /api/users/logout` → Log out user

### **Notes Routes (Protected)**

- `GET /api/notes` → Fetch user notes
- `GET /api/notes/:noteId` → Fetch single user note
- `POST /api/notes` → Create a note
- `PATCH /api/notes/:id` → Update a note
- `DELETE /api/notes/:id` → Delete a note

---

## 📝 CRUD Functionality

- **Create Notes**: Users can add new notes with a title and content.
- **Read Notes**: Notes are displayed dynamically.
- **Update Notes**: Users can edit their existing notes.
- **Delete Notes**: Users can remove notes permanently.

---

## 📸 Screenshots

![Home Page](/frontend/public/screenshots/screenshot1.png)
![Access Denied](/frontend/public/screenshots/screenshot2.png)
![Log In](/frontend/public/screenshots/screenshot3.png)
![Sign Up](/frontend/public/screenshots/screenshot4.png)
![Show Notes](/frontend/public/screenshots/screenshot5.png)
![Create Note](/frontend/public/screenshots/screenshot6.png)
![Edit Note](/frontend/public/screenshots/screenshot7.png)
![No notes](/frontend/public/screenshots/screenshot8.png)
![Page Not Found](/frontend/public/screenshots/screenshot9.png)

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request.

---

## 📩 Contact

- **GitHub**: [github.com/anelsahovic](https://github.com/anelsahovic)
- **Email**: anel.sahovic.bsc@gmail.com
