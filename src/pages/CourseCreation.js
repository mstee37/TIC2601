import { useState } from "react"
import InputId from "../components/InputId";
import { Link } from "react-router-dom";

function InputFormCourse({editMode, setEditMode , course, setCourse, CourseIDToEdit, setCourseIDToEdit, CourseNameToEdit, setCourseNameToEdit, CourseTotalMCToEdit, setCourseTotalMCToEdit, CourseDescriptionToEdit, setCourseDescriptionToEdit}){
    
    function processForm(){


        if(editMode === 'create')
        {
            var newCourse = {'CourseID' : CourseIDToEdit, 'CourseName':CourseNameToEdit, 'CourseTotalMC' : CourseTotalMCToEdit, 'CourseDescription' : CourseDescriptionToEdit}
            setCourse(course.concat([newCourse]));
        }
        else if(editMode === 'edit')
        {
            var courses = course.find(courses=>courses.CourseID === CourseIDToEdit)
            courses.CourseID = CourseIDToEdit;
            courses.CourseName = CourseNameToEdit;
            courses.CourseTotalMC = CourseTotalMCToEdit;
            courses.CourseDescription = CourseDescriptionToEdit;
            
            setEditMode('create');
        }

        setCourseIDToEdit('');
        setCourseNameToEdit('');
        setCourseTotalMCToEdit('');
        setCourseDescriptionToEdit('');
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


function TableRowCourse({editMode, setEditMode, course, setCourse, CourseIDToEdit, setCourseIDToEdit, CourseNameToEdit, setCourseNameToEdit, CourseTotalMCToEdit, setCourseTotalMCToEdit, CourseDescriptionToEdit, setCourseDescriptionToEdit})
{

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
        setCourse(course.filter(courses =>
            courses.CourseID !== CourseID
            ))
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

function TableCourse({editMode, setEditMode ,course, setCourse, CourseIDToEdit, setCourseIDToEdit, CourseNameToEdit, setCourseNameToEdit, CourseTotalMCToEdit, setCourseTotalMCToEdit, CourseDescriptionToEdit, setCourseDescriptionToEdit}){

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
                    <TableRowCourse editMode={editMode} setEditMode={setEditMode} course={course} setCourse={setCourse} CourseIDToEdit={CourseIDToEdit} setCourseIDToEdit={setCourseIDToEdit} CourseNameToEdit={CourseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} CourseTotalMCToEdit={CourseTotalMCToEdit} 
                setCourseTotalMCToEdit={setCourseTotalMCToEdit} CourseDescriptionToEdit={CourseDescriptionToEdit} setCourseDescriptionToEdit={setCourseDescriptionToEdit}/>
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

    return(
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Course</h2>
                </div>
            </div>

            <div className="row" style={{ width: '100%' }}>
                <InputFormCourse editMode={editMode} setEditMode={setEditMode} course={course} setCourse={setCourse} CourseIDToEdit={CourseIDToEdit} setCourseIDToEdit={setCourseIDToEdit} CourseNameToEdit={CourseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} CourseTotalMCToEdit={CourseTotalMCToEdit} 
                setCourseTotalMCToEdit={setCourseTotalMCToEdit} CourseDescriptionToEdit={CourseDescriptionToEdit} setCourseDescriptionToEdit={setCourseDescriptionToEdit}
                />
            </div>

            <div className="row" style={{ width: '100%' }}>
                <TableCourse editMode={editMode} setEditMode={setEditMode} course={course} setCourse={setCourse} CourseIDToEdit={CourseIDToEdit} setCourseIDToEdit={setCourseIDToEdit} CourseNameToEdit={CourseNameToEdit} setCourseNameToEdit={setCourseNameToEdit} CourseTotalMCToEdit={CourseTotalMCToEdit} 
                setCourseTotalMCToEdit={setCourseTotalMCToEdit} CourseDescriptionToEdit={CourseDescriptionToEdit} setCourseDescriptionToEdit={setCourseDescriptionToEdit} />
            </div>



        </>
        )
};