import DropdownCourse from "../components/DropdownCourse"
import { useState } from "react";
import InputDate from "../components/InputDate";
import InputTime from "../components/InputTime";
import InputId from "../components/InputId";
import { Link } from "react-router-dom";



function InputFormClass({editMode, setEditMode, classes,setClasses,CidToEdit, setCidToEdit, ModIDToEdit, setModIDToEdit, RoomNoToEdit, setRoomNoToEdit, StartDateToEdit, setStartDateToEdit, EndDateToEdit, setEndDateToEdit,
StartTimeToEdit, setStartTimeToEdit, EndTimeToEdit, setEndTimeToEdit}){
    
    function processForm(){

        if(editMode === 'create')
        {
            var newClasses = {'Cid': CidToEdit, 'ModID' : ModIDToEdit, 'RoomNo' : RoomNoToEdit, 'StartDate': StartDateToEdit, 'EndDate' : EndDateToEdit, 'StartTime':StartTimeToEdit, 'EndTime': EndTimeToEdit};
            setClasses(classes.concat([newClasses]));
        }
        else if (editMode === 'edit'){

            var class_selected = classes.find(class_selected=>class_selected.Cid === CidToEdit);
            class_selected.Cid = CidToEdit;
            class_selected.ModID = ModIDToEdit;
            class_selected.RoomNo = RoomNoToEdit;
            class_selected.StartDate = StartDateToEdit;
            class_selected.EndDate = EndDateToEdit;
            class_selected.StartTime = StartTimeToEdit;
            class_selected.EndTime = EndTimeToEdit;
            
            setEditMode('create');
        }
        

        setCidToEdit('');
        setModIDToEdit('');
        setRoomNoToEdit('');
        setStartDateToEdit('');
        setEndDateToEdit('');
        setStartTimeToEdit('');
        setEndTimeToEdit('');
    }
    
    
    
    return(
        <>
            <h3>Create/Update Class</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Class ID</b></td>
                        <td>
                            <InputId label='Class ID' value={CidToEdit} setValue={setCidToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Mod ID</b></td>
                        <td>
                            <InputId label='Mod ID' value={ModIDToEdit} setValue={setModIDToEdit} />
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
                            <InputDate minDate='1990-01-01' maxDate='2100-01-01' value={EndDateToEdit} setValue={setEndDateToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Start Time</b></td>
                        <td>
                            <InputTime value={StartTimeToEdit} setValue={setStartTimeToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>End Time</b></td>
                        <td>
                            <InputTime value={EndTimeToEdit} setValue={setEndTimeToEdit} />
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


function TableRowClass({editMode, setEditMode, classes, setClasses , CidToEdit, setCidToEdit, ModIDToEdit, setModIDToEdit, RoomNoToEdit, setRoomNoToEdit, StartDateToEdit, setStartDateToEdit, EndDateToEdit, setEndDateToEdit,
    StartTimeToEdit, setStartTimeToEdit, EndTimeToEdit, setEndTimeToEdit})
{

    function updateClass(event, Cid) {
        setEditMode('edit')
        console.log('Editing ' + Cid)

        var class_selected = classes.find(class_selected=>class_selected.Cid === Cid);
        setCidToEdit(class_selected.Cid);
        setModIDToEdit(class_selected.ModID);
        setRoomNoToEdit(class_selected.RoomNo);
        setStartDateToEdit(class_selected.StartDate);
        setEndDateToEdit(class_selected.EndDate);
        setStartTimeToEdit(class_selected.StartTime);
        setEndTimeToEdit(class_selected.EndTime);


    }

    function deleteClass(event, Cid) {
        setClasses(classes.filter(class_selected =>
            class_selected.Cid !== Cid
        ))
    }

    return(
        <>
            {classes.map(
                class_selected =>
                <tr key={class_selected.Cid}>
                <td>{class_selected.Cid}</td><td>{class_selected.ModID}</td><td>{class_selected.RoomNo}</td><td>{class_selected.StartDate}</td><td>{class_selected.EndDate}</td><td>{class_selected.StartTime}</td><td>{class_selected.EndTime}</td>
                <td>
                    <Link onClick={event => updateClass(event, class_selected.Cid)}>Update</Link> |
                    <Link onClick={event => deleteClass(event, class_selected.Cid)}>Delete</Link>
                </td>
                </tr>
            )}
            
        </>
    )
}

function TableClass({editMode, setEditMode, classes,setClasses,CidToEdit, setCidToEdit, ModIDToEdit, setModIDToEdit, RoomNoToEdit, setRoomNoToEdit, StartDateToEdit, setStartDateToEdit, EndDateToEdit, setEndDateToEdit,
    StartTimeToEdit, setStartTimeToEdit, EndTimeToEdit, setEndTimeToEdit}){
    return(
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
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowClass editMode={editMode} setEditMode = {setEditMode} classes = {classes} setClasses = {setClasses} CidToEdit = {CidToEdit} setCidToEdit = {setCidToEdit} ModIDToEdit = {ModIDToEdit} setModIDToEdit = {setModIDToEdit}
                RoomNoToEdit = {RoomNoToEdit} setRoomNoToEdit = {setRoomNoToEdit} StartDateToEdit = {StartDateToEdit} setStartDateToEdit = {setStartDateToEdit}
                EndDateToEdit = {EndDateToEdit} setEndDateToEdit = {setEndDateToEdit} StartTimeToEdit = {StartTimeToEdit} setStartTimeToEdit={setStartTimeToEdit}
                EndTimeToEdit = {EndTimeToEdit} setEndTimeToEdit={setEndTimeToEdit}/>
                </tbody>
            </table>
        </>
    )
}

export default function ScheduleClass(){

    const [editMode, setEditMode] = useState('create')

    const [classes, setClasses] = useState(
        [
            {'Cid': 'C001', 'ModID' : 'M001', 'RoomNo' : 'COM1-12', 'StartDate': '2023-01-01', 'EndDate' : '2023-06-08', 'StartTime':'19:00', 'EndTime': '21:00'}
        ]
    );

    const [CidToEdit, setCidToEdit] = useState('');
    const [ModIDToEdit, setModIDToEdit] = useState('');
    const [RoomNoToEdit, setRoomNoToEdit] = useState('');
    const [StartDateToEdit, setStartDateToEdit] = useState('');
    const [EndDateToEdit, setEndDateToEdit] = useState('');
    const [StartTimeToEdit, setStartTimeToEdit] = useState('');
    const [EndTimeToEdit, setEndTimeToEdit] = useState('');

    return(
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Class</h2>
                </div>
            </div>

            <div className="row" style={{ width: '100%' }}>
                <InputFormClass editMode={editMode} setEditMode = {setEditMode} classes = {classes} setClasses = {setClasses} CidToEdit = {CidToEdit} setCidToEdit = {setCidToEdit} ModIDToEdit = {ModIDToEdit} setModIDToEdit = {setModIDToEdit}
                RoomNoToEdit = {RoomNoToEdit} setRoomNoToEdit = {setRoomNoToEdit} StartDateToEdit = {StartDateToEdit} setStartDateToEdit = {setStartDateToEdit}
                EndDateToEdit = {EndDateToEdit} setEndDateToEdit = {setEndDateToEdit} StartTimeToEdit = {StartTimeToEdit} setStartTimeToEdit={setStartTimeToEdit}
                EndTimeToEdit = {EndTimeToEdit} setEndTimeToEdit={setEndTimeToEdit}/>
            </div>


            <div className="row" style={{ width: '100%' }}>
                <TableClass  editMode={editMode} setEditMode = {setEditMode} classes = {classes} setClasses = {setClasses} CidToEdit = {CidToEdit} setCidToEdit = {setCidToEdit} ModIDToEdit = {ModIDToEdit} setModIDToEdit = {setModIDToEdit}
                RoomNoToEdit = {RoomNoToEdit} setRoomNoToEdit = {setRoomNoToEdit} StartDateToEdit = {StartDateToEdit} setStartDateToEdit = {setStartDateToEdit}
                EndDateToEdit = {EndDateToEdit} setEndDateToEdit = {setEndDateToEdit} StartTimeToEdit = {StartTimeToEdit} setStartTimeToEdit={setStartTimeToEdit}
                EndTimeToEdit = {EndTimeToEdit} setEndTimeToEdit={setEndTimeToEdit}/>
            </div>
        </>
    )

};