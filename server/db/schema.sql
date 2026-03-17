DROP SCHEMA IF EXISTS contact_app CASCADE;

CREATE SCHEMA contact_app;

SET search_path TO contact_app;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL unique
);

CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    phone_number VARCHAR(20) ,
    email VARCHAR(100) UNIQUE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- insert user
INSERT INTO users (name, email)
VALUES ('bobo', 'bobo@example.com');
VALUES ('tester1', 'tester1@example.com');

-- add contacts to user 1
INSERT INTO contacts (user_id, first_name, last_name, phone_number, email, notes)
VALUES
(1, 'Alice', 'Johnson', '2021112222', 'alice@example.com', 'Friend from Techtonica'),
(1, 'Bob', 'Lee', '7033334444', 'bob@example.com', 'Emergency contact'),
(1, 'Cathy', 'Chen', NULL, 'cathy@example.com', 'Met at networking event');