import { useContext, useState } from "react";
import { EnrollmentToEditContext } from "../contexts/EnrollmentToEditContext";
import DropdownCourse from "../components/DropdownCourse";


function TableRowEnrollment(){

    const{status, setStatus, course, setCourse} = useContext(EnrollmentToEditContext);

    const handleStatusChange = (studentId, status_selected)=> {
        setStatus(status.map(statuses =>
            statuses.StuID === studentId ? { ...statuses, Status: status_selected } : statuses
            
        ));
    };

   

    return(
        <>
            {status.map(
                        status_selected =>
                        <tr key={status_selected.StuID}>
                            <td>{status_selected.CrsID}</td><td>{status_selected.StuID}</td><td>{status_selected.SName}</td>
                            <td>
                            <select value={status_selected.Status} onChange={e => handleStatusChange(status_selected.StuID, e.target.value)}>
                                <option value=""></option>
                                <option value="A">A</option>
                                <option value="R">R</option>
                            </select>
                            </td>
                        </tr>
                    )}
        </>
    )

}


function TableEnrollment(){
    
    const{status, setStatus, course, setCourse} = useContext(EnrollmentToEditContext);

    function processForm(){
        console.log(course);
    }

    return(
        <>
            <h3>List of Student</h3>
            <table id="studentTable" border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowEnrollment/>
                </tbody>
            </table>
            <input type={'button'} value='Submit Changes' onClick={processForm} />
        </>
    )
}


export default function Enrollment(){

    const [status, setStatus] = useState(
        [
            {'CrsID' : 'Btech', 'StuID' : 'S002', 'SName' : 'John Doe' ,'Status' : 'R'},
            {'CrsID' : 'Btech', 'StuID' : 'S003', 'SName' : 'James' ,'Status' : ''}
        ]
    )

    const [course, setCourse] = useState('');


    return(
        <>
            <EnrollmentToEditContext.Provider value={{
                status, setStatus,
                course, setCourse
            }}>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Enrollment</h2>
                </div>
            </div>
            
               
                   
            <td width={'20%'}><b>Course Name :  </b></td>
                        <td>
                            <DropdownCourse value={course} setValue={setCourse} />
                        </td>            
                    
                
            

            <div className="row" style={{ width: '100%' }}>
                <TableEnrollment />
            </div>
            </EnrollmentToEditContext.Provider>
        </>
    )
}