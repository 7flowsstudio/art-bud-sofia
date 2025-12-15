import React from "react";
import s from "./MenuSide.module.css";
import LogoAdmin from "./LogoAdmin/LogoAdmin";

export type AdminSection = "gallery" | "reviews" | "services";

type MenuSideProps = {
  onSelect: (section: AdminSection) => void;
  active: AdminSection;
};

const MenuSide = ({ onSelect, active }: MenuSideProps) => {
  const menuList = [
    {
      id: 0,
      icon: "/sprite.svg#icon-admin-book",
      name: "Галерея",
      section: "gallery" as const,
    },
    {
      id: 1,
      icon: "/sprite.svg#icon-reviews",
      name: "Відгуки",
      section: "reviews" as const,
    },
    {
      id: 2,
      icon: "/sprite.svg#icon-services",
      name: "Послуги",
      section: "services" as const,
    },
  ];

  const menuExit = [
    { id: 0, icon: "/sprite.svg#icon-arrow-exit", name: "На сайт" },
    { id: 1, icon: "/sprite.svg#icon-admin-exit", name: "Вихід" },
  ];
  return (
    <div className={s.menuSideWrapper}>
      <div className={s.menuTop}>
        <LogoAdmin />
        <div className={s.menuList}>
          {menuList.map((item) => (
            <button
              key={item.id}
              className={`${s.menuItem} ${
                active === item.section ? s.active : ""
              }`}
              onClick={() => onSelect(item.section)}
            >
              <div className={s.menuIconBlock}>
                <svg className={s.iconMenu}>
                  <use href={item.icon}></use>
                </svg>
              </div>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <ul className={s.menuList}>
        {menuExit.map((item) => (
          <li key={item.id} className={s.menuItem}>
            <div className={s.menuIconBlock}>
              <svg className={`${s.iconMenu} ${item.id === 1 && s.icon}`}>
                <use href={item.icon}></use>
              </svg>
            </div>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSide;
