"use client";
import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import Logo from "./Logo/Logo";
import Link from "next/link";
import BurgerButton from "./BurgerButton/BurgerButton";
import menuList from "./menu.json";
import NavigationMobMenu from "./NavigationMobMenu/NavigationMobMenu";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  console.log("Open", openMobMenu);
  const hundlerMobMenu = () => {
    setOpenMobMenu((prev) => !prev);
  };

  useEffect(() => {
    if (openMobMenu) {
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [openMobMenu]);

  return (
    <>
      {" "}
      <div className={s.headerSections} id="header">
        <div className={`container ${s.headerContainer}`}>
          <nav className={s.navigation}>
            <Logo />
            <ul className={s.navMenuList}>
              {menuList.map((item) => (
                <li key={item.id} className={s.navMenuItem}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <BurgerButton hundlerMobMenu={hundlerMobMenu} />
          </nav>
        </div>
      </div>
      <div className={`${s.menuHead} ${openMobMenu ? s.open : ""}`}>
        <NavigationMobMenu
          hundlerMobMenu={hundlerMobMenu}
          openMobMenu={openMobMenu}
        />
      </div>
    </>
  );
};

export default Header;
