import { useContext, useState, useEffect } from "react";
import { GradingToEditContext } from "../contexts/GradingToEditContext";
import DropdownCourse from "../components/DropdownCourse";
import DropdownModule from "../components/DropdownModule";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";


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
    const {user, setUser} = useContext(UserContext);


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
                    <td>{grades.ModID}</td><td>{grades.StuID}</td><td>{grades.SName}</td><td>{grades.TYear}</td>
                    <td>
                    <select value={grades.Grade} onChange={e => handleGradingChange(grades.StuID, e.target.value)}>
                            <option value=""></option>
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
    const {user, setUser} = useContext(UserContext);


    function processForm(){
        console.log(grade);

        for(var x=0;x<grade.length;x++)
        {
            let obj = grade[x];

            console.log(obj.StuID);

            var stuRow = {'StuID' : obj.StuID, 'ModID' : obj.ModID, 'Grade' : obj.Grade, 'TYear' : obj.TYear};
            axios.post('http://localhost:3001/transcript', stuRow).then((response=>{
                console.log(response.status);
            }))
        }

    
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
        []
    )

    const [module, setModule] = useState('');
    const [classes, setClasses] = useState('');
    const [reloadGrade, setReloadGrade] = useState(true);
    const {user, setUser} = useContext(UserContext);


    useEffect(
        () => {
        axios.get('http://localhost:3001/transcript',{params: 
        {'ProfID': user, 
        'ModID':module,}}).then((response) => {
                //console.log(response.data);
                setGrade(response.data);
            })
        }, [module]
    )


    return(
        <>
            <GradingToEditContext.Provider value={{
                grade, setGrade,
                module, setModule,
                classes, setClasses,
                reloadGrade, setReloadGrade
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