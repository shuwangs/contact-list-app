SET search_path TO contact_app;
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