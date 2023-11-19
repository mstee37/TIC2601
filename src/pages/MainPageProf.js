import { Link } from "react-router-dom";

export default function MainPageProf() {
    return (
        <>
            <h2>Professor Main Page</h2>
            <ul>
                <li><Link to='/MarkAttendence'>Mark Attendence</Link></li>
            </ul>
        </>
    );
};