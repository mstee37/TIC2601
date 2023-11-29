import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext,useState, useEffect } from "react";
import axios from "axios";

export default function MainPageStudent() {
    const {user, setUser} = useContext(UserContext);
    const {noti, setNoti} = useContext(UserContext);

    async function Fetchdata(){
        try{
            const getCourse = await axios
            .get('http://localhost:3001/student',{params:
            {'SID': user,}});
            const courseResult = getCourse.data;

            console.log("fetch data");
            console.log(courseResult);
            const getNotification = await axios.get('http://localhost:3001/notification',{params: 
            {'CourseID': courseResult,}})
            const getNotiResult = getNotification.data;
            setNoti(getNotiResult[0].Message);

        } catch(error){
            console.log(error);
        }
    }
    
    

     useEffect(
         () => {
            
            Fetchdata();
         }, [noti]
         )


    return (
        <>
            <h2>Student Main Page</h2>
            <ul>
                <li><Link to='/RegisterCourse'>Register Course</Link></li>
                <li><Link to='/Feedback'>Feedback on Class</Link></li>
                <li><Link to='/Transcript'>Access Academic Transcript</Link></li>
            </ul>
        </>
    );
};