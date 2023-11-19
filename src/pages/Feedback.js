import { useState } from 'react';
import InputId from "../components/InputId";

export default function SendFeedback() {
    const [classId, setClassId] = useState('');
    const [feedback, setFeedback] = useState('');

    const feedbackHandler = (e) => {
        setFeedback(e.target.value);
    }

    function submitFeedback() {
        console.log("Sent feedback for class ID:", classId, "with the feedback:", feedback);
        setClassId('');
        setFeedback('');
    }

    return (
        <>
            <div className="send-feedback-view">
                <h1>Send Feedback</h1>
                <div>
                    <label>
                        Class ID:
                        <InputId label='Class ID' value={classId} setValue={setClassId} />
                    </label>
                </div>
                <div>
                    <label>
                        Feedback:
                    </label>
                </div>
                <div>
                    <textarea className="feedback-box" value={feedback} onChange={feedbackHandler}></textarea>
                </div>
                <button type="submit" onClick={submitFeedback}>Submit</button>
            </div>
        </>
    )
};
