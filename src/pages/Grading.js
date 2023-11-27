import { useContext, useState } from "react";
import { GradingToEditContext } from "../contexts/GradingToEditContext";
import DropdownCourse from "../components/DropdownCourse";
import DropdownModule from "../components/DropdownModule";
import DropdownClass from "../components/DropdownClass";


function Selection(){
    const{grade, setGrade, module, setModule, classes, setClasses} = useContext(GradingToEditContext);

    return(
        <>
        <h3>Filter Course</h3>
        <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Module Name</b></td>
                        <td>
                            <DropdownModule value={module} setValue={setModule} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Class ID</b></td>
                        <td>
                            <DropdownClass value={classes} setValue={setClasses} />
                        </td>
                    </tr>
                    <tr>
                        {/* <td colSpan={'2'} style={{ textAlign: 'center' }}>
                            <input type={'reset'} value={'Clear'} />
                            <input type={'button'} value='Create/Update' onClick={processForm} />
                        </td> */}
                    </tr>
                </tbody>
            </table>
        </>
    )
}


function TableRowGrading(){

    const{grade, setGrade, module, setModule, classes, setClasses} = useContext(GradingToEditContext);

    const handleGradingChange = (studentId, grade_selected) => {
        setGrade(grade.map(grades =>
            grades.StuID === studentId ? { ...grades, Grade: grade_selected } : grades
            
        ));
    };
    
    return(

        <>
        
        
        {grade.map(
                grades =>
                <tr key={grades.StuID}>
                    <td>{grades.ModID}</td><td>{grades.StuID}</td><td>James Hardy</td><td>{grades.TYear}</td>
                    <td>
                    <select value={grades.Grade} onChange={e => handleGradingChange(grades.StuID, e.target.value)}>
                            <option value="TBD">TBD</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="F">F</option>

                        </select>
                    </td>
                
                </tr>
            )}

        
        
            
        
            
        </>
    
    )
        
}

function TableGrading(){
    const{grade, setGrade, module, setModule, classes, setClasses} = useContext(GradingToEditContext);

    function processForm(){
        console.log(grade);
    }

    return(
        <>
            <h3>Current Student List</h3>
            <table id="studentTable" border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Module ID</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>TYear</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowGrading/>
                </tbody>
            </table>
            <input type={'button'} value='Submit Changes' onClick={processForm} />
        </>
    )
}


export default function Grading(){

    const[grade, setGrade] = useState(
        [
            {'StuID' : 'S001', 'ModID' : 'TIC2301', 'Grade' : 'TBD', 'TYear' : 2},
            {'StuID' : 'S002', 'ModID' : 'TIC2601', 'Grade' : 'TBD', 'TYear' : 2}
        ]
    )

    const [module, setModule] = useState('');
    const [classes, setClasses] = useState('');


    return(
        <>
            <GradingToEditContext.Provider value={{
                grade, setGrade,
                module, setModule,
                classes, setClasses
            }}>

            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Grading</h2>
                </div>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <Selection />
            </div>
            <div className="row" style={{ width: '100%' }}>
                <TableGrading />
            </div>
            </GradingToEditContext.Provider>

        </>
    )
}