INSERT INTO department (dept_name)
VALUES ("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000.00, 1), 
("Salesperson", 60000.00, 1), 
("Lead Engineer", 62000.00, 2), 
("Software Engineer", 150000.00, 2), 
("Account Manager", 35000.00, 3), 
("Accountant", 10000.00, 3),
("Legal Team Lead", 25000.00, 4), 
("Lawyer", 205000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 2), 
("Mike", "Chan", 2, 1), 
("Ashley", "Rodriguez", 3, 2), 
("Kevin", "Tupik", 4, 3), 
("Kunal", "Singh", 5, 2), 
("Malia", "Brown", 6, 5), 
("Sarah", "Lourd", 7, 3),
("Tom", "Allen", 8,7);


