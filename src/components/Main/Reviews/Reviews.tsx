"use client";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../../../firebaseConfig";
import s from "./Reviews.module.css";
import { useSmoothScroll } from "@/utils/useSmoothScroll";

type Review = {
  id: string;
  author: string;
  city: string;
  text: string;
  imageUrl: string;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollSmooth } = useSmoothScroll(containerRef, {
    slidesToScroll: 1,
    gap: 1,
    duration: 500,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Review, "id">),
        }));
        setReviews(data);
      } catch (e) {
        console.error("Error fetching reviews", e);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className={`container ${s.section}`}>
      <div className={s.reviewContainer} ref={containerRef}>
        <div className={s.firstCont}>
          <h3 className={s.title}>Co mówią nasi klienci</h3>
          <p className={s.text}>
            Klienci dzielą się swoimi wrażeniami na temat współpracy i
            uzyskanych rezultatów.
          </p>
        </div>
        <ul className={s.list}>
          {reviews.map((r) => (
            <li key={r.id} className={s.card}>
              <Image
                src="/img/reviews/svgRev.svg"
                alt="icon"
                width={112}
                height={16}
              />
              <div className={s.contText}>
                <p className={s.textRev}>{r.text}</p>
              </div>
              <div className={s.wrapp}>
                <div className={s.imageWrapper}>
                  <Image
                    src={r.imageUrl}
                    alt={r.author}
                    width={48}
                    height={48}
                  />
                </div>
                <div className={s.authorWrapp}>
                  <p className={s.author}>{r.author}</p>
                  <p>{r.city}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.mobPagination}>
        <button
          type="button"
          onClick={() => scrollSmooth("left")}
          className={`gallery-prev ${s.navButton}`}
        >
          <svg className={s.navButton_icon}>
            <use href="/sprite.svg#icon-btn-on-top" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollSmooth("right")}
          className={`gallery-next ${s.navButton}`}
        >
          <svg className={`${s.navButton_icon} ${s.right}`}>
            <use href="/sprite.svg#icon-btn-on-top" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Reviews;
