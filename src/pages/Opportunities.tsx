import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardSample from "../components/CardLayout";
import NavBar from "../components/Home/NavBar";

function Card() {
  return (
    <>
      <CssBaseline />
      <NavBar></NavBar>
      <Container sx={{ mt: 8 }}>
        <Box sx={{ m: 2 }}>
          <CardSample />
        </Box>
      </Container>
    </>
  );
}

export default Card;
