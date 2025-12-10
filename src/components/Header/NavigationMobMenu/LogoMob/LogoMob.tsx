import React from "react";
import s from "./LogoMob.module.css";

const LogoMob = () => {
	return (
		<div className={s.LogoMob}>
			<h3 className={s.logoTitle}>
				Art <span className={s.logoTitleSpan}>Bud</span> Sofia
			</h3>
		</div>
	);
};

export default LogoMob;
