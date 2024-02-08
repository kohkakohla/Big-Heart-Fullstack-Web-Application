import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MediaCard from "./CardContent";
import "./css/CardLayout.css";
function CardSample() {
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 8,
    textAlign: "center",
    color: "black",
  }));

  return (
    <>
      <div style={{ paddingLeft: "3rem" }}>
        <Grid
          container
          spacing={1}
          columnSpacing={8}
          rowSpacing={8}
          className="main-content-grid"
        >
          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MediaCard></MediaCard>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CardSample;
