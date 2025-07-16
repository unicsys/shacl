-- This script creates the tables and populates them.

-- Drop tables in reverse order of dependency to avoid errors
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- Create the departments table
CREATE TABLE departments (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    dept_location VARCHAR(100)
);

-- Create the employees table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hire_date DATE,
    job_title VARCHAR(100),
    department_id VARCHAR(10) REFERENCES departments(dept_id)
);

-- Create the projects table
CREATE TABLE projects (
    proj_id VARCHAR(10) PRIMARY KEY,
    proj_name VARCHAR(100) NOT NULL,
    lead_emp_id INT REFERENCES employees(emp_id)
);

-- Populate the departments table
INSERT INTO departments (dept_id, dept_name, dept_location) VALUES
('D101', 'Technology', 'New York'),
('D102', 'Human Resources', 'London'),
('D103', 'Marketing', 'Tokyo');

-- Populate the employees table
INSERT INTO employees (emp_id, first_name, last_name, email, hire_date, job_title, department_id) VALUES
(1, 'Alice', 'Williams', 'alice.w@example.com', '2022-08-01', 'Software Engineer', 'D101'),
(2, 'Bob', 'Brown', 'bob.b@example.com', '2021-05-20', 'HR Manager', 'D102'),
(3, 'Charlie', 'Davis', 'charlie.d@example.com', '2023-01-15', 'Marketing Specialist', 'D103'),
(4, 'Diana', 'Miller', 'diana.m@example.com', '2022-09-10', 'Data Scientist', 'D101');

-- Populate the projects table
INSERT INTO projects (proj_id, proj_name, lead_emp_id) VALUES
('P501', 'NextGen Platform', 1),
('P502', 'Global Recruitment Drive', 2),
('P503', 'Q3 Marketing Campaign', 3);
