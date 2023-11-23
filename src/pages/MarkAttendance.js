import React, { useState } from 'react';
import InputId from "../components/InputId";
import InputDate from "../components/InputDate";

export default function MarkAttendance() {
    const [classId, setClassId] = useState('');
    const [classDate, setClassDate] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [students, setStudents] = useState([
        { studentId: 'S001', name: 'John', attendance: 'N' },
        { studentId: 'S002', name: 'Jane', attendance: 'N' },
        // ... other students
    ]);

    const handleAttendanceChange = (studentId, attendance) => {
        setStudents(students.map(student =>
            student.studentId === studentId ? { ...student, attendance: attendance ? 'Y' : 'N' } : student
        ));
    };

    const handleSubmit = () => {
        const attendanceData = {
            classId,
            classDate,
            roomNumber,
            students
        };

        fetch('API_ENDPOINT/submit-attendance', { // Replace API_ENDPOINT with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Attendance submitted successfully');
                // Additional actions upon successful submission (like showing a message)
            } else {
                console.error('Failed to submit attendance');
                // Handle errors
            }
        })
        .catch(error => console.error('Error submitting attendance:', error));
    };

    const shouldShowTable = classId && classDate && roomNumber;

    return (
        <div>
            <h1>Mark Attendance</h1>
            <div>
                <InputId label='Class ID' value={classId} setValue={setClassId} />
                <InputDate label='Class Date' minDate='2020-01-01' maxDate='2030-12-31' value={classDate} setValue={setClassDate} />
                <InputId label='Room Number' value={roomNumber} setValue={setRoomNumber} />
            </div>
            {shouldShowTable && (
                <>
                    <table border={'1'} style={{ width: '100%', position: "relative" }}>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Class ID</th>
                            <th>Room Number</th>
                            <th>Date</th>
                            <th>Attendance Y/N</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.studentId}</td>
                                <td>{student.name}</td>
                                <td>{classId}</td>
                                <td>{roomNumber}</td> {/* Display room number */}
                                <td>{classDate}</td>
                                <td>
                                    <select value={student.attendance} onChange={e => handleAttendanceChange(student.studentId, e.target.value === 'Y')}>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <button onClick={handleSubmit}>Submit Attendance</button>
                </>
            )}
        </div>
    );
}
