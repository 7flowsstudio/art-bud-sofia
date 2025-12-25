"use client";
import React, { MouseEventHandler } from "react";
import s from "./NavigationMobMenu.module.css";
import LogoMob from "./LogoMob/LogoMob";
import MenuMob from "./MenuMob/MenuMob";
import ContactsGroup from "./ContactsGroup/ContactsGroup";

type NavigationMobProp = {
	hundlerMobMenu: MouseEventHandler;
};

const NavigationMobMenu: React.FC<NavigationMobProp> = ({ hundlerMobMenu }) => {
	return (
		<div className={s.mobWrapper}>
			<div className={s.mobTopBlock}>
				<div className={s.mobHeader}>
					<div className={s.closeIcon} onClick={hundlerMobMenu}>
						Close
					</div>
				</div>
				<MenuMob hundlerMobMenu={hundlerMobMenu} />
				<ContactsGroup />
			</div>

			<LogoMob />
		</div>
	);
};

export default NavigationMobMenu;
