# 🎓 Student Grievance System

A full-stack web application designed to provide students with a **transparent, secure, and efficient platform to submit, track, and manage grievances** within an educational institution.

The system provides separate dashboards and role-based access for **Students, Department Staff, and Administrators**, making the grievance resolution process more organized and accessible.

---

## 🚀 Features

### 👨‍🎓 Student Features

* Student registration and login
* Secure authentication using JWT
* Submit new grievances
* Select relevant department
* Track submitted grievances
* View grievance status and updates
* Upload supporting files/images
* View personal grievance history
* Receive notifications/toasts for important actions

### 🏢 Department Features

* Department-specific dashboard
* View grievances assigned to the department
* Review student complaints
* Update grievance status
* Manage grievance resolution process

### 👨‍💼 Admin Features

* Admin authentication
* Admin dashboard
* View and manage all grievances
* Manage departments
* Manage users and grievance records
* Monitor grievance statistics
* Analytics dashboard with graphical representations

### 🔐 Security & Authentication

* Role-based access control
* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Environment variables for sensitive configuration
* CORS configuration

### 📊 Analytics

* Grievance statistics
* Status-based analysis
* Department-wise information
* Interactive charts using Recharts

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **React Router**
* **Axios**
* **Framer Motion**
* **React Hot Toast**
* **Recharts**
* **Heroicons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **Bcrypt.js**
* **Multer**
* **Nodemailer**
* **CORS**
* **Dotenv**

---

## 🏗️ Project Architecture

```text
Student-Grievance-System/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Department.js
│   │   ├── Grievance.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── departments.js
│   │   └── grievances.js
│   │
│   ├── utils/
│   │   └── mailer.js
│   │
│   ├── uploads/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── AdminAnalytics.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── DepartmentDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyGrievances.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── SubmitGrievance.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ayushgupta74153511-sudo/Student-Enquiry-Portal-.git
```

Navigate into the project:

```bash
cd Student-Enquiry-Portal-
```

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Or:

```bash
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend

If your frontend requires environment variables, create:

```text
frontend/.env
```

**Never upload `.env` files or secret credentials to GitHub.**

---

## 🔄 Application Flow

```text
Student
   │
   ├── Register / Login
   │
   ▼
Student Dashboard
   │
   ├── Submit Grievance
   ├── Upload Supporting File
   └── Track Grievance
            │
            ▼
      Department Dashboard
            │
            ├── Review Grievance
            ├── Update Status
            └── Resolve Issue
                    │
                    ▼
              Student Updates
```

Administrators can monitor the overall system through the **Admin Dashboard and Analytics Dashboard**.

---

## 🔐 Authentication Flow

The application uses **JWT-based authentication**.

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT Token Generated
    ↓
Token stored on Client
    ↓
Protected API Requests
    ↓
Role Verification
    ↓
Student / Department / Admin Dashboard
```

Passwords are securely hashed using **bcrypt.js** before being stored.

---

## 📌 Main Modules

| Module                | Description                                   |
| --------------------- | --------------------------------------------- |
| Authentication        | Registration, login and JWT authentication    |
| Student Dashboard     | Submit and track grievances                   |
| Grievance Management  | Create, view and update grievances            |
| Department Management | Handle department-specific grievances         |
| Admin Dashboard       | Manage and monitor the complete system        |
| Analytics             | Visual representation of grievance statistics |
| File Upload           | Upload supporting documents/images            |
| Email Service         | Email-related notification functionality      |

---

## 🎯 Project Objectives

The main objectives of this project are:

* Digitize the traditional grievance submission process.
* Provide students with an easy way to submit complaints.
* Allow students to track grievance progress.
* Improve communication between students and departments.
* Provide administrators with centralized grievance management.
* Reduce manual paperwork and improve transparency.
* Provide useful analytics for monitoring grievance resolution.

---

## 🔮 Future Enhancements

Some features that can be added in future versions:

* 🔔 Real-time notifications
* 📱 Mobile application
* 🤖 AI-based grievance classification
* 💬 Student-department chat system
* 📧 Advanced email notification system
* 📈 Advanced analytics and reports
* ⭐ Student feedback and satisfaction rating
* 🔍 Advanced grievance search and filtering
* ☁️ Cloud-based file storage
* 🧾 PDF grievance reports

---

## 👨‍💻 Skills Demonstrated

This project demonstrates practical experience in:

* Full-Stack Web Development
* React.js
* Node.js
* Express.js
* MongoDB & Mongoose
* REST API Development
* JWT Authentication
* Role-Based Authorization
* CRUD Operations
* File Upload Handling
* API Integration using Axios
* Responsive UI Development
* Tailwind CSS
* Data Visualization
* Git & GitHub

---

## 📄 License

This project is developed for **educational and academic purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
