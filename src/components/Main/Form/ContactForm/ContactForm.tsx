"use client";
import React, { SetStateAction, useState } from "react";
import s from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";
import { ValidationSchemaCallback } from "@/data/validationSchema";
import SuccessModdal from "./SuccessModdal/SuccessModdal";

type Props = {
	title: string;
	setOpenModal?: React.Dispatch<SetStateAction<boolean>>;
};

type InitialValuesType = {
	name: string;
	phone: string;
	message: string;
};

const ContactForm = ({ title, setOpenModal }: Props) => {
	const [successMessage, setSuccessMessage] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const initialValues = {
		name: "",
		phone: "",
		message: "",
	};

	const hundlerSubmit = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		const data = {
			name: values.name,
			phone: `+48${values.phone}`,
			message: values.message,
		};

		try {
			setIsLoading(true);
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setSuccessMessage(true);
				resetForm();
			}
		} catch (error) {
			console.error("Error sending email:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={s.formWrapper}>
			<h2 className={s.title}>{title}</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaCallback}
				onSubmit={hundlerSubmit}
			>
				{({ isValid, dirty }) => (
					<Form className={s.form}>
						<h3 className={s.formTitle}>Skontaktuj się z nami!</h3>
						<div className={s.blockInputs}>
							<label className={s.label}>
								<Field
									type="text"
									name="name"
									className={s.input}
									placeholder="Wpisz swoje imię"
								/>
								<ErrorMessage name="name" component="p" className={s.error} />
							</label>
							<label className={s.label}>
								<Field
									type="text"
									name="phone"
									className={s.input}
									placeholder="Podaj swój numer telefonu"
								/>
								<ErrorMessage name="phone" component="p" className={s.error} />
							</label>

							<label className={s.label}>
								<Field
									name="message"
									component={AutoResizeTextarea}
									className={s.textArea}
									placeholder="Twoja wiadomość"
								/>
								<ErrorMessage
									name="message"
									component="p"
									className={s.error}
								/>
							</label>
						</div>

						<button
							type="submit"
							className={s.btnSend}
							disabled={!(isValid && dirty)}
						>
							{isLoading ? "Wysyłanie..." : "Uzyskaj konsultację"}
						</button>
					</Form>
				)}
			</Formik>

			{successMessage && (
				<SuccessModdal
					setSuccessMessage={setSuccessMessage}
					setOpenModal={setOpenModal}
				/>
			)}
		</div>
	);
};

export default ContactForm;
