import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";


function CheckUser(){

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    var role = user.charAt(0);

    function navigateRolePage()
    {
        if(role === 'A')
        {
            navigate('/MainPageAdmin');
        }
        else if(role === 'P')
        {
            navigate('/MainPageProf');
        }
        else if(role === 'S')
        {
            navigate('/MainPageStudent');
        }
    }

    if(user !== '')
    {
        return(
            <>
                <div>
                    <h1>Welcome back, {user}</h1>
                    <input type={'button'} value='Home' onClick={navigateRolePage} ></input>
                </div>
            </>
        )
    }
}


export default function Layout() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    
    function logout(){
        setUser('');
        navigate('/Login');
    }

    return (
        <>
            <h1>Student Management System</h1>
            <div>
                <CheckUser />
            </div>
            <hr />

            <Outlet />
            
            
            <hr />
            <input type={'button'} value='Logout' onClick={logout}/>
            <Link to='/Index'>Stuck</Link>
        </>
    )
};
