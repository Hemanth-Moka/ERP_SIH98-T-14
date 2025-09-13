// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import Viewall from "./Auth/Admin/Viewall";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Results from "./Pages/Exam/Results";
import HallTicket from "./Pages/Exam/HallTicket";
import Roomallocation from "./Pages/Hostel/Roomallocation";
import RoomStatus from "./Pages/Hostel/RoomStatus";
import Fee from "./Pages/Fee";
import Admissions from "./Pages/Admissions";
import Feedback from "./Pages/Feedback";

// Fee Subpages
import Hostelfee from "./Pages/Fee/Hostelfee";
import SemFee from "./Pages/Fee/SemFee";
import ExamFee from "./Pages/Fee/ExamFee";
import Fine from "./Pages/Fee/Fine";
import Condonation from "./Pages/Fee/Condonation";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes (inside Dashboard layout with Sidebar) */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Profile />} /> {/* Default page */}
          <Route path="viewall" element={<Viewall />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="fee/hostel" element={<Hostelfee />} />
          <Route path="fee/semester" element={<SemFee />} />
          <Route path="fee/exam" element={<ExamFee />} />
          <Route path="fee/fine" element={<Fine />} />
          <Route path="fee/condonation" element={<Condonation />} />
          <Route path="results" element={<Results />} />
          <Route path="hallticket" element={<HallTicket />} />
          <Route path="roomallocation" element={<Roomallocation />} />
          <Route path="roomstatus" element={<RoomStatus />} />
          <Route path="fee" element={<Fee />} />
          <Route path="admissions" element={<Admissions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
