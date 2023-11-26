import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react"
import { UserContext } from "./contexts/UserContext";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Error from "./pages/Error";
import LoginPageStudent from "./pages/LoginPageStudent";
import LoginPageProf from "./pages/LoginPageProf";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import MainPageStudent from "./pages/MainPageStudent";
import MainPageProf from "./pages/MainPageProf";
import MainPageAdmin from "./pages/MainPageAdmin";
import SendNoti from "./pages/SendNoti";
import ScheduleClass from "./pages/ScheduleClass";
import RegisterCourse from "./pages/RegisterCourse";
import SendFeedback from "./pages/Feedback";
import MarkAttendance from "./pages/MarkAttendance";
import CourseCreation from "./pages/CourseCreation";
import Transcript from "./pages/Transcript";
import LoginPage from "./pages/LoginPage";
import Login from "./pages/Login";
import Grading from "./pages/Grading";
import Enrollment from "./pages/Enrollment";

function App() {
  //<Route path="Index" element={<Index />} />
  const [user, setUser] = useState('');

  return (

    <UserContext.Provider value={{user, setUser}}>
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Layout />}>
          <Route index element={<Login/>} />
          <Route path="Index" element={<Index />} />
          <Route path="Login" element={<Login />} />
          <Route path="LoginPageStudent" element={<LoginPageStudent />} />
          <Route path="LoginPageProf" element={<LoginPageProf />} />
          <Route path="LoginPageAdmin" element={<LoginPageAdmin />} />
          <Route path="MainPageStudent" element={<MainPageStudent />} />
          <Route path="MainPageProf" element={<MainPageProf />} />
          <Route path="MainPageAdmin" element={<MainPageAdmin />} />
          <Route path="SendNoti" element={<SendNoti/>}/>
          <Route path="RegisterCourse" element={<RegisterCourse/>}/>
          <Route path="ScheduleClass" element={<ScheduleClass/>}/>
          <Route path="Feedback" element={<SendFeedback/>}/>
          <Route path="MarkAttendance" element={<MarkAttendance/>}/>
          <Route path="CourseCreation" element={<CourseCreation/>}/>
          <Route path="Transcript" element={<Transcript/>}/>
          <Route path="Grading" element={<Grading />} />
          <Route path="Enrollment" element={<Enrollment />} />
          <Route path="*" element={<Error />} />

        </Route>
        

      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
