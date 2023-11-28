import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filterId, setFilterId] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);

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
                SCourseID: editingStudent.newCourseID // Assuming newCourseID is the updated course ID
            });
            fetchStudents();
            setEditingStudent(null);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleCourseIdChange = (e) => {
        setEditingStudent(prev => ({ ...prev, newCourseID: e.target.value }));
    };

    const handleFilterChange = (e) => {
        const id = e.target.value;
        setFilterId(id);

        if (id) {
            const filtered = students.filter(student => student.SID.toString() === id);
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents([]);
        }
    };

    const renderTable = () => (
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
                {filteredStudents.map((student) => (
                    <tr key={student.SID}>
                        <td>{student.SID}</td>
                        <td>{student.SName}</td>
                        <td>
                            {editingStudent?.SID === student.SID ? (
                                <input
                                    type="text"
                                    value={editingStudent.newCourseID || student.SCourseID}
                                    onChange={handleCourseIdChange}
                                />
                            ) : (
                                student.SCourseID
                            )}
                        </td>
                        <td>{student.SBatch}</td>
                        <td>{student.SYear}</td>
                        <td>{student.SStatus}</td>
                        <td>
                            {editingStudent?.SID === student.SID ? (
                                <button onClick={handleSave}>Save</button>
                            ) : (
                                <button onClick={() => handleEdit(student)}>Edit</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h2>Register your couse below by editing Course ID </h2>
            <div>
                <label htmlFor="filterId">Input Student ID:</label>
                <input
                    type="text"
                    id="filterId"
                    value={filterId}
                    onChange={handleFilterChange}
                />
            </div>
            {filterId && filteredStudents.length > 0 && renderTable()}
        </div>
    );
}

export default StudentList;
