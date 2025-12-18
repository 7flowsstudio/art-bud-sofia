"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../../../firebaseConfig";
import s from "./Reviews.module.css";

type Review = {
  id: string;
  author: string;
  city: string;
  text: string;
  imageUrl: string;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

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
      <div className={s.reviewContainer}>
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
              <p className={s.textRev}>{r.text}</p>
              <div className={s.imageWrapper}>
                <Image src={r.imageUrl} alt={r.author} width={48} height={48} />
              </div>
              <p className={s.author}>{r.author}</p>
              <p>{r.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
