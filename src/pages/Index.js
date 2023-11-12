import { Link } from "react-router-dom";

export default function Index() {
    return (
        <>
            <h2>Login</h2>
            <ul>
                <li><Link to='/LoginPageStudent'>Login as Student</Link></li>
                <li><Link to='/LoginPageProf'>Login as Professor</Link></li>
                <li><Link to='/LoginPageAdmin'>Login as Admin</Link></li>
            </ul>
        </>
    );
};
