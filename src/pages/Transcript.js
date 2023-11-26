import React, { useState, useEffect } from 'react';
import InputId from "../components/InputStudentID";
import axios from 'axios';

export default function Transcript() {
    const [studentId, setStudentId] = useState('');
    const [transcripts, setTranscripts] = useState([]);

    // useEffect(
    //     () => {
    //     if (studentId) {
    //         axios.get(`http://localhost:3001/Transcripts?StuID=${studentId}`).then((response) => {
    //             setTranscripts(response.data);
    //         })}
    //     }, [studentId]
    // )

    return (
        <div>
            <h1>Student Transcript</h1>
            <div>
                <InputId label='Student ID' value={studentId} setValue={setStudentId} />
            </div>
            <table border={'1'} style={{ width: '100%', position: "relative" }}>
                <thead>
                    <tr>
                        <th>StuID</th>
                        <th>ModID</th>
                        <th>Grade</th>
                        <th>TYear</th>
                    </tr>
                </thead>
                <tbody>
                    {transcripts.map((transcript, index) => (
                        <tr key={index}>
                            <td>{transcript.StuID}</td>
                            <td>{transcript.ModID}</td>
                            <td>{transcript.Grade}</td>
                            <td>{transcript.TYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
