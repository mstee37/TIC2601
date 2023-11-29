import { useContext, useState, useEffect } from "react";
import { EnrollmentToEditContext } from "../contexts/EnrollmentToEditContext";
import DropdownCourse from "../components/DropdownCourse";
import axios from "axios";

function TableRowEnrollment(){

    const{status, setStatus, course, setCourse, reloadRow, setReloadRow} = useContext(EnrollmentToEditContext);

    const handleStatusChange = (studentId, status_selected)=> {
        setStatus(status.map(statuses =>
            statuses.SID === studentId ? { ...statuses, SStatus: status_selected } : statuses
            
        ));
        
    };

    

    return(
        <>
            {status.map(
                        status_selected =>  
                        <tr key={status_selected.SID}>
                            <td>{status_selected.SCourseID}</td><td>{status_selected.SID}</td><td>{status_selected.SName}</td>
                            <td>
                            <select value={status_selected.SStatus} onChange={e => handleStatusChange(status_selected.SID, e.target.value)}>
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


        try{
            for(var x=0;x<status.length;x++)
        {
            let obj = status[x];

            console.log(obj.SID);

            var stuRow = {'SID' : obj.SID, 'SCourseID' : obj.SCourseID, 'SStatus' : obj.SStatus};
            axios.post('http://localhost:3001/courseEnrollment', stuRow).then((response=>{
                console.log(response.status);
            }))
        }

        alert("Enrollment Data successfully updated");
        setCourse("");
        }
        catch(e){
            console.log(e);
        }
        
        
        
        

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

    // const [status, setStatus] = useState(
    //     [
    //         {'SCourseID' : 'Btech', 'SID' : 'S002', 'SName' : 'John Doe' ,'SStatus' : 'R'},
    //         {'SCourseID' : 'Btech', 'SID' : 'S003', 'SName' : 'James' ,'SStatus' : ''}
    //     ]
    // )

    const [status, setStatus] = useState(
        [
        ]
    )

    const [course, setCourse] = useState('');
    const [reloadRow, setReloadRow] = useState(true);


    useEffect(
        () => { 
        axios.get('http://localhost:3001/courseEnrollment',{params: 
        {'SCourseID':course,}}).then((response) => {
                console.log(response.data);
                setStatus(response.data);
            })
        }, [course]
    )
    


    return(
        <>
            <EnrollmentToEditContext.Provider value={{
                status, setStatus,
                course, setCourse,
                reloadRow, setReloadRow
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