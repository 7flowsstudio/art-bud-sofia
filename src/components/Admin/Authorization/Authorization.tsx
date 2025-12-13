"use client";
import React, { useEffect, useState } from "react";
import s from "./Authorization.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchemaRegister } from "@/data/validationSchema";

type AuthProps = {
	email: string;
	password: string;
};

const Authorization = () => {
	const [isVisual, setIsVisual] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setIsVisual(true);
		}, 500);
	}, []);
	const initialValues: AuthProps = {
		email: "",
		password: "",
	};

	const hundlerAuth = (value: AuthProps) => {
		const authData = {
			email: value.email,
			password: value.password,
		};
		console.log("DATA", authData);
	};

	return (
		<>
			{isVisual && (
				<div className={s.authWrapper}>
					<div className={s.authBlock}>
						<h3 className={s.title}>Авторизація</h3>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchemaRegister}
							onSubmit={hundlerAuth}
						>
							<Form className={s.form}>
								<div className={s.inputWrapper}>
									<label className={s.label}>
										<Field
											type="email"
											name="email"
											placeholder="Логін"
											className={s.input}
										/>
										<ErrorMessage
											name="email"
											component="p"
											className={s.error}
										/>
									</label>
									<label className={s.label}>
										<Field
											type="password"
											name="password"
											autoComplete="new-password"
											placeholder="Пароль"
											className={s.input}
										/>
										<ErrorMessage
											name="password"
											component="p"
											className={s.error}
										/>
									</label>

									<button type="button" className={s.btnRestore}>
										Відновити пароль
									</button>
								</div>
								<button type="submit" className={s.btnEnter}>
									Увійти
								</button>
							</Form>
						</Formik>
					</div>
				</div>
			)}
		</>
	);
};

export default Authorization;
