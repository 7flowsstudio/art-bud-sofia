"use client";
import React from "react";
import s from "./Hero.module.css";
import Block from "./Block/Block";

const Hero = () => {
  return (
    <div className={`container ${s.containerHero}`} id="hero">
      <div className={s.block}>
        <Block />
      </div>
      <div className={s.wrappTitle}>
        <h1 className={s.title}>
          NIEZAWODNE REMONTU OD PROFESJONALISTY W TWOIM MIEŚCIE
        </h1>
        <div className={s.wrappText}>
          <p>Wszystko od drobnych napraw po kompleksowe remonty domów</p>
          <button
            className={s.btn}
            onClick={() => {
              const el = document.getElementById("works");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Wyświetl usługi{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
