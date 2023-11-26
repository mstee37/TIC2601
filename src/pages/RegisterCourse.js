import React, { useEffect, useState, useContext } from 'react';
import InputId from "../components/InputId";
import axios from 'axios';

import { CourseToEditContext } from '../contexts/CourseToEditContext';

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormCourse() {
    
    const {
        setCourses, courses, SIDToEdit, setSIDToEdit, SCourseIDToEdit, setSCourseIDToEdit, editMode, setEditMode, reloadCourses, setReloadCourses
    } = useContext(CourseToEditContext);

    function processForm() {

        const courseData = { SID: SIDToEdit , SCourseID: SCourseIDToEdit,};

        if (editMode === 'create') {
            axios.put('http://localhost:3001/student', courseData)
                .then((response) => {
                    setReloadCourses(!reloadCourses);
                })
                .catch(error => {
                    console.error('Error in POST request:', error);
                });

        } else if (editMode === 'edit') {
            axios.post(`http://localhost:3001/student/${SIDToEdit}`, courseData)
                .then((response) => {
                    setReloadCourses(!reloadCourses);
                    setEditMode('create');
                })
                .catch(error => {
                    console.error('Error in PUT request:', error);
                });
        }

        setSIDToEdit('');
        setSCourseIDToEdit('');
    }
    

    return (
        <>
            <h3>Register Course</h3>
            <table border={'1'} style={{ width: '100%', position: "relative" }}>
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Course ID</b></td>
                        <td>
                            <InputId label='Course ID' value={SCourseIDToEdit} setValue={setSCourseIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Student ID</b></td>
                        <td>
                            <InputId label='Student ID' value={SIDToEdit} setValue={setSIDToEdit} />
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

function TableRowsCourses() {
    
    const {
        setCourses, courses, SIDToEdit, setSIDToEdit, SCourseIDToEdit, setSCourseIDToEdit, editMode, setEditMode, reloadCourses, setReloadCourses
    } = useContext(CourseToEditContext);

    function updateCourse(event, SID) {
        setEditMode('edit');
        console.log('Editing ' + SID);

        var course = courses.find(course => course.SID === SID);
        setSCourseIDToEdit(course.SCourseID);
        setSIDToEdit(course.SID);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/student').then(response => {
            setCourses(response.data);
        });
    }, [reloadCourses]);

    function deleteCourse(event, SID) {
        axios.delete('http://localhost:3001/student',{params: {'SID' : SID}}).then((response) => {
            setCourses(courses.filter(course => course.SID !== SID));
        })
    }

    return (
        <>
            {courses.map(course => (
                <tr key={course.SCourseID}>
                    <td>{course.SCourseID}</td>
                    <td>{course.SID}</td>
                    <td>
                        <button onClick={event => updateCourse(event, course.SID)}>Update</button> |
                        <button onClick={event => deleteCourse(event, course.SID)}>Delete</button>
                    </td>
                </tr>
            ))}
        </>
    );
}

function TableCourses() {
    
    const {
        setCourses, courses, SIDToEdit, setSIDToEdit, SCourseIDToEdit, setSCourseIDToEdit, editMode, setEditMode, reloadCourses, setReloadCourses
    } = useContext(CourseToEditContext);

    return (
        <>
            <h3>Registered Courses</h3>
            <table id={'coursesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Student ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsCourses 
                        courses={courses} 
                        setCourses={setCourses} 
                        setStudentIdToEdit={setSIDToEdit} 
                        setCourseIdToEdit={setSCourseIDToEdit} 
                        setEditMode={setEditMode} />
                </tbody>
            </table>
        </>
    );
}

export default function CourseRegistration() {
    const [courses, setCourses] = useState([]);
    const [editMode, setEditMode] = useState('create');
    const [SCourseIDToEdit, setSCourseIDToEdit] = useState('');
    const [SIDToEdit, setSIDToEdit] = useState('');
    const [reloadCourses, setReloadCourses] = useState(false);

    return (
        <CourseToEditContext.Provider value={{
            editMode, setEditMode,
            courses, setCourses,
            SCourseIDToEdit, setSCourseIDToEdit,
            SIDToEdit, setSIDToEdit,
            reloadCourses, setReloadCourses
        }}>
            <InputFormCourse />
            <TableCourses />
        </CourseToEditContext.Provider>
    );
}
