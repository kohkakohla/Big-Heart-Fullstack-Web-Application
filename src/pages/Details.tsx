import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "../components/Home/NavBar";
const Details = () => {
  // Dummy data for the event details, replace it with your actual data
  const eventDetails = {
    title: "Event Title",
    tags: ["Tag1", "Tag2"],
    image:
      "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/329209784_502472575373034_7479342537708593092_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=cGkBYjeBeywAX-F_fNx&_nc_ht=scontent-xsp1-1.xx&oh=00_AfCgxUlCVwhIapBFmooz2sJTf4M0hmj29gxZuueVoEFFBA&oe=65C90332",
    description: "Description of the event goes here.",
    partner: "Partnering Company Name",
  };

  // Dummy data for attendees, replace it with your actual data
  const attendees = ["Attendee1", "Attendee2", "Attendee3"];

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
      <Typography variant="body1" component="p">
        Partnering Company: {eventDetails.partner}
      </Typography>
    </div>
  );
};

export default Details;
