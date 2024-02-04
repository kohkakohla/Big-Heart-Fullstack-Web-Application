import NavBar from "../components/NavBar";
import HomeCarousel from "../components/HomeCarousel";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <NavBar></NavBar>
      <Hero></Hero>
      <HomeCarousel></HomeCarousel>
    </div>
  );
}
