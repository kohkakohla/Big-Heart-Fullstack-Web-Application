// VolunteeringEvents.tsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface Props {
  events: Event[];
}

const VolunteeringEvents: React.FC<Props> = ({ events }) => {
  return (
    <div>
      <h2>Volunteering Events</h2>
      {events.map((event) => (
        <Card key={event.id} sx={{ maxWidth: 345, marginBottom: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={event.imageUrl}
            alt={event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VolunteeringEvents;
