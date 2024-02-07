import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();
export default function Hero() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "pink",
            pt: 12,
            pb: 6,
            // backgroundImage: `url('https://scontent-xsp1-2.xx.fbcdn.net/v/t39.30808-6/424674074_874795108114458_7870620535896436307_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=783fdb&_nc_ohc=xGHYaq5CJUEAX8F7dwv&_nc_ht=scontent-xsp1-2.xx&oh=00_AfD0AoGrIdxpTkAWQ2g3FLDwCN0cY9B_24MFlPngTMV6dA&oe=65C7E6B1')`, // Replace 'https://example.com/background-image.jpg' with the URL of your background image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
