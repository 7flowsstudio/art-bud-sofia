"use client";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	scrollId: string;
}

export const LocalizedScrollButton = ({
	scrollId,
	onClick,
	type = "button",
	...props
}: Props) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const el = document.getElementById(scrollId);
		el?.scrollIntoView({ behavior: "smooth" });

		onClick?.(e);
	};

	return <button type={type} onClick={handleClick} {...props} />;
};
