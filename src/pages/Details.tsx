import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "../components/Home/NavBar";
import { useLocation } from "react-router-dom";

const Details = () => {
  // Dummy data for the event details, replace it with your actual data
  const location = useLocation();
  console.log(location.state.data);
  const eventDetails = {
    title: location.state.data.title,
    tags: ["Tag1", "Tag2"],
    image: (
      <img src={location.state.data.image} alt={location.state.data.title} />
    ),
    description: location.state.data.body,
  };

  // Dummy data for attendees, replace it with your actual data
  const attendees = location.state.data.current_volunteers;

  const handleVolunteerNow = () => {
    // Implement your logic for volunteering action here
    console.log("Volunteer Now button clicked");
  };

  return (
    <div>
      <NavBar></NavBar>
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <Typography variant="h4" component="h1">
            {eventDetails.title}
          </Typography>
          <Typography variant="body1" component="div">
            {eventDetails.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </Typography>
          <img
            src={eventDetails.image}
            alt={eventDetails.title}
            style={{
              width: "500px",
            }}
          />
          <Typography variant="body1" component="p">
            {eventDetails.description}
          </Typography>
        </div>

        <div style={{ float: "right", marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVolunteerNow}
          >
            Volunteer Now
          </Button>
          <Typography variant="h6" component="h2">
            Attendees:
          </Typography>
          <ul>
            {attendees.map((attendee, index) => (
              <li key={index}>{attendee}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Details;
