import Image from "next/image";
import s from "./ImageModal.module.css";

type Props = {
  src: string;
  onClose: () => void;
};

export const ImageModal = ({ src, onClose }: Props) => (
  <div className={s.modal} onClick={onClose}>
    <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={s.closeButton} onClick={onClose}>
        <Image
          src="/img/gallery/close.svg"
          width={24}
          height={24}
          alt="close"
        />
      </button>
      <Image
        src={src}
        alt="full"
        fill
        // width={1000}
        // height={1000}
        className={s.modalImage}
      />
    </div>
  </div>
);
