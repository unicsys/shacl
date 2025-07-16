-- All data from uni1
SELECT 'STUDENTS' as table_name, '---' as divider;
SELECT * FROM uni1.student;

SELECT '' as blank;
SELECT 'ACADEMICS' as table_name, '---' as divider;
SELECT * FROM uni1.academic;

SELECT '' as blank;
SELECT 'COURSES' as table_name, '---' as divider;
SELECT * FROM uni1.course;

SELECT '' as blank;
SELECT 'TEACHING' as table_name, '---' as divider;
SELECT * FROM uni1.teaching;

SELECT '' as blank;
SELECT 'REGISTRATIONS' as table_name, '---' as divider;
SELECT * FROM uni1."course-registration";


==============

-- All data from uni2
SELECT 'PEOPLE' as table_name, '---' as divider;
SELECT * FROM uni2.person;

SELECT '' as blank;
SELECT 'COURSES' as table_name, '---' as divider;
SELECT * FROM uni2.course;

SELECT '' as blank;
SELECT 'REGISTRATIONS' as table_name, '---' as divider;
SELECT * FROM uni2.registration;
