import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface CardListProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

function CardList() {
  let data;
  let listItem;

  function uint8ToBase64(u8Arr) {
    const CHUNK_SIZE = 0x8000; // arbitrary number
    let index = 0;
    let length = u8Arr.length;
    let result = "";
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  }

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/events/getAll");
      data = await response.json();
      console.log(data);
      listItem = data.map((item) => {
        const u8Arr = new Uint8Array(item.image.data.data);
        const base64 = uint8ToBase64(u8Arr);
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={`data:image/jpeg;base64,${base64}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.snippet}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  fetchData();

  return <div>{listItem}</div>;
}

export default CardList;
