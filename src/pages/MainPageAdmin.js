import { Link } from "react-router-dom";

export default function MainPageAdmin() {
    return (
        <>
            <h2>Admin Main Page</h2>
            <ul>
                <li><Link to='/SendNoti'>Send Notifications</Link></li>
                <li><Link to='/CheckEnrollment'>Check Student's Enrollment Status</Link></li>
                <li><Link to='/ScheduleClass'>Schedule Class</Link></li>
            </ul>
        </>
    );
};