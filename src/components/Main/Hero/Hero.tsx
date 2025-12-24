"use client";
import React from "react";
import s from "./Hero.module.css";
import Block from "./Block/Block";
import useScrollAnimation from "@/utils/UseScrollAnimation/useScrollAnimation";

const Hero = () => {
	const [heroBlockRef, heroBlockVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	const [heroTitleRef, heroTitleVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	return (
		<div className={`container ${s.containerHero}`} id="hero">
			<div
				ref={heroBlockRef}
				className={`${s.block} ${s.animateBlock} ${
					heroBlockVisible ? s.visible : ""
				}`}
			>
				<Block />
			</div>
			<div className={s.wrappTitle}>
				<h1
					ref={heroTitleRef}
					className={`${s.title} ${s.animateTitle} ${
						heroTitleVisible ? s.visible : ""
					}`}
				>
					NIEZAWODNE REMONTU OD PROFESJONALISTY W TWOIM MIEŚCIE
				</h1>
				<div
					ref={heroBlockRef}
					className={`${s.wrappText} ${s.animateBlock} ${
						heroBlockVisible ? s.visible : ""
					}`}
				>
					<p>Wszystko od drobnych napraw po kompleksowe remonty domów</p>
					<button
						className={s.btn}
						onClick={() => {
							const el = document.getElementById("works");
							el?.scrollIntoView({ behavior: "smooth" });
						}}
					>
						Wyświetl usługi{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
