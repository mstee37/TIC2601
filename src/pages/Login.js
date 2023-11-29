import { useEffect, useState , useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { UserContext } from "../contexts/UserContext";

axios.defaults.headers.put['Content-Type'] = 'application/json';

export default function Login(){
    const [uid, setUID] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    

    


    function checkPassword(pw1,pw2, role){
        console.log(pw1);
        console.log(pw2);
        console.log(role);

        if(pw1 !== pw2){
            setUID('');
            setPassword('');
            setErrMsg("Wrong ID/Password!");
        }
        else{
            
            setUser(uid);
            
            if(role === "professor")
            {   
                navigate('/MainPageProf');
            }else if(role === "student")
            {
                navigate('/MainPageStudent');
            }else if(role === "admin")
            {
                navigate('/MainPageAdmin');
            }
        }
    }

    function processForm(){
        var newLogin = {'UIDs' : uid};

        console.log(uid);

        axios.get('http://localhost:3001/user', {params:{'UID':uid}}).then((response=>{
            console.log(response.data);
            checkPassword(response.data.UPassword, password, response.data.URole);
        }))
        .catch((error)=>{
            if(error.response){
                setErrMsg("Wrong ID/Password!");
                setUID('');
                setPassword('');
            }
            else{
                console.log('Error', error.message);
            }
        })


        //checkLoginStatus();
        
    }


    return(<>
    <div className="div-login">
        <label>User ID : 
            <input type="text" value = {uid} onChange={(event) => {
                setErrMsg('');
                setUID(event.target.value);
            }}/>
        </label>
    </div>
    <div className="div-login">
        <label>Password: 
            <input type="password" value = {password} onChange={(event) => {
                setErrMsg('');
                setPassword(event.target.value);
            }}/>
        </label>
    </div>
    <div>
        <h5>{errMsg}</h5>
    </div>
    <div>
        <input type={'button'} value='Login' onClick={processForm} />
    </div>
    
    </>)
}