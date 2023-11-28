import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({
        StuID: '', // Student ID
        ClsID: '', // Class ID
        Feedback: '', // Feedback text
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/classTaken`, {
                StuID: feedback.StuID,
                ClsID: feedback.ClsID,
                Feedback: feedback.Feedback,
            });
            // Optionally, handle success, reset form, or show a success message
            console.log('Feedback submitted successfully');
            setFeedback({ StuID: '', ClsID: '', Feedback: '' }); // Reset form fields
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="StuID">Student ID:</label>
                <input
                    type="text"
                    id="StuID"
                    name="StuID"
                    value={feedback.StuID}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="ClsID">Class ID:</label>
                <input
                    type="text"
                    id="ClsID"
                    name="ClsID"
                    value={feedback.ClsID}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="Feedback">Feedback:</label>
                <textarea
                    id="Feedback"
                    name="Feedback"
                    value={feedback.Feedback}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
