"use client";
import React, { MouseEventHandler } from "react";
import s from "./NavigationMobMenu.module.css";
import LogoMob from "./LogoMob/LogoMob";
import MenuMob from "./MenuMob/MenuMob";
import ContactsGroup from "./ContactsGroup/ContactsGroup";

type NavigationMobProp = {
	hundlerMobMenu: MouseEventHandler;
	openMobMenu: boolean;
};

const NavigationMobMenu: React.FC<NavigationMobProp> = ({
	hundlerMobMenu,
	openMobMenu,
}) => {
	return (
		<div className={s.mobWrapper}>
			<div className={s.mobTopBlock}>
				<div className={s.mobHeader}>
					<div className={s.closeIcon} onClick={hundlerMobMenu}>
						Close
					</div>
				</div>
				<MenuMob />
				<ContactsGroup />
			</div>

			<LogoMob />
		</div>
	);
};

export default NavigationMobMenu;
