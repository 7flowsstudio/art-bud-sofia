import React from "react";
import s from "./MenuMob.module.css";
import mobList from "../../menu.json";
import Link from "next/link";

const MenuMob = () => {
	return (
		<ul className={s.mobMenuList}>
			{mobList.map((item) => (
				<li key={item.id} className={s.mobMenuItem}>
					<Link href={item.link}>{item.name}</Link>
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
