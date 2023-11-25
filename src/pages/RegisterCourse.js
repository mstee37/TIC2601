import { useState } from 'react';
import DropdownCourse from "../components/DropdownCourse";
import InputStudentNameCourse from "../components/InputStudentNameCourse";
import axios from 'axios';

function InputFormCourse({ setCourses, courses, studentNameToEdit, setStudentNameToEdit, courseNameToEdit, setCourseNameToEdit, editMode, setEditMode }) {
    function processForm() {
        console.log('InputFormCourse: processForm');

        if (editMode === 'create') {
            var newCourse = { 
                'courseName': courseNameToEdit, 
                'studentName': studentNameToEdit
            }
            axios.put('http://localhost:3001/registerCourse', newCourse)
                .then(response => {
                    setCourses(courses.concat([newCourse]));
                })
            
        } else if (editMode === 'edit') {
            var course = courses.find(course => course.courseName === courseNameToEdit);

            axios.post('http://localhost:3001/registerCourse', course)
                .then(response => {
                    course.courseName = courseNameToEdit;
                    course.studentName = studentNameToEdit;
                    setEditMode('create');
                })
        }

        setStudentNameToEdit('');
        setCourseNameToEdit('Business Analytics');
    }

    return (
        <>
        <h3>Register Course</h3>
        <table border={'1'} style={{ width: '100%', position: "relative" }}>
            <tbody>
                <tr>
                    <td width={'20%'}><b>Course Name</b></td>
                    <td>
                        <DropdownCourse value={courseNameToEdit} setValue={setCourseNameToEdit} />
                    </td>
                </tr>
                <tr>
                    <td><b>Student Name</b></td>
                    <td>
                        <InputStudentNameCourse label='Student' value={studentNameToEdit} setValue={setStudentNameToEdit} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={'2'} style={{ textAlign: 'center' }}>
                        <input type={'button'} value='Register' onClick={processForm} />
                    </td>
                </tr>
            </tbody>
        </table>
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

        axios.delete('http://localhost:3001/registerCourse')
            .then(response => {
                // Handle successful response
                // Update the local state to remove the deleted course
                setCourses(courses.filter(course => course.courseName !== courseName));
            })
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

    return (
        <>
            <InputFormCourse setCourses={setCourses} courses={courses} studentNameToEdit={studentNameToEdit} setStudentNameToEdit={setStudentNameToEdit} courseNameToEdit={courseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} editMode={editMode} setEditMode={setEditMode} />
            <TableCourses courses={courses} setCourses={setCourses} setStudentNameToEdit={setStudentNameToEdit} setCourseNameToEdit={setCourseNameToEdit} setEditMode={setEditMode} />
        </>
    );
}
