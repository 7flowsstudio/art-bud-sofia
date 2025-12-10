import Link from "next/link";
import React from "react";
import s from "./Logo.module.css";

const Logo = () => {
	return (
		<Link href="/">
			<h3 className={s.logo}>
				Art <span className={s.logoSpan}>Bud</span> Sofia
			</h3>
		</Link>
	);
};

export default Logo;
