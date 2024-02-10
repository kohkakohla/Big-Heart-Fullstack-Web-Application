import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider, createTheme } from "@mui/material";

interface Volunteer {
  _id: string;
  firstName: string;
  lastName: string;
  // Add other properties if needed
}

function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<{ [key: string]: Volunteer }>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "http://localhost:3000/events/fetchNoImage"
        );
        const data = await response.json();
        setEvents(data);
        fetchVolunteers(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    async function fetchVolunteers(eventsData: any[]) {
      const volunteerIds = eventsData.flatMap(
        (event) => event.current_volunteers
      );
      const volunteerDetails: { [key: string]: Volunteer } = {};
      try {
        const promises = volunteerIds.map(async (id) => {
          const response = await fetch(
            `http://localhost:3000/volunteer/searchById/${id}`
          );
          const volunteer = await response.json();
          volunteerDetails[id] = volunteer;
        });
        await Promise.all(promises);
        setVolunteers(volunteerDetails);
      } catch (error) {
        console.error("Error fetching volunteer details:", error);
      }
    }

    fetchEvents();
  }, []);

  const defaultTheme = createTheme();
  //   console.log(volunteers);
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
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capacity: {event.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Volunteers: {event.current_volunteers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.current_volunteers.length > 0 && (
                    <ul>
                      {event.current_volunteers.map(
                        (volunteerId: string, index: number) => (
                          <li key={index}>
                            {volunteers[volunteerId]?.firstName}{" "}
                            {volunteers[volunteerId]?.lastName}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default Events;
