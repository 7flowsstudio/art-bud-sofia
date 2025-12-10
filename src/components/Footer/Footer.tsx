import React from "react";
import s from "./Footer.module.css";
import LogoFooter from "./LogoFooter/LogoFooter";
import Description from "./Description/Description";
import ListStacks from "./ListStacks/ListStacks";
import ListInfo from "./ListInfo/ListInfo";
import ListSocial from "./ListSocial/ListSocial";
const Footer = () => {
	return (
		<div className={s.sectionFooter}>
			<div className={`container`}>
				<div className={s.footer}>
					<div className={s.content}>
						<div className={s.logoPhrase}>
							<LogoFooter />
							<Description />
						</div>
						<div className={s.navigate}>
							<ListStacks />
							<ListInfo />
							<ListSocial />
						</div>
					</div>
					<div className={s.copyright}>
						<h4 className={s.copyrightTitle}>
							© 2025 Art Bud Sofia. Wszelkie prawa zastrzeżone.
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
