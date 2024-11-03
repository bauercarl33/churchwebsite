import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useTransform, useScroll } from "framer-motion";

import "./about.css";

import { sections } from "./AboutVars";

const About = () => {
  return (
    <>
      <div className="heading">
        <img
          className="bg"
          src={`${process.env.PUBLIC_URL}https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1CaD4tWqWQYvnOpsJLnXmyoEgjNa6NJhn`}
          alt="bg"
        />
        <div className="overlay" />
      </div>
      <div className="about">
        {Object.entries(sections).map((item, index) => {
          return (
            <section key={item[1].heading}>
              <h5>{item[1].heading}</h5>
              {Object.entries(item[1].paragraphs).map((para, index) => {
                return <p key={index}>{para[1]}</p>;
              })}
            </section>
          );
        })}
      </div>
    </>
  );
};

export default About;
