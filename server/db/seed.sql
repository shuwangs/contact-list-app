SET search_path TO contact_app;
-- insert user
INSERT INTO users (name, email)
VALUES ('bobo', 'bobo@example.com'),
 ('tester1', 'tester1@example.com');


-- insert into tags
INSERT INTO tags (name) VALUES
('friend'),
('family'),
('coworker'),
('acquaintance'),
('neighbor')
ON CONFLICT (name) DO NOTHING;

-- add contacts to user 1
INSERT INTO contacts (user_id, first_name, last_name, phone_number, email, notes, is_emergency_contact)
VALUES
(1, 'Alice', 'Johnson', '123-456-7890', 'alice@example.com', 'Friend from Techtonica', false),
(1, 'Bob', 'Lee', '222-333-4444', 'bob@example.com', 'Emergency contact', false),
(1, 'Cathy', 'Chen', NULL, 'cathy@example.com', 'Met at networking event', true),
(2, 'Sara', 'Kim', '888-999-0000', 'sara@example.com', 'Neighbor', false);

--contacts-tags
INSERT INTO contact_tags(contact_id, tag_id) VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 5);

