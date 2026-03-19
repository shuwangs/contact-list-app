# Ctrl-Alt-Innovate API

This project implements a RESTful API for managing a simple ordering system.

The API allows clients to manage:
- Users
- Orders
- Items

Each user can have multiple orders, and each order can contain multiple items.

The API is built with **Node.js, Express, and PostgreSQL** and includes **Swagger documentation** for interactive API exploration.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Swagger (OpenAPI)

## Database Design

The database consists of three main tables: **users**, **orders**, and **items**.

- A **user** can have multiple **orders**
- An **order** can contain multiple **items**

This relational structure ensures clear data relationships and supports efficient queries across users, orders, and items.


## Technical Highlights
![View Design](docs/image.png)
## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/shuwangs/Ctrl-Alt-Innovate.git

cd Ctrl-Alt-Innovate/server
```

### 2. Install dependencies

`npm install`

### 3. Create environment variables

Copy `.env.example` to `.env`

`cp .env.example .env`

Update the database settings.

### 4. Create database

createdb your_database_name

### 5. Restore database dump

psql -d your_database_name -f db/db_dump.sql

### 6. Start the server

`npm run dev`

## API Documentation
Swagger UI is available at:

http://localhost:3000/api-docs

### Example Endpoints
#### Users

GET /api/users  
GET /api/users/{userId}  
POST /api/users  
PUT /api/users/{userId}  
DELETE /api/users/{userId}

#### Orders
GET /api/orders  
GET /api/orders/{orderId}  
POST /api/orders  
PUT /api/orders/{orderId}  
DELETE /api/orders/{orderId}

#### Items

GET /api/items/{orderId}

#### Stats

GET /api/stats

### Example Response



## Contributors

- [Redu Davison](https://github.com/rdavison23)
- [Shu Wang](https://github.com/shuwangs)

### Contributions

**Redu Davison**
- Database initialization and schema setup
- Service and route logic implementation
- Swagger documentation implementation
- API testing
- slides presentation

**Shu Wang**
- Backend project initialization
- Service and route layer implementation
- Swagger setup and documentation
- README writing and documentation
- API testing

## AI Tools Used

- **Tools used:** ChatGPT  

- **Usage Scenarios:**
  1. Assisted with debugging by helping identify and explain error messages.
  2. Helped generate sample seed data for testing the database.
  3. Assisted with proofreading and improving the README documentation.
