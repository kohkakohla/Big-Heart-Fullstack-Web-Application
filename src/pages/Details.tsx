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
  function uint8ToBase64(u8Arr) {
    const CHUNK_SIZE = 0x8000; // arbitrary number
    let index = 0;
    let length = u8Arr.length;
    let result = "";
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  }
  const u8Arr = new Uint8Array(location.state.data.image.data.data);
  const base64 = uint8ToBase64(u8Arr);
  console.log(base64);
  const eventDetails = {
    title: location.state.data.title,
    tags: ["Tag1", "Tag2"],
    image: (
      <img
        src={`data:image/jpeg;base64,${base64}`}
        alt={location.state.data.title}
      />
    ),
    description: location.state.data.body,
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
