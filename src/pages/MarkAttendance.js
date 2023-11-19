import React, { useState, useEffect } from 'react';
import InputId from "../components/InputId";
import InputDate from "../components/InputDate";

export default function MarkAttendance() {
    const [classId, setClassId] = useState('');
    const [classDate, setClassDate] = useState('');
    const [students, setStudents] = useState([]);

    // fetch from dbms with API endpoint
    useEffect(() => {
        if (classId && classDate) {
            fetch(`API_ENDPOINT/students?classId=${classId}&date=${classDate}`)
                .then(response => response.json())
                .then(data => setStudents(data.map(student => ({ ...student, isPresent: false }))))
                .catch(error => console.error('Error fetching students:', error));
        }
    }, [classId, classDate]);

    const handleAttendanceChange = (studentId, isPresent) => {
        setStudents(students.map(student => 
            student.id === studentId ? { ...student, isPresent: isPresent } : student
        ));
    };

    const submitAttendance = () => {
        // Replace 'API_ENDPOINT' with your actual API endpoint for submitting attendance
        fetch('API_ENDPOINT/submit-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classId, classDate, students }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Attendance submitted successfully');
                // Handle successful submission, maybe clear form or show a success message
            } else {
                console.error('Failed to submit attendance');
                // Handle errors
            }
        })
        .catch(error => console.error('Error submitting attendance:', error));
    };

    return (
        <div>
            <h1>Mark Attendance</h1>
            <div>
                <InputId label='Class ID' value={classId} setValue={setClassId} />
                <InputDate 
                    label='Class Date' 
                    minDate='2020-01-01'  // Adjust these dates as needed
                    maxDate='2030-12-31'
                    value={classDate} 
                    setValue={setClassDate} 
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={student.isPresent} 
                                    onChange={e => handleAttendanceChange(student.id, e.target.checked)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={submitAttendance}>Submit Attendance</button>
        </div>
    );
}
