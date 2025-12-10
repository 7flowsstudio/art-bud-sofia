import React from "react";
import s from "./ListStacks.module.css";
import Link from "next/link";

const ListStacks = () => {
	const listStacs = [
		{ id: 0, link: "/", name: "O ArtBudSofia" },
		{ id: 1, link: "/", name: "Usługi" },
		{ id: 2, link: "/", name: "Galeria" },
		{ id: 3, link: "/", name: "Recenzje" },
	];
	return (
		<div className={s.stackBlock}>
			<h5 className={s.navigateTitle}>Stack</h5>
			<ul className={s.listStack}>
				{listStacs.map((item) => (
					<li key={item.id}>
						<Link href={item.link} className={s.stackLink}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListStacks;
