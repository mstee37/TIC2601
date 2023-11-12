import { Link } from "react-router-dom";

export default function Index() {
    return (
        <>
            <h2>Index</h2>
            <ul>
                {/* <li><Link to='/Index'>Index</Link></li>
                <li><Link to='/Src01'>Src01 - Creating and Nesting Components</Link></li>
                <li><Link to='/Src02'>Src02 - Creating and Nesting Components</Link></li>
                <li><Link to='/Src03'>Src03 - Styling Components</Link></li>
                <li><Link to='/Src04'>Src04 - Displaying Data with JSX</Link></li>
                <li><Link to='/Src05'>Src05 - Conditional Rendering</Link></li>
                <li><Link to='/Src06'>Src06 - Iterative Rendering</Link></li>
                <li><Link to='/Src07'>Src07 - Combining Conditional and Iterative Rendering</Link></li>
                <li><Link to='/Src08'>Src08 - Responding to Events</Link></li>
                <li><Link to='/Src09'>Src09 - Handling States with useState Hook</Link></li>
                <li><Link to='/Src10'>Src10 - Props</Link></li>
                <li><Link to='/Src11/val1/val2'>Src11 - useParams = param1=val1 and param2=val2</Link></li> */}

                <li><Link to='/LoginPage'>Login as Student</Link></li>
                <li><Link to='/LoginPage'>Login as Professor</Link></li>
                <li><Link to='/LoginPage'>Login as Admin</Link></li>
            </ul>
        </>
    );
};
