"use client";
// import { useState } from "react";
import ContactForm from "./ContactForm/ContactForm";
import s from "./Form.module.css";
// import Consultation from "@/data/Consultation/Consultation";
const Form = () => {
	// const [openModal, setOpenModal] = useState(false);
	const title = "Uzyskaj bezpłatną konsultację i wycenę remontu";
	// const title1 = "Uzyskaj bezpłatną konsultację i wycenę naprawy";
	return (
		<div id="form" className={s.container}>
			<ContactForm title={title} />
			{/* <button type="button" onClick={() => setOpenModal(true)}>
				Consultation
			</button>
			{openModal && <Consultation setOpenModal={setOpenModal} title={title1}/>} */}
		</div>
	);
};

export default Form;
