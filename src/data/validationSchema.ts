import * as Yup from "yup";

const passwordRules = /^[a-zA-Z0-9]+$/;
export const validationSchemaRegister = () => {
	return Yup.object({
		email: Yup.string()
			.email("Не коректний Email!")
			.required("Введіть коректный email!"),
		password: Yup.string()
			.matches(passwordRules, "Тільки латинські літери і цифри!")
			.min(5, "Мінімум 5 символів!")
			.required("Обовязково!"),
	});
};

export const ValidationSchemaCallback = Yup.object().shape({
	name: Yup.string()
		.required("Wpisz nazwę. To konieczność!")
		.min(2, "Minimum 2 znaki!"),

	phone: Yup.string()
		.required("Wpisz swój numer telefonu. To konieczność!")
		.matches(/^\d+$/, "Numer może zawierać tylko cyfry!")
		.min(9, "Minimum 9 znaków!"),

	message: Yup.string()
		.required("Wpisz swoją wiadomość. To konieczność!")
		.min(10, "Minimum 10 znaków!"),
});
