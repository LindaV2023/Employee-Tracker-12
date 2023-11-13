INSERT INTO department (id, dept_name)
VALUES (1, "Sales"), 
(2, "Engineering"), 
(3, "Finance"), 
(4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUE (1, "Sales Lead", 100000.00, 1), 
(2, "Salesperson", 60000.00, 1), 
(3, "Lead Engineer", 62000,00, 2), 
(4, "Software Engineer", 150000.00, 2), 
(5, "Account Manager" 35000.00, 3), 
(6, "Accountant", 100000.00, 3),
(7, "Legal Team Lead", 250000.00, 4), 
(8, "Lawyer", 205000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (01,"John", "Doe", 1, NULL), 
(02, "Mike", "Chan", 2, 1), 
(03, "Ashley", "Rodriguez", 3, 2), 
(04, "Kevin", "Tupik", 4, 3), 
(05, "Kunal", "Singh", 5, 2), 
(06, "Malia", "Brown", 6, 5), 
(07, "Sarah", "Lourd", 7, 3),
(08, "Tom", "Allen", 8,7);


