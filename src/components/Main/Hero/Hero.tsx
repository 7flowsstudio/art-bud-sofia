import React from "react";
import s from "./Hero.module.css";
import Block from "./Block/Block";

const Hero = () => {
  return (
    <div className={s.container}>
      <Block />
      <h1>NIEZAWODNE REMONTU OD PROFESJONALISTY W TWOIM MIEŚCIE</h1>
    </div>
  );
};

export default Hero;
