import { Carousel } from "react-bootstrap";

function Carou() {
  return (
    <div
      style={{
        backgroundImage: `url('https://example.com/background-image.jpg')`, // Replace 'https://example.com/background-image.jpg' with the URL of your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "1000px", // Set a minimum height to ensure the background image covers the entire carousel area
      }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            style={{
              height: "1000px",
            }}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1579168765467-3b235f938439?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Slide</h3>
            <p>This is the caption for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{
              height: "1000px",
            }}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1615796153287-98eacf0abb13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Slide</h3>
            <p>This is the caption for the second slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default Carou;
