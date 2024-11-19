import React from "react";

import "./about.css";

import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Intro from "./Intro/Intro";
import Clergy from "./Clergy/Clergy";

const About = () => {
  return (
    <>
      <Intro />
      <Clergy />
      <WhoWeAre />
    </>
  );
};

export default About;
