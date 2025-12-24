import Link from "next/link";
import React from "react";
import s from "./ListSocial.module.css";

const ListSocial = () => {
	const ListSocial = [
		{ id: 0, link: "/", name: "Instagram" },
		{ id: 1, link: "/", name: "Facebook" },
		{ id: 2, link: "/", name: "Youtube" },
	];
	return (
		<div className={s.socialBlock}>
			<h5 className={s.navigateTitle}>Social</h5>
			<ul className={s.listSocial}>
				{ListSocial.map((item) => (
					<li key={item.id} className={s.socialItem}>
						<Link href={item.link} className={s.socialLink}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListSocial;
