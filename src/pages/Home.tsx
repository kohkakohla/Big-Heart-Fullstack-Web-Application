import NavBar from "../components/Home/NavBar";
import HomeCarousel from "../components/Home/HomeCarousel";
import Hero from "../components/Home/Hero";
import Who from "../components/Home/Who";
import SignUpBottom from "../components/Home/SignUpBottom";
import "./Home.css";
export default function Home() {
  return (
    <div className="test">
      <NavBar></NavBar>
      <Hero></Hero>
      <HomeCarousel></HomeCarousel>
      <Who></Who>
      <SignUpBottom></SignUpBottom>
    </div>
  );
}
