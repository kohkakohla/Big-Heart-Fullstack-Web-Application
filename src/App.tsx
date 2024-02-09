// react, vite, bootstrap 5.2.3
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import CardTest from "./pages/Opportunities";
import Details from "./pages/Details";
// import EventInfo from "./pages/EventInfo";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CardList from "./components/Volunteer/CardList";
import Test from "./components/Volunteer/test";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cards" element={<CardTest />} />
            <Route path="/details" element={<Details />} />
            {/* <Route path="/cards/more-info" element={<EventInfo />} /> */}
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="cardlist" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
