// react, vite, bootstrap 5.2.3
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import CardTest from "./pages/Opportunities";
import Details from "./pages/Details";
// import EventInfo from "./pages/EventInfo";
import History from "./pages/History";
import Profile from "./pages/Profile";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cards" element={<CardTest />} />
          <Route path="/details" element={<Details />} />
          {/* <Route path="/cards/more-info" element={<EventInfo />} /> */}
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
