import React from "react";
import ExploreProjects from "../components/ExploreProjects";
import JoinUs from "../components/JoinUs";
import Slider from "../components/SliderPage";
import Fotter from "../components/Fotter";
import Hero from "../components/Hero";
function Home() {
  return (
    <div className="w-full min-h-dvh">
      <Hero />
      <JoinUs />
      <Slider />
      <ExploreProjects />
      <Fotter />
    </div>
  );
}

export default Home;
