INSERT INTO departments(id, name)
VALUES
  (1, "Accounting"),
  (2, "Human Resources"),
  (3, "Customer Service"),
  (4, "IT"),
  (5, "Development"),
  (6, "Marketing"),
  (7, "Executive");

INSERT INTO roles(id, title, salary, department_id)
VALUES
  (1, "CFO", 250000, 1),
  (2, "Accountant", 100000, 1),
  (3, "CEO", 200000, 7),
  (4, "Assistant", 100000, 7),
  (5, "Customer Service Rep", 90000, 3),
  (6, "Head Technician", 120000, 4),
  (7, "Technician", 100000, 4),
  (8, "Lead Developer", 150000, 5),
  (9, "Mid-Level Developer", 100000, 5),
  (10, "Junior Developer", 80000, 5),
  (11, "Marketing Executive", 200000, 6),
  (12, "Marketing Assistant", 100000, 6);
  
  
  
  INSERT INTO managers (id, title, department_id)
  VALUES
  (1, "Accounting Manager", 1),
  (2, "HR Manager", 2),
  (3, "Service Manager", 3),
  (4, "IT Manager", 4),
  (5, "Development Manager", 5),
  (6, "Marketing Manager", 6),
  (7, "Executive Manager", 7);

  INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, NULL),
  ('Katherine', 'Mansfield', 4, NULL),
  ('Dora', 'Carrington', 5, NULL),
  ('Edward', 'Bellamy', 6, 4),
  ('Montague', 'Summers', 4, NULL),
  ('Octavia', 'Butler', 5, NULL),
  ('Unica', 'Zurn', 3, NULL),
  ("Orla", "Costa", 7, 4),
  ("Alysia", "Slater", 8, 5),
  ("Edwin","Kumar", 9, 5),
  ("Otto", "Peacock", 10, 5),
  ("Jeffery", "Trainor", 11, 6),
  ("Regan", "Calhoun", 12, 6),
  ("Kaia", "Blair", 12, 6);