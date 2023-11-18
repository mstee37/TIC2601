import { useState } from 'react';
import DropdownCourse from "../components/DropdownCourse";
import InputStudentNameCourse from "../components/InputStudentNameCourse";

function InputFormCourse({ setCourses, courses, studentNameToEdit, setStudentNameToEdit, courseNameToEdit, setCourseNameToEdit, editMode, setEditMode }) {
    function processForm() {
        console.log('InputFormCourse: processForm');

        if (editMode === 'create') {
            var newCourse = { 
                'courseName': courseNameToEdit, 
                'studentName': studentNameToEdit
            };
            setCourses(courses.concat([newCourse]));
        } else if (editMode === 'edit') {
            var course = courses.find(course => course.courseName === courseNameToEdit);
            course.courseName = courseNameToEdit;
            course.studentName = studentNameToEdit;

            setEditMode('create');
        }

        setStudentNameToEdit('');
        setCourseNameToEdit('Business Analytics');
    }

    return (
        <>
            <h3>Register Course</h3>
            <DropdownCourse value={courseNameToEdit} setValue={setCourseNameToEdit} />
            <InputStudentNameCourse label='Student' value={studentNameToEdit} setValue={setStudentNameToEdit} />
            <input type={'button'} value='Submit' onClick={processForm} />
        </>
    );
}

function TableRowsCourses({ courses, setCourses, studentNameToEdit, setStudentNameToEdit, courseNameToEdit, setCourseNameToEdit, setEditMode }) {

    function updateCourse(event, courseName) {
        setEditMode('edit');
        console.log('Editing ' + courseName);

        var course = courses.find(course => course.courseName === courseName);
        setCourseNameToEdit(course.courseName);
        setStudentNameToEdit(course.studentName);
    }

    function deleteCourse(event, courseName) {
        setCourses(courses.filter(course => course.courseName !== courseName));
    }

    return (
        <>
            {courses.map(course => (
                <tr key={course.courseName}>
                    <td>{course.courseName}</td>
                    <td>{course.studentName}</td>
                    <td>
                        <button onClick={event => updateCourse(event, course.courseName)}>Update</button> |
                        <button onClick={event => deleteCourse(event, course.courseName)}>Delete</button>
                    </td>
                </tr>
            ))}
        </>
    );
}

function TableCourses({ courses, setCourses, setStudentNameToEdit, setCourseNameToEdit, setEditMode }) {
    return (
        <>
            <h3>Registered Courses</h3>
            <table id={'coursesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Student Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsCourses courses={courses} setCourses={setCourses} setStudentNameToEdit={setStudentNameToEdit} setCourseNameToEdit={setCourseNameToEdit} setEditMode={setEditMode} />
                </tbody>
            </table>
        </>
    );
}

export default function CourseRegistration() {
    const [courses, setCourses] = useState([]);
    const [editMode, setEditMode] = useState('create');
    const [courseNameToEdit, setCourseNameToEdit] = useState('Business Analytics');
    const [studentNameToEdit, setStudentNameToEdit] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://your-backend-api.com/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courses }),
            });

            if (response.ok) {
                console.log('Courses submitted successfully');

            } else {
                console.error('Failed to submit courses');

            }
        } catch (error) {
            console.error('Error submitting courses:', error);
        
        }
    };

    return (
        <>
            <InputFormCourse setCourses={setCourses} courses={courses} studentNameToEdit={studentNameToEdit} setStudentNameToEdit={setStudentNameToEdit} courseNameToEdit={courseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} editMode={editMode} setEditMode={setEditMode} />
            <TableCourses courses={courses} setCourses={setCourses} setStudentNameToEdit={setStudentNameToEdit} setCourseNameToEdit={setCourseNameToEdit} setEditMode={setEditMode} />
            <button onClick={handleSubmit}>Submit Courses to Database</button>
        </>
    );
}
