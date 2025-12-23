import React from "react";
import s from "./ListStacks.module.css";
import Link from "next/link";
import { LocalizedScrollButton } from "@/utils/LocalizedScrollButton/LocalizedScrollButton";

const ListStacks = () => {
	const listStacs = [
		{
			id: 0,
			link: "about",
			name: "O ArtBudSofia",
		},
		{
			id: 1,
			link: "works",
			name: "Usługi",
		},
		{
			id: 2,
			link: "SliderGallery",
			name: "Galeria",
		},
		{
			id: 3,
			link: "reviews",
			name: "Recenzje",
		},
	];
	return (
		<div className={s.stackBlock}>
			<h5 className={s.navigateTitle}>Stack</h5>
			<ul className={s.listStack}>
				{listStacs.map((item) => (
					<li key={item.id}>
						<LocalizedScrollButton scrollId={item.link} className={s.stackLink}>
							{item.name}
						</LocalizedScrollButton>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListStacks;
