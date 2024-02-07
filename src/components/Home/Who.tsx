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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            viverra, ipsum non malesuada convallis, ante lorem eleifend nisi,
            quis luctus dui est in nulla. Duis vel suscipit dolor, a malesuada
            odio. Vivamus nec mi non libero volutpat semper a nec libero. Nullam
            id ante nec eros tincidunt fermentum.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ textAlign: "right" }}>
            Sed ultricies fermentum ultrices. Sed vel nisi vehicula, posuere
            nulla vel, aliquet eros. Vestibulum dapibus tincidunt elit ut
            varius. Nulla venenatis tortor eget massa posuere, et tempus metus
            semper. Integer sollicitudin, urna eu dignissim scelerisque, ex
            lorem tempus velit, ut hendrerit ante orci vel libero.
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
