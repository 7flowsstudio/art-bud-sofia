"use client";
import AdminPage from "@/components/Admin/AdminPage/AdminPage";
import Authorization from "@/components/Admin/Authorization/Authorization";
import React, { useEffect, useState } from "react";

const Page = () => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		setIsAuth(true);
	}, []);

	return <>{isAuth ? <AdminPage /> : <Authorization />}</>;
};

export default Page;
