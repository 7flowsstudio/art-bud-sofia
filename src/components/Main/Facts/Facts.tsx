import s from "./Facts.module.css";
const Facts = () => {
	return (
		<div id="about" className={s.section}>
			<div className={s.container}>
				<h2 className={s.title}>
					Art Bud Sofia oferuje profesjonalne remonty pod klucz z osobistym
					nadzorem właściciela firmy
				</h2>
				<ul className={s.list}>
					<li className={s.elementF}>
						<span>20</span>
						lat doświadczenia
					</li>
					<li className={s.elementS}>
						<span>2,5</span>
						lata pracy lokalnej w Polsce
					</li>
					<li className={s.elementTh}>
						<span>11+</span>
						rodzajów pracy
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Facts;
