"use client";
import React, { useState } from "react";
import s from "./Block.module.css";
import Image from "next/image";
import Consultation from "@/data/Consultation/Consultation";

const Block = () => {
	const [openModal, setOpenModal] = useState(false);
	const title = "Uzyskaj bezpłatną konsultację i wycenę naprawy";
	return (
		<>
			<div className={s.containerBlock}>
				<Image
					src="/img/hero/photo_block.png"
					alt="work"
					width={304}
					height={230}
					className={s.imgBlock}
				/>
				<p className={s.text}>
					Jednym zarządem – gwarancja jakości bez kompromisów.
				</p>
				<button className={s.btnBlock} onClick={() => setOpenModal(true)}>
					<span className={s.btnMob}>
						<Image
							src="/img/hero/arrow.svg"
							alt="icon"
							width={16}
							height={16}
						/>
					</span>

					<span className={s.btnDesc}>Uzyskaj konsultację</span>
				</button>
			</div>
			{openModal && <Consultation setOpenModal={setOpenModal} title={title} />}
		</>
	);
};

export default Block;
