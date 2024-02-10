import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Home/NavBar";
import { Button, ThemeProvider, createTheme } from "@mui/material";
function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/volunteer/all");
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Error:", error);
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
        {volunteers.map((volunteer) => (
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
                {volunteer.pastEnrolledServiceEvents.map((event) => {
                  return <Typography>${event}</Typography>;
                })}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default Volunteers;
