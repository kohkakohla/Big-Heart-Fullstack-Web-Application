import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CardList() {
  const [listItems, setListItems] = useState([]);
  const navigate = useNavigate();

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

  const handleLearnMore = (item) => {
    navigate("/details", { state: { data: item } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/events/getAll");
        const data = await response.json();
        console.log(data);
        const listItems = data.map((item) => {
          const u8Arr = new Uint8Array(item.image.data.data);
          const base64 = uint8ToBase64(u8Arr);
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
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
                  <Button size="small" onClick={() => handleLearnMore(item)}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        });
        setListItems(listItems);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {listItems}
    </Grid>
  );
}

export default CardList;
