import React from "react";
import s from "./BurgerButton.module.css";

type HundlerMobMunuProps = {
	hundlerMobMenu: () => void;
};

const BurgerButton = ({ hundlerMobMenu }: HundlerMobMunuProps) => {
	return (
		<button className={s.burgerButton} onClick={hundlerMobMenu}>
			<svg className={s.iconBurger}>
				<use href="/sprite.svg#icon-burger-menu-two-line"></use>
			</svg>
		</button>
	);
};

export default BurgerButton;
