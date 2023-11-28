import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewTranscript() {
    const [studentId, setStudentId] = useState('');
    const [allTranscripts, setAllTranscripts] = useState([]);
    const [filteredTranscripts, setFilteredTranscripts] = useState([]);

    useEffect(() => {
        // Fetch all transcripts initially
        const fetchAllTranscripts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/transcript');
                setAllTranscripts(response.data);
            } catch (error) {
                console.error('Error fetching transcripts:', error);
            }
        };

        fetchAllTranscripts();
    }, []);

    const handleFetchTranscript = () => {
        // Filter transcripts based on the entered student ID
        const filtered = allTranscripts.filter(transcript => transcript.StuID.toString() === studentId);
        setFilteredTranscripts(filtered);
    };

    return (
        <div>
            <h2>View Transcript</h2>
            <div>
                <label htmlFor="studentId">Student ID:</label>
                <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <button onClick={handleFetchTranscript}>Fetch Transcript</button>
            </div>
            {filteredTranscripts.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Module ID</th>
                            <th>Grade</th>
                            <th>Transcript Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTranscripts.map((transcript, index) => (
                            <tr key={index}>
                                <td>{transcript.ModID}</td>
                                <td>{transcript.Grade}</td>
                                <td>{transcript.TYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewTranscript;
