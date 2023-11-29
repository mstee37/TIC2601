import { Link } from "react-router-dom";

export default function MainPageProf() {
    return (
        <>
            <h2>Professor Main Page</h2>
            <ul>
                <li><Link to='/MarkAttendance'>Mark Attendance</Link></li>
                <li><Link to='/Grading'>Grading</Link></li>
            </ul>
        </>
    );
};