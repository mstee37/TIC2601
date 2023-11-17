import DropdownCourse from "../components/DropdownCourse";
import { useState } from "react";

    export default function SendNoti(){

        const [course, setCourse] = useState('Business Analytics');
        const [message, setMessage] = useState('');


        const notiHandler = (e) => {
            setMessage(e.target.value);
        }

        function submitNoti()
        {
            console.log("Sent notification to " , {course} ," with the message : " , {message});
            setMessage('');
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