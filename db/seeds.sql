INSERT INTO department (name)
VALUES
    ('Management'),
    ('OGP'),
    ('Checkout'),
    ('Backroom')

INSERT INTO role (title, salary, department_id)
VALUES
    ('Store Manager', 100000, 1),
    ('Manager', 80000, 1),
    ('Team Lead', 55000, 1),
    ('Picker', 30000, 2),
    ('Dispenser', 30000, 2),
    ('Driver', 40000, 2),
    ('Cashier', 25000, 3),
    ('Door Greeter', 20000, 3),
    ('Stocker', 30000, 4),
    ('Unloader', 35000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Joey', 'Bossman', 1, NULL),
    ('Jim', 'Hennesy', 2, 1),
    ('Emily', 'Martinez', 2, 1),
    ('Joey', 'Wheeler', 2, 1),
    ('Katrina', 'Davis', 3, 2),
    ('Lisa', 'Brown', 3, 2),
    ('Alain', 'Prince', 3, 3),
    ('Selfie', 'Druid', 3, 3),
    ('John', 'Valorant', 3, 4),
    ('John', 'Darksouls', 3, 4),
    ('Kaitlyn', 'Ruyle', 4, 5),
    ('Sam', 'Gooch', 5, 6),
    ('Sophie', 'Healer', 6, 5),
    ('Cash', 'Money', 7, 7),
    ('Gud', 'Dae', 8, 8),
    ('Hel', 'Goodguy', 9, 9),
    ('Super', 'Chad', 10, 10)

