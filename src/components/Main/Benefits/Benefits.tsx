import Image from "next/image";
import s from "./Benefits.module.css";
import { cards } from "@/data/cards";
const Benefits = () => {
  return (
    <div className={s.container}>
      <h2>Zalety współpracy z nami</h2>
      <ul className={s.cards}>
        {cards.map((card) => (
          <li className={s.card} key={card.id}>
            <Image src={card.icon} alt={card.title} width={40} height={40} />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;
