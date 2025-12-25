"use client";
import React, { useEffect, useState } from "react";
import s from "./United.module.css";
// import Header from "../Header/Header";
import Hero from "../Main/Hero/Hero";

const United = () => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className={`${s.container} ${loaded ? s.loaded : ""}`}>
			{/* <Header /> */}
			<Hero />
		</div>
	);
};

export default United;
