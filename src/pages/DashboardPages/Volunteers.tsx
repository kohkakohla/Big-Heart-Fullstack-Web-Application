import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Home/NavBar";
import { Button, ThemeProvider, createTheme } from "@mui/material";
interface Volunteer {
  _id: string;
  firstName: string;
  lastName: string;
  hours: number;
  acceptanceStatus: string; // Assuming this property exists in the API response
  pastEnrolledServiceEvents: string[]; // Assuming this property exists in the API response
  // Add other properties if needed
}
function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState<{ [key: string]: Volunteer }>({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/volunteer/all");
        const data = await response.json();
        setVolunteers(data);
        const pastEvents = data.flatMap(
          (event: { pastEnrolledServiceEvents: any }) =>
            event.pastEnrolledServiceEvents
        );
        // console.log(pastEvents);
        fetchEvents(pastEvents);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchEvents(eventsData: any[]) {
      const eventDetails: { [key: string]: Volunteer | string } = {}; // Allow string as a fallback type
      try {
        const promises = eventsData.map(async (id) => {
          const response = await fetch(`http://localhost:3000/events/${id}`);
          try {
            const event = await response.json();
            eventDetails[id] = event; // Assign event to eventDetails[id]
          } catch (error) {
            console.log("Error parsing JSON:", error);
            eventDetails[id] = "invalid"; // Set event to "invalid" if JSON parsing fails
          }
        });
        await Promise.all(promises);
        console.log(eventDetails);
        setEvents(eventDetails);
        console.log("success");
      } catch (error) {
        console.error("Error fetching volunteer details:", error);
      }
    }

    fetchData();
  }, []);
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        GO BACK
      </Button>
      <Grid container spacing={2}>
        {volunteers.map((volunteer) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={volunteer._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${volunteer.firstName} ${volunteer.lastName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Hours: ${volunteer.hours}`}
                  </Typography>
                  <Typography>
                    {`Acceptance status: ${volunteer.acceptanceStatus}  `}
                  </Typography>
                  <Typography>Past enrolled events:</Typography>
                  <ul>
                    {volunteer.pastEnrolledServiceEvents.map(
                      (eventID: string, index: number) => (
                        <li key={index}>{events[eventID].title}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

export default Volunteers;
