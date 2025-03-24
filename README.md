# Centralized Fine Management System (CFMS)

## Overview
The Centralized Fine Management System (CFMS) is a web application designed to manage fines assigned to users by various authorities such as municipal officers, traffic police, and college admins. The system provides a user-friendly interface for users to view and pay their fines and download clearance certificates once fines are cleared.

## Features
- User and Admin authentication
- Dashboard for users to view pending fines and available documents
- Dashboard for admins to manage users and assigned fines
- Secure password storage and authentication using JWT
- Responsive UI built with React and Bootstrap

## Project Structure
```
CFMS/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Fine.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── admin.js
│   ├── .env
│   ├── app.js
│   ├── config.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── UserDashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Chatbot.js
│   │   │   └── styles/
│   │   │       ├── Login.css
│   │   │       ├── UserDashboard.css
│   │   │       ├── AdminDashboard.css
│   │   │       └── Chatbot.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── database/
│   ├── seed/
│   │   ├── users.json
│   │   ├── admins.json
│   │   ├── fines.json
│   │   └── documents.json
│   └── schema.sql
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Setup

#### Backend
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install backend dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/cfms
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install frontend dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

### Database Seeding
1. Ensure MongoDB is running.
2. Use a tool like MongoDB Compass or the MongoDB shell to import seed data from the `database/seed` directory.

## Usage
1. Open a browser and navigate to `http://localhost:3000` to access the application.
2. Login with user or admin credentials to access the respective dashboards.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.