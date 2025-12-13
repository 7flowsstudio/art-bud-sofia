import React from "react";
import s from "./MenuSide.module.css";
import LogoAdmin from "./LogoAdmin/LogoAdmin";

const MenuSide = () => {
	const menuList = [
		{ id: 0, icon: "/sprite.svg#icon-admin-book", name: "Галерея" },
		{ id: 1, icon: "/sprite.svg#icon-reviews", name: "Відгуки" },
		{ id: 2, icon: "/sprite.svg#icon-services", name: "Послуги" },
	];

	const menuExit = [
		{ id: 0, icon: "/sprite.svg#icon-arrow-exit", name: "На сайт" },
		{ id: 1, icon: "/sprite.svg#icon-admin-exit", name: "Вихід" },
	];
	return (
		<div className={s.menuSideWrapper}>
			<div className={s.menuTop}>
				<LogoAdmin />
				<ul className={s.menuList}>
					{menuList.map((item) => (
						<li key={item.id} className={s.menuItem}>
							<div className={s.menuIconBlock}>
								<svg className={s.iconMenu}>
									<use href={item.icon}></use>
								</svg>
							</div>
							{item.name}
						</li>
					))}
				</ul>
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
