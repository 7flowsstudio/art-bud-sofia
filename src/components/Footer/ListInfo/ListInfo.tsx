import React from "react";
import s from "./ListInfo.module.css";

const ListInfo = () => {
	const listInfo = [
		{ id: 0, link: "/", name: "Łódź, Polska" },
		{ id: 1, link: "/", name: "Piotrków Trybunalski, Polska" },
		{ id: 2, link: "/", name: "art.bud.sofia@gmail.com" },
		{ id: 3, link: "/", name: "793-385-161" },
	];
	return (
		<div className={s.infoBlock}>
			<h5 className={s.navigateTitle}>Info</h5>
			<ul className={s.listInfo}>
				{listInfo.map((item) => (
					<li key={item.id}>
						{item.id === 0 || item.id === 1 ? (
							<p className={s.infoLink}>{item.name}</p>
						) : item.id === 2 ? (
							<a href={`mailto:${item.link}`} className={s.infoLink}>
								{item.name}
							</a>
						) : (
							<a href={`tel:${item.link}`} className={s.infoLink}>
								{item.name}
							</a>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListInfo;
