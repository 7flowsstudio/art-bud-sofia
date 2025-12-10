"use client";
import React, { useState, useEffect } from "react";
import s from "./Works.module.css";
import worksList from "./works.json";
import Image from "next/image";

const Works = () => {
	const [visibleCount, setVisibleCount] = useState(8); // початково 8
	const [itemsPerClick, setItemsPerClick] = useState(4); // кількість айтемів, що додаються при кліку

	// Динамічно визначаємо кількість айтемів на клік залежно від ширини екрану
	const updateItemsPerClick = () => {
		const width = window.innerWidth;
		if (width <= 767) {
			setItemsPerClick(2);
			setVisibleCount(4);
		} else if (width <= 1279) {
			setItemsPerClick(3);
			setVisibleCount(6);
		} else {
			setItemsPerClick(4);
			setVisibleCount(8);
		}
	};

	useEffect(() => {
		updateItemsPerClick(); // спочатку при mount
		window.addEventListener("resize", updateItemsPerClick); // при зміні розміру
		return () => window.removeEventListener("resize", updateItemsPerClick);
	}, []);

	const addItem = () => {
		setVisibleCount((prev) => prev + itemsPerClick);
	};

	const resetItem = () => {
		updateItemsPerClick();
	};

	return (
		<div className={s.worksSection}>
			<div className={`container ${s.worksContainer}`}>
				<h2 className={s.title}>Nasze kluczowe obszary</h2>
				<ul className={s.worksList}>
					{worksList.slice(0, visibleCount).map((item) => (
						<li key={item.id} className={s.worksItem}>
							<div className={s.imageWrapper}>
								<Image
									src={item.url}
									fill
									alt={`image_${item.id}`}
									className={s.image}
								/>
							</div>
							<div className={s.cardDescription}>
								<h3 className={s.titleItem}>{item.title}</h3>
								<p className={s.description}>{item.description}</p>
							</div>
						</li>
					))}
				</ul>

				<button
					type="button"
					className={s.btnMore}
					onClick={visibleCount < worksList.length ? addItem : resetItem}
				>
					<div className={s.iconBlock}>
						<svg className={s.btnIcon}>
							<use href="/sprite.svg#icon-Shape"></use>
						</svg>
					</div>
					{visibleCount < worksList.length ? "Pokaż więcej" : " Pokaż mniej"}
				</button>
			</div>
		</div>
	);
};

export default Works;
