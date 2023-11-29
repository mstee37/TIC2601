import DropdownCourse from "../components/DropdownCourse"
import { useContext, useEffect, useState } from "react";
import InputDate from "../components/InputDate";
import InputTime from "../components/InputTime";
import InputId from "../components/InputId";
import { Link } from "react-router-dom";
import { ClassToEditContext } from "../contexts/ClassToEditContext";
import DropdownModule from "../components/DropdownModule";


import axios from 'axios';

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormClass(){
    //deleted time here StartTimeToEdit, setStartTimeToEdit, EndTimeToEdit, setEndTimeToEdit,
    const{
        editMode, setEditMode, 
        classes,setClasses,
        CIDToEdit, setCIDToEdit, 
        ModIDToEdit, setModIDToEdit, 
        RoomNoToEdit, setRoomNoToEdit, 
        StartDateToEdit, setStartDateToEdit, 
        EndDateToEdit, setEndDateToEdit,
        
        reloadClasses, setReloadClasses
        
    } = useContext(ClassToEditContext);

    function resetInputState(){
        setCIDToEdit('');
        setModIDToEdit('');
        setRoomNoToEdit('');
        setStartDateToEdit('');
        setEndDateToEdit('');
        //setStartTimeToEdit('');
        //setEndTimeToEdit('');
    }

    function processForm(){


        //deleted time here
        if(editMode === 'create')
        {
            //var newClasses = {'CID': CIDToEdit, 'ModID' : ModIDToEdit, 'RoomNo' : RoomNoToEdit, 'StartDate': StartDateToEdit, 'EndDate' : EndDateToEdit, 'StartTime':StartTimeToEdit, 'EndTime': EndTimeToEdit};
            var newClasses = {'CID': CIDToEdit, 'ModID' : ModIDToEdit, 'RoomNo' : RoomNoToEdit,'StartDate': StartDateToEdit, 'EndDate' : EndDateToEdit};
            axios.post('http://localhost:3001/class', newClasses).then((response)=>{
                resetInputState();
                setReloadClasses(!reloadClasses);
            })
        }
        else if (editMode === 'edit'){
            
            var class_selected = {'CID': CIDToEdit, 'ModID' : ModIDToEdit, 'RoomNo' : RoomNoToEdit, 'StartDate': StartDateToEdit, 'EndDate' : EndDateToEdit};
            //var class_selected = {'CID': CIDToEdit, 'ModID' : ModIDToEdit, 'RoomNo' : RoomNoToEdit, 'StartDate': StartDateToEdit, 'EndDate' : EndDateToEdit, 'StartTime':StartTimeToEdit, 'EndTime': EndTimeToEdit};
            axios.put('http://localhost:3001/class', class_selected).then((response)=>{
            resetInputState();
            setReloadClasses(!reloadClasses)
            setEditMode('create');
        })
            .catch((error)=>{
            if(error.response){
                alert("An error has occurred and failed to create class!");
            }
            else{
                console.log('Error', error.message);
            }
        })

        }
        

       
    }
    
    
    
    return(
        <>
            <h3>Create/Update Class</h3>
            {/* deleted time here refer to notepad */}
            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Class ID</b></td>
                        <td>
                            <InputId label='Class ID' value={CIDToEdit} setValue={setCIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Module Name</b></td>
                        <td>
                            {/* <InputId label='Mod ID' value={ModIDToEdit} setValue={setModIDToEdit} /> */}
                            <DropdownModule value={ModIDToEdit} setValue={setModIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Room No</b></td>
                        <td>
                            <InputId label='Room No' value={RoomNoToEdit} setValue={setRoomNoToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Start Date</b></td>
                        <td>
                            <InputDate minDate='1990-01-01' maxDate='2100-01-01' value={StartDateToEdit} setValue={setStartDateToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>End Date</b></td>
                        <td>
                            {/* <InputDate minDate={'1990-01-01'} maxDate='2100-01-01' value={EndDateToEdit} setValue={setEndDateToEdit} /> */}
                            <InputDate minDate={StartDateToEdit} maxDate='2100-01-01' value={EndDateToEdit} setValue={setEndDateToEdit} />
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


function TableRowClass()
{
    //deleted time here StartTimeToEdit, setStartTimeToEdit, EndTimeToEdit, setEndTimeToEdit,
    const{
        editMode, setEditMode, 
        classes,setClasses,
        CIDToEdit, setCIDToEdit, 
        ModIDToEdit, setModIDToEdit, 
        RoomNoToEdit, setRoomNoToEdit, 
        StartDateToEdit, setStartDateToEdit, 
        EndDateToEdit, setEndDateToEdit,
        
        reloadClasses, setReloadClasses
        
    } = useContext(ClassToEditContext);

    useEffect(
        ()=>{
            axios.get('http://localhost:3001/class').then((response)=>{
                setClasses(response.data);
            })
        },[reloadClasses]
    )

    function updateClass(event, CID) {
        setEditMode('edit')
        console.log('Editing ' + CID)

        var class_selected = classes.find(class_selected=>class_selected.CID === CID);
        setCIDToEdit(class_selected.CID);
        setModIDToEdit(class_selected.ModID);
        setRoomNoToEdit(class_selected.RoomNo);
        setStartDateToEdit(class_selected.StartDate.slice(0, 10));
        setEndDateToEdit(class_selected.EndDate.slice(0, 10));
        //setStartTimeToEdit(class_selected.StartTime);
        //setEndTimeToEdit(class_selected.EndTime);


    }

    function deleteClass(event, CID) {
        axios.delete('http://localhost:3001/class',{params:{'CID':CID}}).then((response)=>{
            setReloadClasses(!reloadClasses);
        })
    }

    return(
        //deleted time here <td>{class_selected.StartTime}</td><td>{class_selected.EndTime}</td>
        <>
            {classes.map(
                class_selected =>
                <tr key={class_selected.CID}>
                <td>{class_selected.CID}</td><td>{class_selected.ModID}</td><td>{class_selected.RoomNo}</td><td>{class_selected.StartDate.slice(0, 10)}</td><td>{class_selected.EndDate.slice(0, 10)}</td>
                <td>
                    <Link onClick={event => updateClass(event, class_selected.CID)}>Update</Link> |
                    <Link onClick={event => deleteClass(event, class_selected.CID)}>Delete</Link>
                </td>
                </tr>
            )}
            
        </>
    )
}

function TableClass(){
    return(
        //deleted time here<th>Start Time</th><th>End Time</th>
        <>
            <h3>View ALL Current Class</h3>
            <table id="classTable" border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Class ID</th>
                        <th>Module ID</th>
                        <th>Room No</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowClass />
                </tbody>
            </table>
        </>
    )
}

export default function ScheduleClass(){

    const [editMode, setEditMode] = useState('create')

    const [classes, setClasses] = useState(
        [
            //{'CID': 'C001', 'ModID' : 'M001', 'RoomNo' : 'COM1-12', 'StartDate': '2023-01-01', 'EndDate' : '2023-06-08', 'StartTime':'19:00', 'EndTime': '21:00'}
            {'CID': 'C001', 'ModID' : 'M001', 'RoomNo' : 'COM1-12', 'StartDate': '2023-01-01', 'EndDate' : '2023-06-08'}
        ]
    );

    const [CIDToEdit, setCIDToEdit] = useState('');
    const [ModIDToEdit, setModIDToEdit] = useState('');
    const [RoomNoToEdit, setRoomNoToEdit] = useState('');
    const [StartDateToEdit, setStartDateToEdit] = useState('');
    const [EndDateToEdit, setEndDateToEdit] = useState('');
    //const [StartTimeToEdit, setStartTimeToEdit] = useState('');
    //const [EndTimeToEdit, setEndTimeToEdit] = useState('');
    const[reloadClasses, setReloadClasses] = useState(true);

    return(
        <>
            {/* deleted time here */}
            <ClassToEditContext.Provider value={{
                    editMode, setEditMode, 
                    classes,setClasses,
                    CIDToEdit, setCIDToEdit, 
                    ModIDToEdit, setModIDToEdit, 
                    RoomNoToEdit, setRoomNoToEdit, 
                    StartDateToEdit, setStartDateToEdit, 
                    EndDateToEdit, setEndDateToEdit,
                    reloadClasses, setReloadClasses
            }}>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Class</h2>
                </div>
            </div>

            <div className="row" style={{ width: '100%' }}>
                <InputFormClass/>
            </div>


            <div className="row" style={{ width: '100%' }}>
                <TableClass />
            </div>
            </ClassToEditContext.Provider>
        </>
    )

};