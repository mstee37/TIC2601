import DropdownCourse from "../components/DropdownCourse";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

    export default function SendNoti(){

        const [course, setCourse] = useState('');
        const [message, setMessage] = useState('');
        const [submitStatus, setSubmitStatus] = useState('');


        const notiHandler = (e) => {
            setMessage(e.target.value);
            setSubmitStatus('');
        }

        function submitNoti()
        {
            console.log("Sent notification to " , {course} ," with the message : " , {message});
            setMessage('');
            

            var noti = {'CourseID': course, 'Message':message}
            axios.post('http://localhost:3001/notification', noti).then((response=>{
                console.log(response.status);
                setSubmitStatus('A new notification has been successfully submitted!');
            }))
            .catch((error)=>{
                if(error.response){
                    alert("An error has occurred and failed to create notification!");
                }
                else{
                    console.log('Error', error.message);
                }
            })

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
                    <div>
                        {submitStatus}
                    </div>
                    <button type="submit" onClick={submitNoti}>Submit</button>
                </div>
            
            </>
        )
    };