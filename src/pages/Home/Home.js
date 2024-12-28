import React from "react";

import Hero from "./Hero/Hero";
import ColSection from "../../components/ColSection/ColSection";
import Welcome from "./Welcome/Welcome";
import Mission from "./Mission/Mission";

import { colSectionVars } from "./ColSectionVars";

const Home = () => {
  return (
    <>
      <Hero />

      <Welcome />

      <img
        src="https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1zZv2ycw36laHYoHQAz3A9lL6W4CUeGFI"
        style={{ width: 2000, paddingTop: 7 }}
      />
      <ColSection colSectionVars={colSectionVars} />
      <Mission />

      <img
        src="https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1zZv2ycw36laHYoHQAz3A9lL6W4CUeGFI"
        style={{ width: 2000, paddingTop: 7 }}
      />
    </>
  );
};

export default Home;
