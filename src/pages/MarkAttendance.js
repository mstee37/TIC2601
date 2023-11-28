import React, { useState } from 'react';
import axios from 'axios';

function ManageAttendance() {
    const [profId, setProfId] = useState('');
    const [classId, setClassId] = useState('');
    const [date, setDate] = useState('');
    const [attendanceList, setAttendanceList] = useState([]);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/studentAttendance`, {
                params: { ProfID: profId, ClsID: classId, Date: date }
            });
            setAttendanceList(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const handleAttendanceChange = (studentId, newAttendance) => {
        setAttendanceList(currentList => 
            currentList.map(item => 
                item.StuID === studentId ? { ...item, Attendance: newAttendance } : item
            )
        );
    };

    const submitAttendance = async () => {
        try {
            await Promise.all(attendanceList.map(student => 
                axios.post(`http://localhost:3001/studentAttendance`, {
                    StuID: student.StuID,
                    ClsID: student.ClsID,
                    Date: student.Date,
                    Attendance: student.Attendance
                })
            ));
            alert('Attendance updated successfully');
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    return (
        <div>
            <h2>Mark Student Attendance</h2>
            <div>
                <input
                    type="text"
                    placeholder="Professor ID"
                    value={profId}
                    onChange={(e) => setProfId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Class ID"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={fetchAttendance}>Click to Mark Attendance</button>
            </div>
            {attendanceList.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Class ID</th>
                            <th>Date</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.map((attendance, index) => (
                            <tr key={index}>
                                <td>{attendance.StuID}</td>
                                <td>{attendance.ClsID}</td>
                                <td>{attendance.Date}</td>
                                <td>
                                    <select
                                        value={attendance.Attendance}
                                        onChange={(e) => handleAttendanceChange(attendance.StuID, e.target.value)}
                                    >
                                        <option value="N">No</option>
                                        <option value="Y">Yes</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={submitAttendance}>Submit Updates</button>
        </div>
    );
}

export default ManageAttendance;
