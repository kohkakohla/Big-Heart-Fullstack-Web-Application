import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./css/Hero.css";
import "@fontsource/roboto";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();
export default function Hero() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          className="hero"
          sx={{
            pt: 30,
            pb: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            textAlign: "center", // Center text
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              top: "-10rem", // Adjust the top position as needed to move the container up
            }}
          >
            <Typography
              sx={{
                fontWeight: "900",
                color: "black !important",
                position: "relative",
                fontSize: "xx-large",
                fontFamily: "Roboto",
              }}
            >
              Volunteer With Us
              <img src="src/assets/redman.png" className="redman"></img>
            </Typography>
            <Typography
              sx={{
                color: "black !important",
                fontWeight: "600",
                position: "relative",
                fontSize: "x-large",
                width: "40rem",
                alignSelf: "center",
                fontFamily: "Roboto",
              }}
            >
              Volunteering is an incredible way to give back to your community.
              At Big at Heart, we believe in making it easy for you to find
              meaningful volunteer opportunities while also connecting with new
              people. Join us in making a difference and building connections
              that last a lifetime.
            </Typography>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
