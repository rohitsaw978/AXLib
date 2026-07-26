# &#128218; AXLIB Library Management System (MERN Stack)

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://axlib-7kz9.onrender.com)

A complete Library Management System built with MongoDB, Express.js, React.js, and Node.js. Features role-based access control with three user types (Admin, Librarian, Student), book management with Cloudinary image uploads, issue/return tracking, and automated fine calculations.

## 🌐 Live Demo
Check out the live demo of the project:https://axlib-7kz9.onrender.com

**Test Credentials:**
- Admin: admin@example.com / admin123
- Librarian: librarian@example.com / lib123
- Student: student@example.com / student123

## ✨ Key Features

### 👨‍🎓 Student Features
- User registration & login with JWT authentication
- 🔍 Browse and search available books with images
- 📥 Request book issuance
- 📤 Submit return requests
- ⏳ View due dates and pending fines
- &#128202; Personal dashboard with borrowing history

### &#128218; Librarian Features
- ✔️ Approve/reject book issue requests
- ✔️ Manage return requests
- &#10133; Add/Edit/Remove books with image uploads (Cloudinary)
- 👀 View all issued books
- &#128202; Dashboard for Real-time Activity & Analytics

### &#128104;&#8205;&#128188; Admin Features
- &#128101; Manage all user accounts
- 🛡️ Assign librarian privileges
- &#128202; System analytics dashboard



## 🛠️ Technology Stack

### **Frontend**
![React](https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-v6.4-CA4245?logo=reactrouter)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-%237952B3?logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-1.3-%23631d76?logo=axios)
![Cloudinary](https://img.shields.io/badge/Cloudinary-1.32-%80B5FF?logo=cloudinary)
![React Toastify](https://img.shields.io/badge/Toastify-9.1-%23E57470?logo=react)

- **Core**: React.js (v18.2) with Functional Components & Hooks
- **Routing**: React Router v6
- **UI Framework**: React Bootstrap v5.2 + Custom CSS
- **HTTP Client**: Axios for API communication
- **Image Management**: Cloudinary React SDK
- **Notifications**: React Toastify
- **Icons**: React Icons library
- **Form Handling**: React Hook Form
- **State Management**: Context API

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-18.x-%23339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.18-%23000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-%2347A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-%23000000?logo=jsonwebtokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9-%23F7DF1E?logo=nodemailer)

- **Runtime**: Node.js v18.x
- **Framework**: Express.js v4.18
- **Database**: MongoDB Atlas (Cloud) with Mongoose ODM
- **Authentication**: JWT with Bcrypt password hashing
- **Email Service**: Nodemailer for OTP/password reset
- **File Uploads**: Multer + Cloudinary Node SDK

### **Development & Testing**
![Thunder Client](https://img.shields.io/badge/Thunder_Client-1.12-%237A1FA2?logo=thunderclient)
![Hopscotch](https://img.shields.io/badge/Hopscotch-Docs-%2334A853?logo=hopscotch)

- **API Testing**: Thunder Client (VS Code extension)
- **API Documentation**: Hopscotch
- **Version Control**: Git + GitHub

### **Deployment**
![Render](https://img.shields.io/badge/Backend-Hosted_on_Render-%2300BFFF?logo=render)
![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB_Atlas-%2347A248?logo=mongodb)

- **Frontend**: Vercel (Edge Network)
- **Backend**: Render (Node.js Environment)
- **Database**: MongoDB Atlas (Cloud)
- **Media Storage**: Cloudinary CDN

## 🛠️ Installation

### 1. Clone the repository

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/rohitsaw978/AXLib.git
```

### 2. Install Dependencies
Navigate to the frontend and backend directories, and install dependencies:

#### Backend (API)

##### 1. Navigate to the api directory:
```bash
cd backend
```

##### 2. Install backend dependencies:
```bash
npm install
```
#### Frontend (Client)

##### 1. Navigate to the client directory:
```bash
cd frontend
```
##### 2. Install frontend dependencies:
```bash
npm install
```
---

### 3. Set Up Environment Variables
Create a .env file in api and add the following environment variables:

####  BACKEND .env file
```bash
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
EMAIL_SERVICE=your_email_service
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
VITE_GOOGLE_CLIENT_ID=your_google_client_id

```

#### FRONTEND .env file
```bash
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id

```
---

### 4. Start the Development Server
Once the dependencies are installed and the .env file is set up, you can start the development server with the following command:

#### Backend
Start the backend server by navigating to the backend directory and running the following command:

```bash
nodemon index.js
```
#### Frontend
Start the frontend server by navigating to the frontend directory and running the following command:

```bash
npm run dev
```
---


## 📞 Contact
Feel free to connect with me through the following platforms:

[![LinkedIn](https://img.shields.io/badge/Rohit_Kumar_Saw-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rohitsaw978)
[![GitHub](https://img.shields.io/badge/Rohit_Kumar_Saw-181717?style=for-the-badge&logo=github&logoColor=white)]([https://github.com/rohitsaw978])
[![Email](https://img.shields.io/badge/rohitsaw09876@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rohitsaw09876@gmail.com)









