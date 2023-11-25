import { useContext, useEffect, useState } from "react";
import InputId from "../components/InputId";
import { Link } from "react-router-dom";
import axios from "axios";

import { CourseToEditContext } from '../contexts/CourseToEditContext';

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormCourse(){
    
    const{editMode, setEditMode , course, setCourse, CourseIDToEdit, setCourseIDToEdit, CourseNameToEdit, setCourseNameToEdit, CourseTotalMCToEdit, setCourseTotalMCToEdit, CourseDescriptionToEdit, setCourseDescriptionToEdit, reloadCourse, setReloadCourse} = useContext(CourseToEditContext);

    function resetInputState(){
        setCourseIDToEdit('');
        setCourseNameToEdit('');
        setCourseTotalMCToEdit('');
        setCourseDescriptionToEdit('');
    }

    function processForm(){

        if(editMode === 'create')
        {
            var newCourse = {'CourseID' : CourseIDToEdit, 'CourseName':CourseNameToEdit, 'CourseTotalMC' : CourseTotalMCToEdit, 'CourseDescription' : CourseDescriptionToEdit}
            axios.put('http://localhost:3001/course', newCourse).then((response)=>{
                resetInputState();
                setReloadCourse(!reloadCourse)
            })
        }
        else if(editMode === 'edit')
        {
            var courses = {'CourseID': CourseIDToEdit, 'CourseName': CourseNameToEdit, 'CourseTotalMC' : CourseTotalMCToEdit, 'CourseDescription' : CourseDescriptionToEdit}
            axios.post('http://localhost:3001/course', courses).then((response=>{
                resetInputState();
                setReloadCourse(!reloadCourse);
                setEditMode('create');
            }))

            
        }

        
    }

    return(

        <>
            <h3>Create/Update Course</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Course ID</b></td>
                        <td>
                            <InputId label='Course ID' value={CourseIDToEdit} setValue={setCourseIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Course Name</b></td>
                        <td>
                            <InputId label='Course Name' value={CourseNameToEdit} setValue={setCourseNameToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Course Total MC</b></td>
                        <td>
                            <InputId label='Course Total MC' value={CourseTotalMCToEdit} setValue={setCourseTotalMCToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Course Description</b></td>
                        <td>
                            <InputId label='Course Description' value={CourseDescriptionToEdit} setValue={setCourseDescriptionToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={'2'} style={{ textAlign: 'center' }}>
                            <input type={'reset'} value={'Clear'} />
                            <input type={'button'} value='Create/Update' onClick={processForm} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
    
}


function TableRowCourse()
{

    const{editMode, setEditMode , course, setCourse, CourseIDToEdit, setCourseIDToEdit, CourseNameToEdit, setCourseNameToEdit, CourseTotalMCToEdit, setCourseTotalMCToEdit, CourseDescriptionToEdit, setCourseDescriptionToEdit, reloadCourse, setReloadCourse} = useContext(CourseToEditContext);
    useEffect(
        () => {
            axios.get('http://localhost:3001/course').then((response) => {
                setCourse(response.data);
            })
        }, [reloadCourse]
    )


    function updateCourse(event, CourseID)
    {
        setEditMode('edit');

        var courses = course.find(courses=>courses.CourseID === CourseID);
        setCourseIDToEdit(courses.CourseID);
        setCourseNameToEdit(courses.CourseName);
        setCourseTotalMCToEdit(courses.CourseTotalMC);
        setCourseDescriptionToEdit(courses.CourseDescription);
    }

    function deleteCourse(event, CourseID)
    {
        axios.delete('http://localhost:3001/course',{params: {'CourseID' : CourseID}}).then((response) => {
            setReloadCourse(!reloadCourse);
        })
    }

    return(
        <>
            {course.map(
                courses =>
                <tr key={courses.CourseID}>
                    <td>{courses.CourseID}</td><td>{courses.CourseName}</td><td>{courses.CourseTotalMC}</td><td>{courses.CourseDescription}</td>
                    <td>
                        <Link onClick={event => updateCourse(event, courses.CourseID)}>Update</Link> |
                        <Link onClick={event => deleteCourse(event, courses.CourseID)}>Delete</Link>
                    </td>
                
                </tr>
            )}

        </>
    )
}

function TableCourse(){

    return(
        <>
            <h3>View ALL Current Course</h3>
            <table id="courseTable" border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Total MC Required</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowCourse/>
                </tbody>
            </table>
        </>
    )
}


export default function CourseCreation(){

    const [editMode, setEditMode] = useState('create');
    const [course, setCourse] = useState(
        [
            {'CourseID' : 'CID12', 'CourseName':'Software Engineering', 'CourseTotalMC' : '140', 'CourseDescription' : 'This course is designed for anyone interested in learning how to understand requirements, specify solutions for complex systems, and deploy scalable, portable, and robust enterprise applications.'}
        ]
    )

    const [CourseIDToEdit, setCourseIDToEdit] = useState('');
    const [CourseNameToEdit, setCourseNameToEdit] = useState('');
    const [CourseTotalMCToEdit, setCourseTotalMCToEdit] = useState('');
    const [CourseDescriptionToEdit, setCourseDescriptionToEdit] = useState('');

    const [reloadCourse, setReloadCourse] = useState(true)

    return(
        <>

            <CourseToEditContext.Provider value={{
                editMode, setEditMode ,
                course, setCourse, 
                CourseIDToEdit, setCourseIDToEdit, 
                CourseNameToEdit, setCourseNameToEdit, 
                CourseTotalMCToEdit, setCourseTotalMCToEdit, 
                CourseDescriptionToEdit, setCourseDescriptionToEdit,
                reloadCourse, setReloadCourse
            }}>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Course</h2>
                </div>
            </div>

            <div className="row" style={{ width: '100%' }}>
                <InputFormCourse />
            </div>

            <div className="row" style={{ width: '100%' }}>
                <TableCourse  />
            </div>
        </CourseToEditContext.Provider>


        </>
        )
};