import { Container, Typography, Button } from "@mui/material";

const SignUpBottom = () => {
  return (
    <Container
      sx={{ textAlign: "center", mt: 4, backgroundColor: "#FBE3E0", py: 4 }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 2, fontWeight: "bold", fontSize: "3rem" }}
      >
        want to volunteer?
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "2rem", mb: 2, p: 2 }}>
        Singaporeans say that we are pah see boh zhao. It is with this
        never-say-die, can-do spirit that we continue to serve this country, and
        serve it with pride and humility.
      </Typography>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#FF0000",
          color: "#FFFFFF",
          borderRadius: "50px",
          padding: "15px 30px", // Adjust padding for larger button size
          fontSize: "1.5rem", // Adjust font size to match button size
          fontWeight: "bolder",
          textTransform: "none",
        }}
        href="/signup"
      >
        sign up
      </Button>
    </Container>
  );
};

export default SignUpBottom;
