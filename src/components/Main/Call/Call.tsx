"use client";
import Image from "next/image";
import s from "./Call.module.css";
const Call = () => {
  return (
    <div className={s.section}>
      <div className={`container ${s.containerCall}`}>
        <Image
          src="/img/call/call.svg"
          alt="stars"
          width={64}
          height={16}
          className={s.svgCall}
        />
        <h2 className={s.titleCall}>
          GOTOWY NA{" "}
          <span className={s.imgWrapperD}>
            <Image
              src="/img/call/photo_call.png"
              alt="flat"
              width={63}
              height={24}
              className={s.imgCall}
            />
          </span>{" "}
          REMONT
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
        <p className={s.text}>
          Wypełnij formularz — właściciel osobiście się z Tobą skontaktuje i
          wybierze optymalne rozwiązania dla Twojego domu lub biura.
        </p>
        <button
          className={s.btn}
          onClick={() => {
            document.querySelector("#form")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Uzyskaj konsultację
        </button>
      </div>
    </div>
  );
};

export default Call;
