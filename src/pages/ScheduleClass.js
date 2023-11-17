import DropdownCourse from "../components/DropdownCourse"
import { useState } from "react";
import InputDate from "../components/InputDate";
import InputTime from "../components/InputTime";

function TableRowClass({classes})
{
    return(
        <>
            <tr>
                <td>{classes.Cid}</td><td>{classes.ModID}</td><td>{classes.room_no}</td><td>{classes.start_date}</td><td>{classes.end_date}</td><td>{classes.start_time}</td><td>{classes.end_time}</td>
            </tr>
        
        </>
    )
}

function TableClass({classes}){
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
                    </tr>
                </thead>
                <tbody>
                    <TableRowClass classes = {classes}/>
                </tbody>
            </table>
        </>
    )
};

export default function ScheduleClass(){

    const [classes, setClasses] = useState(
        [
            {'Cid': 'C001', 'ModID' : 'M001', 'room_no' : 'COM1-12', 'start_date': '12-Jan-2023', 'end_date' : '12-Jun-2023', 'start_time':'19:00', 'end_time': '21:00'}
        ]
    );

    return(
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Class</h2>
                </div>
            </div>


            <div className="row" style={{ width: '100%' }}>
                <TableClass  classes = {classes}/>
            </div>
        </>
    )

};