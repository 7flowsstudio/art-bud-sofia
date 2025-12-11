"use client";
import React, { SetStateAction } from "react";
import s from "./Consultation.module.css";
import ContactForm from "@/components/Main/Form/ContactForm/ContactForm";

type ModalProp = {
	setOpenModal: React.Dispatch<SetStateAction<boolean>>;
	title: string;
};

const Consultation: React.FC<ModalProp> = ({ setOpenModal, title }) => {
	return (
		<div className={s.modal} onClick={() => setOpenModal(false)}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<button
					className={s.modalCloseBtn}
					type="button"
					onClick={() => setOpenModal(false)}
					aria-label="Close modal"
				>
					×
				</button>
				<ContactForm title={title} setOpenModal={setOpenModal} />
			</div>
		</div>
	);
};

export default Consultation;
