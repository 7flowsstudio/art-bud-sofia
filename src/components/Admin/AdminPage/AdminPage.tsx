"use client";
import React from "react";
import s from "./AdminPage.module.css";
import MenuSide from "./MenuSide/MenuSide";
import OptionSide from "./OptionSide/OptionSide";

const AdminPage = () => {
	return (
		<div className={s.adminWraper}>
			<MenuSide />
			<OptionSide />
		</div>
	);
};

export default AdminPage;
