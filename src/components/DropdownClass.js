import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

axios.defaults.headers.put['Content-Type'] = 'application/json';


function PopulateOption(){
    const {user, setUser} = useContext(UserContext);

    //
    
    
}

export default function DropdownClass({value, setValue}) {
    return (
        <select
            value={value}
            onChange={(event) => {            
                setValue(event.target.value);
            }}
            onClick={(event) => {                
                setValue(event.target.value);
            }}
        >
            

            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <PopulateOption />
        </select>
    )
};