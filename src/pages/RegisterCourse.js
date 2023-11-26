import React, { useState } from 'react';
import DropdownCourse from "../components/DropdownCourse";
import InputId from "../components/InputStudentID";
import axios from 'axios';

function InputFormCourse({ setCourses, courses, studentIdToEdit, setStudentIdToEdit, courseNameToEdit, setCourseNameToEdit, editMode, setEditMode }) {
    function processForm() {
        console.log('InputFormCourse: processForm');

        if (editMode === 'create') {
            var newCourse = { 
                'courseName': courseNameToEdit, 
                'studentId': studentIdToEdit
            };
            
            // axios.put('http://localhost:3001/registerCourse', newCourse).then((response)=>{
               
                setCourses(courses.concat([newCourse]));
            // })
           
        } else if (editMode === 'edit') {
            var course = courses.find(course => course.courseName === courseNameToEdit);

            // axios.post('http://localhost:3001/registerCourse', course).then((response=>{
                course.courseName = courseNameToEdit;
                course.studentId = studentIdToEdit;
                setEditMode('create');
            // }))
           
        }

        setStudentIdToEdit('');
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
                        <td><b>Student ID</b></td>
                        <td>
                            <InputId label='Student ID' value={studentIdToEdit} setValue={setStudentIdToEdit} />
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

function TableRowsCourses({ courses, setCourses, setStudentIdToEdit, setCourseNameToEdit, setEditMode }) {
    function updateCourse(event, courseName) {
        setEditMode('edit');
        console.log('Editing ' + courseName);

        var course = courses.find(course => course.courseName === courseName);
        setCourseNameToEdit(course.courseName);
        setStudentIdToEdit(course.studentId);
    }

    function deleteCourse(event, courseName) {
        // axios.delete('http://localhost:3001/registerCourse',{params: {'courseName' : courseName}}).then((response) => {
            setCourses(courses.filter(course => course.courseName !== courseName));
        // })
    }

    return (
        <>
            {courses.map(course => (
                <tr key={course.courseName}>
                    <td>{course.courseName}</td>
                    <td>{course.studentId}</td>
                    <td>
                        <button onClick={event => updateCourse(event, course.courseName)}>Update</button> |
                        <button onClick={event => deleteCourse(event, course.courseName)}>Delete</button>
                    </td>
                </tr>
            ))}
        </>
    );
}

function TableCourses({ courses, setCourses, setStudentIdToEdit, setCourseNameToEdit, setEditMode }) {
    return (
        <>
            <h3>Registered Courses</h3>
            <table id={'coursesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Student ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsCourses 
                        courses={courses} 
                        setCourses={setCourses} 
                        setStudentIdToEdit={setStudentIdToEdit} 
                        setCourseNameToEdit={setCourseNameToEdit} 
                        setEditMode={setEditMode} />
                </tbody>
            </table>
        </>
    );
}

export default function CourseRegistration() {
    const [courses, setCourses] = useState([]);
    const [editMode, setEditMode] = useState('create');
    const [courseNameToEdit, setCourseNameToEdit] = useState('Business Analytics');
    const [studentIdToEdit, setStudentIdToEdit] = useState('');

    return (
        <>
            <InputFormCourse 
                setCourses={setCourses} 
                courses={courses} 
                studentIdToEdit={studentIdToEdit} 
                setStudentIdToEdit={setStudentIdToEdit} 
                courseNameToEdit={courseNameToEdit} 
                setCourseNameToEdit={setCourseNameToEdit} 
                editMode={editMode} 
                setEditMode={setEditMode} />
            <TableCourses 
                courses={courses} 
                setCourses={setCourses} 
                setStudentIdToEdit={setStudentIdToEdit} 
                setCourseNameToEdit={setCourseNameToEdit} 
                setEditMode={setEditMode} />
        </>
    );
}
