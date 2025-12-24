"use client";
import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import Logo from "./Logo/Logo";
import BurgerButton from "./BurgerButton/BurgerButton";
import menuList from "./menu.json";
import NavigationMobMenu from "./NavigationMobMenu/NavigationMobMenu";
import { LocalizedScrollButton } from "@/utils/LocalizedScrollButton/LocalizedScrollButton";

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
									<LocalizedScrollButton
										scrollId={item.link}
										className={s.navMenuItem}
									>
										{item.name}
									</LocalizedScrollButton>
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
