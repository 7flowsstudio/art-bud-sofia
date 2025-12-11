import React, { SetStateAction } from "react";
import s from "./SuccessModdal.module.css";

type SuccessProps = {
	setSuccessMessage: React.Dispatch<SetStateAction<boolean>>;
	setOpenModal?: React.Dispatch<SetStateAction<boolean>>;
};

const SuccessModdal: React.FC<SuccessProps> = ({
	setSuccessMessage,
	setOpenModal,
}) => {
	return (
		<div
			className={s.modal}
			onClick={() => {
				setSuccessMessage(false);
				setOpenModal?.(false);
			}}
		>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<button
					className={s.modalCloseBtn}
					type="button"
					onClick={() => {
						setSuccessMessage(false);
						setOpenModal?.(false);
					}}
					aria-label="Close modal"
				>
					×
				</button>
				<p className={s.modalMessage}>
					Twoja rezerwacja jest prawie gotowa!
					<br /> Skontaktujemy się, żeby ustalić dokładną godzinę wizyty.
				</p>
			</div>
		</div>
	);
};

export default SuccessModdal;
