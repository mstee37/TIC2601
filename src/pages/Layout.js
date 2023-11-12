import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <h1>Student Management System</h1>

            <Outlet />
            
            <hr />
            <Link to='/Index'>Home</Link>
        </>
    )
};
