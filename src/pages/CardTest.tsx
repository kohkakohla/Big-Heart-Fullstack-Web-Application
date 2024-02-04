import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardSample from "../components/cardycards";
import NavBar from "../components/NavBar";

function Card() {
  return (
    <>
      <CssBaseline />

      <Container>
        <NavBar></NavBar>
        <Box sx={{ m: 2 }}>
          <CardSample />
        </Box>
      </Container>
    </>
  );
}

export default Card;
