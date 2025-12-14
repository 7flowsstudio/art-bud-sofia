"use client";
import React from "react";
import s from "./OptionSide.module.css";
import { AdminSection } from "../MenuSide/MenuSide";

type OptionSideProps = {
  active: AdminSection;
};

// const OptionSide = () => {
//   return <div className={s.optionSideWrapper}>OptionSide</div>;
// };

const OptionSide = ({ active }: OptionSideProps) => {
  if (active === "gallery")
    return <div className={s.optionSideWrapper}>Gallery</div>;
  if (active === "reviews")
    return <div className={s.optionSideWrapper}>Reviews</div>;
  if (active === "services")
    return <div className={s.optionSideWrapper}>Services</div>;
  return null;
};

export default OptionSide;
