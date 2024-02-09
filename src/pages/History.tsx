import NavBar from "../components/Home/NavBar";
import HistoryCard from "../components/History/HistoryCard";
import { Container } from "@mui/material";
function History() {
  return (
    <>
      <NavBar />
      <Container
        sx={{
          backgroundColor: "#FBE3E0",
          width: "100vw",
          height: "100vh",
        }}
      >
        <HistoryCard></HistoryCard>
      </Container>
    </>
  );
}

export default History;
