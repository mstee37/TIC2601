import { useState } from 'react';
import DropdownCourse from "../components/DropdownCourse";
import InputStudentNameCourse from "../components/InputStudentNameCourse";
import RankingCourse from "../components/RankingCourse";

function InputFormCourse({ setCourses, courses, studentNameToEdit, setStudentNameToEdit, courseNameToEdit, setCourseNameToEdit, courseRankToEdit, setCourseRankToEdit, editMode, setEditMode }) {
    function processForm() {
        console.log('InputFormCourse: processForm');

        if (editMode === 'create') {
            var newCourse = { 
                'courseName': courseNameToEdit, 
                'studentName': studentNameToEdit,  
                'courseRank': courseRankToEdit 
            };
            setCourses(courses.concat([newCourse]));
            
        } else if (editMode === 'edit') {

            var course = courses.find(course => course.courseName === courseNameToEdit);
            course.courseName = courseNameToEdit;
            course.studentName = studentNameToEdit;
            course.courseRank = courseRankToEdit;

            setEditMode('create');
        }

        setStudentNameToEdit('');
        setCourseNameToEdit('Business Analytics');
        setCourseRankToEdit('1');
    }

    return (
        <>
            <h3>Register Course</h3>
            <DropdownCourse value={courseNameToEdit} setValue={setCourseNameToEdit} />
            <InputStudentNameCourse label='Student' value={studentNameToEdit} setValue={setStudentNameToEdit} />
            <RankingCourse value={courseRankToEdit} setValue={setCourseRankToEdit} />
            <input type={'button'} value='Submit' onClick={processForm} />
        </>
    );
}

function TableRowsCourses({ courses, setCourses, studentNameToEdit, setStudentNameToEdit, courseNameToEdit, setCourseNameToEdit, courseRankToEdit, setCourseRankToEdit, setEditMode }) {

    function updateCourse(event, courseName) {
        setEditMode('edit');
        console.log('Editing ' + courseName);

        var course = courses.find(course => course.courseName === courseName);
        setCourseNameToEdit(course.courseName);
        setStudentNameToEdit(course.studentName);
        setCourseRankToEdit(course.courseRank);
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
                    <td>{course.courseRank}</td>
                    <td>
                        <button onClick={event => updateCourse(event, course.courseName)}>Update</button> |
                        <button onClick={event => deleteCourse(event, course.courseName)}>Delete</button>
                    </td>
                </tr>
            ))}
        </>
    );
}

function TableCourses({ courses, setCourses, setStudentNameToEdit, setCourseNameToEdit, setCourseRankToEdit, setEditMode }) {
    return (
        <>
            <h3>Registered Courses</h3>
            <table id={'coursesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Student Name</th>
                        <th>Course Rank</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsCourses courses={courses} setCourses={setCourses} setStudentNameToEdit={setStudentNameToEdit} setCourseNameToEdit={setCourseNameToEdit} setCourseRankToEdit={setCourseRankToEdit} setEditMode={setEditMode} />
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
    const [courseRankToEdit, setCourseRankToEdit] = useState('1');

    return (
        <>
            <InputFormCourse setCourses={setCourses} courses={courses} studentNameToEdit={studentNameToEdit} setStudentNameToEdit={setStudentNameToEdit} courseNameToEdit={courseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} courseRankToEdit={courseRankToEdit} setCourseRankToEdit={setCourseRankToEdit} editMode={editMode} setEditMode={setEditMode} />
            <TableCourses courses={courses} setCourses={setCourses} setStudentNameToEdit={setStudentNameToEdit} setCourseNameToEdit={setCourseNameToEdit} setCourseRankToEdit={setCourseRankToEdit} setEditMode={setEditMode} />
        </>
    );
}
