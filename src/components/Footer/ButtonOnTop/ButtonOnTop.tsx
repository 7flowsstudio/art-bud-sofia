"use client";
import React from "react";
import s from "./ButtonOnTop.module.css";

const ButtonOnTop = () => {
  return (
    <button
      type="button"
      className={s.btnOnTop}
      onClick={() => {
        const el = document.getElementById("header");
        el?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <svg className={s.btnTopIcon}>
        <use href="/sprite.svg#icon-btn-on-top"></use>
      </svg>
    </button>
  );
};

export default ButtonOnTop;
