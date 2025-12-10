import Image from "next/image";
import s from "./Call.module.css";
const Call = () => {
  return (
    <div className={s.section}>
      <div className={s.container}>
        <Image
          src="/img/call/call.svg"
          alt="stars"
          width={64}
          height={16}
          className={s.svgCall}
        />
        <h2 className={s.titleCall}>
          GOTOWY NA REMONT
          <span className={s.imgWrapper}>
            <Image
              src="/img/call/photo_call.png"
              alt="flat"
              width={63}
              height={24}
              className={s.imgCall}
            />
          </span>{" "}
          DOMU SWOICH MARZEŃ?
        </h2>
      </div>
    </div>
  );
};

export default Call;
