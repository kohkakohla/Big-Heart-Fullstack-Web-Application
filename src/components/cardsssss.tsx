import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="src/assets/msg1459169736-125460.jpg"
        title="korean exhibit a"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Annie
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Holy shit! I fucking hate Koreans like you know what I mean? Those
          kimchi munchers are just so not it with their tteokbokki and whatever
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
