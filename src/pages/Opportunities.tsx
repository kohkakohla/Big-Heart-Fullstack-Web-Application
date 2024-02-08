import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardSample from "../components/CardLayout";
import NavBar from "../components/NavBar";

function Card() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResultsList results={results} />}
      <Container sx={{ mt: 8 }}>
        <Box sx={{ m: 2 }}>
          <CardSample />
        </Box>
      </Container>
    </>
  );
}

export default Cards;
