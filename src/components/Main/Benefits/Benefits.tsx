"use client";
import Image from "next/image";
import s from "./Benefits.module.css";
import { cards } from "@/data/cards";
import useScrollAnimation from "@/utils/UseScrollAnimation/useScrollAnimation";
const Benefits = () => {
	const [heroTitleRef, heroTitleVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	return (
		<div className={s.section}>
			<div className={s.container}>
				<h2
					ref={heroTitleRef}
					className={`${s.title} ${s.animateTitle} ${
						heroTitleVisible ? s.visible : ""
					}`}
				>
					Zalety współpracy z nami
				</h2>
				<div className={s.wrappList}>
					<ul className={s.cards}>
						{cards.map((card) => (
							<li className={s.card} key={card.id}>
								<Image
									src={card.icon}
									alt={card.title}
									width={80}
									height={80}
								/>
								<h3 className={s.titleCard}>{card.title}</h3>
								<p className={s.textCard}>{card.text}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Benefits;
