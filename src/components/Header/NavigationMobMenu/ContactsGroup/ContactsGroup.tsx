import React from "react";
import s from "./ContactsGroup.module.css";
import Link from "next/link";
import Image from "next/image";

const ContactsGroup = () => {
	const addressList = [
		{ id: 0, link: "/", name: "Łódź, Polska" },
		{ id: 1, link: "/", name: "Piotrków Trybunalski, Polska" },
		{ id: 2, link: "art.bud.sofia@gmail.com", name: "art.bud.sofia@gmail.com" },
		{ id: 3, link: "+48793385161", name: "793-385-161" },
	];

	const socList = [
		{ id: 0, link: "/", src: "/img/mobMenu/icon_youtube.svg" },
		{ id: 1, link: "/", src: "/img/mobMenu/icon_facebook.svg" },
		{ id: 2, link: "/", src: "/img/mobMenu/icon_instagram.svg" },
	];

	return (
		<div className={s.socialBlock}>
			<ul className={s.socialAddressList}>
				{addressList.map((item) => (
					<li key={item.id} className={s.socialAddressItem}>
						{item.id === 0 || item.id === 1 ? (
							<p className={s.socialAddressItem}>{item.name}</p>
						) : item.id === 2 ? (
							<a href={`mailto:${item.link}`} className={s.socialAddressItem}>
								{item.name}
							</a>
						) : (
							<a href={`tel:${item.link}`} className={s.socialAddressItem}>
								{item.name}
							</a>
						)}
					</li>
				))}
			</ul>
			<ul className={s.socialSocList}>
				{socList.map((item) => (
					<li key={item.id}>
						<Link href={item.link} className={s.linkIcon}>
							<Image
								src={item.src}
								width={34}
								height={34}
								alt={`img + ${item.id}`}
							/>
							{/* <svg className={s.iconSoc}>
								<use href={item.src}></use>
							</svg> */}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContactsGroup;
