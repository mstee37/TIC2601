import React, { useState } from 'react';
import axios from 'axios';
import InputId from "../components/InputId";
import InputDate from "../components/InputDate";

export default function MarkAttendance() {
    const [classId, setClassId] = useState('');
    const [classDate, setClassDate] = useState('');
    const [students, setStudents] = useState([
        { studentId: 'S001', name: 'John', attendance: 'N' },
        { studentId: 'S002', name: 'Jane', attendance: 'N' },
    ]);

    const handleAttendanceChange = (studentId, attendance) => {
        setStudents(students.map(student =>
            student.studentId === studentId ? { ...student, attendance: attendance } : student
        ));
    };

    const handleSubmit = () => {
        const newAttendance = {
            classId,
            classDate,
            students
        };

        axios.post('http://localhost:3001/studentAttendance', newAttendance)
             .then(response => {
                 console.log('Attendance submitted successfully');
             }).catch(error => {
                 console.error('Error submitting attendance:', error);
             });
    };

    const shouldShowTable = classId && classDate;

    return (
        <div>
            <h1>Mark Attendance</h1>
            <div>
                <InputId label='Class ID' value={classId} setValue={setClassId} />
                <InputDate label='Class Date' minDate='2020-01-01' maxDate='2030-12-31' value={classDate} setValue={setClassDate} />
            </div>
            {shouldShowTable && (
                <>
                    <table border={'1'} style={{ width: '100%', position: "relative" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Class ID</th>
                                <th>Class Date</th>
                                <th>Attendance Y/N</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{classId}</td>
                                    <td>{classDate}</td>
                                    <td>
                                        <select value={student.attendance} onChange={e => handleAttendanceChange(student.studentId, e.target.value)}>
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
