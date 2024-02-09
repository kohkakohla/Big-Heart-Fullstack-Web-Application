import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBar from "../components/Home/NavBar";
import { useLocation } from "react-router-dom";
import { Container, Grid, ThemeProvider, createTheme } from "@mui/material";
import "./css/Details.css";

const Details = () => {
  // Dummy data for the event details, replace it with your actual data
  const location = useLocation();
  console.log(location);
  const eventDetails = {
    title: location.state.data.title,
    tags: ["Tag1", "Tag2"],
    image:
      "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/329209784_502472575373034_7479342537708593092_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=cGkBYjeBeywAX-F_fNx&_nc_ht=scontent-xsp1-1.xx&oh=00_AfCgxUlCVwhIapBFmooz2sJTf4M0hmj29gxZuueVoEFFBA&oe=65C90332",
    description: location.state.data.body,
    partner: "Partnering Company Name",
  };

  // Dummy data for attendees, replace it with your actual data
  const attendees = location.state.data.current_volunteers;

  const handleVolunteerNow = () => {
    // Implement your logic for volunteering action here
    console.log("Volunteer Now button clicked");
  };
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
      <Container className="main-wrapper">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Container
              className="details-container"
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "2rem",
              }}
            >
              <div>
                <Typography
                  variant="h4"
                  component="h1"
                  className="details-title"
                >
                  {eventDetails.title}
                </Typography>
                <Typography variant="body1" component="div">
                  {eventDetails.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </Typography>
                <img
                  src={eventDetails.image}
                  alt={eventDetails.title}
                  style={{
                    width: "60%",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  className="event-description"
                >
                  {eventDetails.description}
                </Typography>
              </div>
              <hr />
              <Typography
                variant="body1"
                component="p"
                className="partner-description"
              >
                Partnering Company: {eventDetails.partner}
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={2} className="button-and-attendees-wrapper">
            <Container>
              <div style={{ float: "right", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVolunteerNow}
                  sx={{
                    backgroundColor: "#B1C9FF",
                    textTransform: "none",
                    fontWeight: "bolder",
                    pl: "3rem",
                    pr: "3rem",
                    pt: "1rem",
                    pb: "1rem",
                    borderRadius: "30px",
                    width: "100%",
                  }}
                >
                  volunteer now!
                </Button>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: "bolder",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  see who's going
                </Typography>
                <ul>
                  {attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))}
                </ul>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Details;
