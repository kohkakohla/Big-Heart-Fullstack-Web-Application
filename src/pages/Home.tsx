import NavBar from "../components/NavBar";
import HomeCarousel from "../components/HomeCarousel";
import Hero from "../components/Hero";
import "./Home.css";
export default function Home() {
  return (
    <div className="test">
      <NavBar></NavBar>
      <Hero></Hero>
      <HomeCarousel></HomeCarousel>
    </div>
  );
}
