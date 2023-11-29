import DropdownCourse from "../components/DropdownCourse";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

    export default function SendNoti(){

        const [course, setCourse] = useState('');
        const [message, setMessage] = useState('');



        const notiHandler = (e) => {
            setMessage(e.target.value);
        }


        // useEffect(
        //     () => {
        //     axios.get('http://localhost:3001/notification',{params: 
        //     {'Course': course}}).then((response) => {
        //             //console.log(response.data);
        //             setDataSent(response.data);
        //             //NEED TO TRANSFER THE DATA TO MESSAGE AND DATE

        //         })
        //     }, [module]
        // )


        function submitNoti()
        {
            console.log("Sent notification to " , {course} ," with the message : " , {message});
            setMessage('');
            

            var noti = {'CourseID': course, 'Message':message}
            axios.post('http://localhost:3001/notification', noti).then((response=>{
                console.log(response.status);
            }))

            //add to set message
            // useEffect(
            //     () => {
            //     axios.get('http://localhost:3001/notification',{params: 
            //     {'CourseID': course, 
            //    }}).then((response) => {
            //             console.log(response.data);
            //             //setGrade(response.data);
            //             //setMessage(response.data);
            //         })
            //     }, [course]
            // )
        }

        return (
            <>
                <div className="sendnoti-view">
                    <h1>Send Notification</h1>
                    <div>
                        <label>
                            Course : 
                            <DropdownCourse value={course} setValue={setCourse}></DropdownCourse>
                        </label>
                    </div>
                    <div>
                        <label>
                            Message : 
                        </label>
                    </div>
                    <div>
                        <textarea className="noti-box" value={message} onChange={notiHandler} ></textarea>
                    </div>
                    <button type="submit" onClick={submitNoti}>Submit</button>
                </div>
            
            </>
        )
    };