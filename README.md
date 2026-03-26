# Contact List App

A full-stack contact management application built with **PostgreSQL, Express, React, and Node.js (PERN)**.

This app enables users to securely manage their personal contacts with authentication, search functionality, and a clean UI.
---
## Demo
![Contact List App Demo](./docs/contact_app.gif)

## 🚀 Features

### 🔐 Authentication
- JWT-based login & registration
- Protected API routes with middleware
- Persistent session using localStorage
### 👤 Contact Management
- View all contacts
- Create, edit, and delete contacts
- View detailed contact profile
- Mark emergency contacts
### 🔎 Search
- Keyword-based contact search

### ⚛️ State Management
- Global state using React Context + useReducer
  
---

## 🧱 Tech Stack
### Frontend
- React
- Context API + useReducer
- TailwindCSS
### Backend
- Node.js
- Express.js
- PostgreSQL
### Authentication
- JSON Web Token (JWT)

## Technical Highlights
- Designed RESTful APIs with Express
- Implemented JWT authentication and request validation
- Used PostgreSQL relational modeling with JOIN operations
- Built reusable UI components with TailwindCSS
- Managed complex UI state using reducer pattern
- Implemented full CRUD + search

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/shuwangs/contact-list-app.git
cd contact-list-app
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Create environment variables

Copy `.env.example` to `.env`

`cp .env.example .env`

Update the database settings.

### 4. Setup database

```bash
createdb contact_db
psql -d contact_db -f server/db/schema.sql
psql -d contact_db -f server/db/seed.sql
```

### 6. Start the server
```bash
# server
cd server
npm run dev

# client
cd client
npm run dev
```
🧪 How to Use
- Register or log in
- Add new contacts
- Edit or delete contacts
- Search contacts by keyword
- Refresh page → session persists

## 🌱 Future Improvements
- Role-based authentication
Pagination & advanced filtering
Deployment (Docker / CI-CD)
File upload (profile images)
Mobile responsiveness improvements


## Author

- [Shu Wang](https://github.com/shuwangs)
