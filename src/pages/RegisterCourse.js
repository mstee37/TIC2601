import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

function RegisterCourse() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [inputStudentId, setInputStudentId] = useState('');

    const userID = useContext(UserContext).user;

    // console.log("ID= ", userID);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3001/student');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleEdit = (student) => {
        setEditingStudent({ ...student });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/student`, {
                ...editingStudent,
                SCourseID: editingStudent.newCourseID
            });
            await fetchStudents();
            setEditingStudent(null);
            alert("Course Registered Successfully.")
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleCourseIdChange = (e) => {
        setEditingStudent(prev => ({ ...prev, newCourseID: e.target.value }));
    };

    const handleInputStudentIdChange = (e) => {
        setInputStudentId(e.target.value);
    };

    const displayFilteredStudent = () => {

        // const student = students.find(s => s.SID.toString() === inputStudentId);

        const student = students.find(s => s.SID.toString() === userID);
        
        if (student) {
            setEditingStudent(student);
        } else {
            alert("Student not found.");
            setEditingStudent(null);
        }
    };

    return (
        <div>
            <h2>Register Course</h2>
            <div>
                {/* <label htmlFor="inputStudentId">Input Student ID: </label>
                <input
                    type="text"
                    id="inputStudentId"
                    value={inputStudentId}
                    onChange={handleInputStudentIdChange}
                /> */}
                <button onClick={displayFilteredStudent}>Click to Input/Edit Course</button>
            </div>
            {editingStudent && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Course ID</th>
                            <th>Batch</th>
                            <th>Year</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={editingStudent.SID}>
                            <td>{editingStudent.SID}</td>
                            <td>{editingStudent.SName}</td>
                            <td>
                                <input
                                    type="text"
                                    value={editingStudent.newCourseID || editingStudent.SCourseID}
                                    onChange={handleCourseIdChange}
                                />
                            </td>
                            <td>{editingStudent.SBatch}</td>
                            <td>{editingStudent.SYear}</td>
                            <td>{editingStudent.SStatus}</td>
                            <td>
                                <button onClick={handleSave}>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RegisterCourse;
