import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
export default function Who() {
  return (
    <Box sx={{ textAlign: "center", mt: 8, backgroundColor: "white" }}>
      <Typography variant="h4" gutterBottom>
        Who Are We
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src="https://via.placeholder.com/300"
            alt="placeholder"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            Singaporeans say that we are pah see boh zhao. It is with this
            never-say-die, can-do spirit that we continue to serve this country,
            and serve it with pride and humility.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ textAlign: "right" }}>
            Singaporeans say that we are pah see boh zhao. It is with this
            never-say-die, can-do spirit that we continue to serve this country,
            and serve it with pride and humility.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src="https://via.placeholder.com/300"
            alt="placeholder"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
