import React, { MouseEventHandler } from "react";
import s from "./MenuMob.module.css";
import mobList from "../../menu.json";
import { LocalizedScrollButton } from "@/utils/LocalizedScrollButton/LocalizedScrollButton";

type MobMenuProp = {
	hundlerMobMenu: MouseEventHandler;
};

const MenuMob = ({ hundlerMobMenu }: MobMenuProp) => {
	return (
		<ul className={s.mobMenuList}>
			{mobList.map((item) => (
				<li key={item.id} className={s.mobMenuItem} onClick={hundlerMobMenu}>
					<LocalizedScrollButton scrollId={item.link} className={s.mobMenuItem}>
						{item.name}
					</LocalizedScrollButton>
				</li>
			))}
		</ul>
	);
};

export default MenuMob;

{
	/* <a
	href="#prices"
	onClick={(e) => {
		e.preventDefault();
		document.querySelector("#prices")?.scrollIntoView({
			behavior: "smooth",
		});
	}}
>
	Cennik usług
</a>; */
}
