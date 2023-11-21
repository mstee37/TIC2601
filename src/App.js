import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="Index" element={<Index />} />
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
          <Route path="*" element={<Error />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
