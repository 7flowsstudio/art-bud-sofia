import Image from "next/image";
import s from "./Benefits.module.css";
import { cards } from "@/data/cards";
const Benefits = () => {
  return (
    <div className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Zalety współpracy z nami</h2>
        <div className={s.wrappList}>
          <ul className={s.cards}>
            {cards.map((card) => (
              <li className={s.card} key={card.id}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={80}
                  height={80}
                />
                <h3 className={s.titleCard}>{card.title}</h3>
                <p className={s.textCard}>{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
