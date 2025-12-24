"use client";
import useScrollAnimation from "@/utils/UseScrollAnimation/useScrollAnimation";
import s from "./Facts.module.css";
const Facts = () => {
	const [heroTitleRef, heroTitleVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	const [heroElementFRef, heroElementFVisible] = useScrollAnimation() as [
		React.RefObject<HTMLLIElement>,
		boolean
	];
	const [heroElementSRef, heroElementSVisible] = useScrollAnimation() as [
		React.RefObject<HTMLLIElement>,
		boolean
	];
	const [heroElementThRef, heroElementThVisible] = useScrollAnimation() as [
		React.RefObject<HTMLLIElement>,
		boolean
	];

	return (
		<div id="about" className={s.section}>
			<div className={s.container}>
				<h2
					ref={heroTitleRef}
					className={`${s.title} ${s.animateTitle} ${
						heroTitleVisible ? s.visible : ""
					}`}
				>
					Art Bud Sofia oferuje profesjonalne remonty pod klucz z osobistym
					nadzorem właściciela firmy
				</h2>
				<ul className={s.list}>
					<li
						ref={heroElementFRef}
						className={`${s.elementF} ${s.animateElementF} ${
							heroElementFVisible ? s.visible : ""
						}`}
					>
						<span>20</span>
						lat doświadczenia
					</li>
					<li
						ref={heroElementSRef}
						className={`${s.elementS} ${s.animateElementS} ${
							heroElementSVisible ? s.visible : ""
						}`}
					>
						<span>2,5</span>
						lata pracy lokalnej w Polsce
					</li>
					<li
						ref={heroElementThRef}
						className={`${s.elementTh} ${s.animateElementTh} ${
							heroElementThVisible ? s.visible : ""
						}`}
					>
						<span>11+</span>
						rodzajów pracy
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Facts;
