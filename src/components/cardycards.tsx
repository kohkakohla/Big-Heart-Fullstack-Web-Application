import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MediaCard from "./cardsssss";

function CardSample() {
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 8,
    textAlign: "center",
    color: "black",
  }));

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>

        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>

        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>

        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>

        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>

        <Grid item xs={6}>
          <MediaCard></MediaCard>
        </Grid>
      </Grid>
    </>
  );
}

export default CardSample;
