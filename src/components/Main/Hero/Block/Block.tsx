import React from "react";
import s from "./Block.module.css";
import Image from "next/image";

const Block = () => {
  return (
    <div className={s.containerBlock}>
      <Image
        src="/img/hero/photo_b.png"
        alt="work"
        width={77}
        height={64}
        className={s.imgBlock}
      />
      <p className={s.text}>
        Jednym zarządem – gwarancja jakości bez kompromisów.
      </p>
      <button className={s.btnBlock}>
        <span className={s.btnMob}>
          <Image src="/img/hero/arrow.svg" alt="icon" width={16} height={16} />
        </span>

        <span className={s.btnDesc}>Uzyskaj konsultację</span>
      </button>
    </div>
  );
};

export default Block;
