import { Link } from "react-router-dom";

export default function MainPageProf() {
    return (
        <>
            <h2>Professor Main Page</h2>
            <ul>
                <li><Link to='/MarkAttendence'>Mark Attendence</Link></li>
                <li><Link to='/Feedback'>View Feedback on Classes</Link></li>
            </ul>
        </>
    );
};