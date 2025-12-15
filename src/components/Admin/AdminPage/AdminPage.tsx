"use client";
import React, { useState } from "react";
import s from "./AdminPage.module.css";
import MenuSide from "./MenuSide/MenuSide";
import OptionSide from "./OptionSide/OptionSide";

export type AdminSection = "gallery" | "reviews" | "services";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("gallery");
  return (
    <div className={s.adminWraper}>
      <MenuSide onSelect={setActiveSection} active={activeSection} />
      <OptionSide active={activeSection} />
    </div>
  );
};

export default AdminPage;
