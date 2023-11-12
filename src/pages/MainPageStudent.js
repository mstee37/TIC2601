import { Link } from "react-router-dom";

export default function MainPageStudent() {
    return (
        <>
            <h2>Student Main Page</h2>
            <ul>
                <li><Link to='/RegisterCourse'>Register Course</Link></li>
                <li><Link to='/AccessTranscript'>Access Academic Transcript</Link></li>
            </ul>
        </>
    );
};