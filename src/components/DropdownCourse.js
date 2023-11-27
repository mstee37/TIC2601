import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.headers.put['Content-Type'] = 'application/json';


export default function DropdownCourse({value, setValue}) {

    const [data, setData] = useState([]);
    
        function PopulateOption(){
            useEffect(
                () => {
                    axios.get('http://localhost:3001/course').then((response) => {
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
            <option value={""}>---Select Course from this Dropdown---</option>
            {
                data.map(
                    (datalist) => {
                        return <option value={datalist.CourseID}>{datalist.CourseName}</option>;
                    }
                )
            }

        </select>
    )
};