import React from "react";

import "./about.css";

import Timeline from "./Timeline/Timeline";
import Intro from "./Intro/Intro";
import Clergy from "./Clergy/Clergy";

const About = () => {
  return (
    <>
      <Intro />
      <Clergy />
      <Timeline />
    </>
  );
};

export default About;
