import React, { useState, useEffect } from 'react';
import InputId from "../components/InputStudentID";

export default function Transcript() {
    const [studentId, setStudentId] = useState('');
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        if (studentId) {
            fetch(`API_ENDPOINT/grades?studentId=${studentId}`)
                .then(response => response.json())
                .then(data => setGrades(data.filter(grade => grade.value !== null)))
                .catch(error => console.error('Error fetching grades:', error));
        }
    }, [studentId]);

    const calculateGPA = () => {
        const totalGradePoints = grades.reduce((acc, grade) => acc + (grade.value * grade.creditUnits), 0);
        const totalCredits = grades.reduce((acc, grade) => acc + grade.creditUnits, 0);

        return totalCredits !== 0 ? (totalGradePoints / totalCredits).toFixed(2) : 'N/A';
    };

    return (
        <div>
            <h1>Student Grades</h1>
            <div>
                <InputId label='Student ID' value={studentId} setValue={setStudentId} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Credit Units</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.course}</td>
                            <td>{grade.value}</td>
                            <td>{grade.creditUnits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <strong>GPA: </strong> {calculateGPA()}
            </div>
        </div>
    );
}
