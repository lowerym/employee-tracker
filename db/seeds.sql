INSERT INTO department (name)
VALUES ('Engineering'),
       ('Customer Service'),
       ('Financing'),
       ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 100000, 1),
       ('Software Developer', 50000, 1),

       ('Head of Customer Service', 45000, 2),
       ('Customer Service Representative', 30000, 2),

       ('Account Manager', 40000, 3),
       ('Accountant', 35000, 3),

       ('Head of Marketing', 40000, 4),
       ('Web Developer', 35000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Jones', 1, 1),
       ('Alex', 'Smith', 2, 1),
       ('James', 'Hills', 3, 2),
       ('Curtis', 'Johnson', 4, 3),
       ('Jonathon', 'Holmes', 5, 4),
       ('Fiona', 'Orange', 6, 5),
       ('Heather', 'Rodriguez', 7, 6),
       ('Francis', 'Cole', 8, 7);
