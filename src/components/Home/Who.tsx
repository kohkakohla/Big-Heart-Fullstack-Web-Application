import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import "./css/Who.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();
export default function Who() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ textAlign: "center", mt: 8, backgroundColor: "white" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "left", pl: 6, pt: 5 }}
          className="title"
        >
          Who Are We?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 5 }}>
              <img
                src="https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/425334971_875904798003489_3433165352781484323_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=acviiYrPucsAX-KJoM0&_nc_ht=scontent-xsp1-3.xx&oh=00_AfDRsedE493ywGQ6cam_clXihs1R1EvUutlXeKqNaxE4Ew&oe=65C8CA7C"
                alt="placeholder"
                style={{ maxWidth: "100%", height: "auto" }}
                className="content"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className="whomst">
            <Box sx={{ p: 10 }}>
              <Typography
                variant="body1"
                sx={{ textAlign: "left" }}
                className="whomst"
              >
                Singaporeans say that we are pah see boh zhao. It is with this
                never-say-die, can-do spirit that we continue to serve this
                country, and serve it with pride and humility. Singaporeans say
                that we are pah see boh zhao. It is with this never-say-die,
                can-do spirit that we continue to serve this country, and serve
                it with pride and humility.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className="whomst">
            <Box sx={{ p: 10 }}>
              <Typography
                variant="body1"
                sx={{ textAlign: "left" }}
                className="whomst"
              >
                Singaporeans say that we are pah see boh zhao. It is with this
                never-say-die, can-do spirit that we continue to serve this
                country, and serve it with pride and humility. Singaporeans say
                that we are pah see boh zhao. It is with this never-say-die,
                can-do spirit that we continue to serve this country, and serve
                it with pride and humility.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 5 }}>
              <img
                src="https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/425334971_875904798003489_3433165352781484323_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=acviiYrPucsAX-KJoM0&_nc_ht=scontent-xsp1-3.xx&oh=00_AfDRsedE493ywGQ6cam_clXihs1R1EvUutlXeKqNaxE4Ew&oe=65C8CA7C"
                alt="placeholder"
                style={{ maxWidth: "100%", height: "auto" }}
                className="content"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
