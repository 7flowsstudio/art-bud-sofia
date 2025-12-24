"use client";
import React from "react";
import s from "./Footer.module.css";
import LogoFooter from "./LogoFooter/LogoFooter";
import Description from "./Description/Description";
import ListStacks from "./ListStacks/ListStacks";
import ListInfo from "./ListInfo/ListInfo";
import ListSocial from "./ListSocial/ListSocial";
import ButtonOnTop from "./ButtonOnTop/ButtonOnTop";
import { usePathname } from "next/navigation";
import useScrollAnimation from "@/utils/UseScrollAnimation/useScrollAnimation";
const Footer = () => {
	const [heroPhraseRef, heroPhraseVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	const [heroNavigateRef, heroNavigateVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	const [heroCopyrightRef, heroCopyrightVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	const path = usePathname().split("/")[1];
	console.log("Path", path);
	return (
		<>
			{path !== "admin" && (
				<div className={s.sectionFooter}>
					<div className={`container`}>
						<div className={s.footer}>
							<ButtonOnTop />
							<div className={s.content}>
								<div
									ref={heroPhraseRef}
									className={`${s.logoPhrase} ${s.animatePhrase} ${
										heroPhraseVisible ? s.visible : ""
									}`}
								>
									<LogoFooter />
									<Description />
								</div>
								<div
									ref={heroNavigateRef}
									className={`${s.navigate} ${s.animateNavigate} ${
										heroNavigateVisible ? s.visible : ""
									}`}
								>
									<ListStacks />
									<ListInfo />
									<ListSocial />
								</div>
							</div>
							<div className={s.copyright}>
								<h4
									ref={heroCopyrightRef}
									className={`${s.copyrightTitle} ${s.animateCopyright} ${
										heroCopyrightVisible ? s.visible : ""
									}`}
								>
									© 2025 Art Bud Sofia. Wszelkie prawa zastrzeżone.
								</h4>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Footer;
