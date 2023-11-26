import { useContext , useEffect, useState} from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

axios.defaults.headers.put['Content-Type'] = 'application/json';




export default function DropdownModule({value, setValue}) {

    const [data, setData] = useState([]);

    function PopulateOption(){
        //const {user, setUser} = useContext(UserContext);

        useEffect(
            () => {
                axios.get('http://localhost:3001/modules').then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
            }, []
        )
        
        
    }

    PopulateOption();
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
            

            {/* <option value={"Business Analytics"}>Business Analytics</option>
            <option value={"Software Engineering"}>Software Engineering</option>
            <option value={"Cybersecurity"}>Cybersecurity</option>
            <option value={"Business Administration"}>Business Administration</option>
            <option value={"Economics"}>Economics</option>
            <option value={"Banking & Finance"}>Banking & Finance</option> */}
            
            <option value={""}>---Select Module from this Dropdown---</option>
            {
                data.map(
                    (datalist) => {
                        return <option value={datalist.MID}>{datalist.MName}</option>;
                    }
                )
            }
            
            
        </select>
    )
};