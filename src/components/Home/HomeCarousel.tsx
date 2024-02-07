import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./css/Home.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function HomeCarousel() {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
    >
      {sliderImageUrl.map((imageUrl, index) => {
        return (
          <div className="slider" key={index}>
            <img
              src={imageUrl.url}
              alt="movie"
              style={{ border: "10px solid white" }}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
export default HomeCarousel;

const sliderImageUrl = [
  //First image url
  {
    url: "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/329209784_502472575373034_7479342537708593092_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=cGkBYjeBeywAX-F_fNx&_nc_ht=scontent-xsp1-1.xx&oh=00_AfCgxUlCVwhIapBFmooz2sJTf4M0hmj29gxZuueVoEFFBA&oe=65C90332",
  },
  {
    url: "https://scontent-xsp2-1.xx.fbcdn.net/v/t39.30808-6/359829576_750705410523429_3867183261410623602_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=IRmrFGuWRbUAX_zB3AG&_nc_ht=scontent-xsp2-1.xx&oh=00_AfAekgUNoW-vMWtx2XVwvdNmhk4Czjj71qIk3mcQfSYhrA&oe=65C8C9B0",
  },
  //Second image url
  {
    url: "https://scontent-xsp2-1.xx.fbcdn.net/v/t39.30808-6/370559402_779603404300296_7671669952507522842_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_ohc=hiSisvGfOhUAX8e-YsH&_nc_ht=scontent-xsp2-1.xx&oh=00_AfCs08KPSJ6BqLMItvNGc5Axb8ddhZjhOcyCiMRbkq1ogA&oe=65C9405E",
  },
  //Third image url
  {
    url: "https://scontent-xsp2-1.xx.fbcdn.net/v/t39.30808-6/371470222_779603504300286_954078191630803932_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=m_cXOIjTLv0AX_qgmuT&_nc_ht=scontent-xsp2-1.xx&oh=00_AfDsj3vCJcM0VNUe74ynVsYj18YmXsomNsYEPRF9lYJdzw&oe=65C7FF2A",
  },

  //Fourth image url

  {
    url: "https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/370363661_779603734300263_7624517103580419263_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=OgnkWyq6z2IAX_jNyDi&_nc_ht=scontent-xsp1-3.xx&oh=00_AfBJFCwjbCeoF1iACP-LxS1tlFEFtaTndv5T5s35HbxOYA&oe=65C862F3",
  },
];
