import React from "react";
import s from "./ContactsGroup.module.css";
import Link from "next/link";

const ContactsGroup = () => {
	const addressList = [
		{ id: 0, link: "/", name: "Łódź, Polska" },
		{ id: 1, link: "/", name: "Piotrków Trybunalski, Polska" },
		{ id: 2, link: "/", name: "art.bud.sofia@gmail.com" },
		{ id: 3, link: "/", name: "793-385-161" },
	];

	const socList = [
		{ id: 0, link: "/", src: "/sprite.svg#icon-icon_youtube" },
		{ id: 1, link: "/", src: "/sprite.svg#icon-icon-facebook" },
		{ id: 2, link: "/", src: "/sprite.svg#icon-icon-instagram" },
	];

	return (
		<div className={s.socialBlock}>
			<ul className={s.socialAddressList}>
				{addressList.map((item) => (
					<li key={item.id} className={s.socialAddressItem}>
						<Link href={item.link}>{item.name}</Link>
					</li>
				))}
			</ul>
			<ul className={s.socialSocList}>
				{socList.map((item) => (
					<li key={item.id}>
						<Link href={item.link} className={s.linkIcon}>
							<svg className={s.iconSoc}>
								<use href={item.src}></use>
							</svg>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContactsGroup;
