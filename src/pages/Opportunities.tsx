import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardSample from "../components/Volunteer/CardLayout";
import NavBar from "../components/Home/NavBar";
import SearchBar from "../components/Volunteer/SearchBar";
import SearchResultsList from "../components/Volunteer/SearchResultsList";
import "@fontsource/roboto";
interface CardsProps {}

const Cards: React.FC<CardsProps> = () => {
  const [results, setResults] = useState<any[]>([]);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResultsList results={results} />}
      <div style={{ backgroundColor: "#ffe9e5" }}>
        <Container
          maxWidth="xl" // Set maximum width to extra-large (xl)
          sx={{ mt: 8, backgroundColor: "#ffe9e5", flexGrow: 1 }}
        >
          <Box sx={{ m: 2 }}>
            <CardSample />
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Cards;
