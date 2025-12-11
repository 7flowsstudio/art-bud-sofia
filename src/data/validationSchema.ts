import * as Yup from "yup";

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
