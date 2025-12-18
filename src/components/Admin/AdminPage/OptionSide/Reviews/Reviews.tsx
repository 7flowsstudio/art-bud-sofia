"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import axios from "axios";
import Image from "next/image";
import { db } from "../../../../../../firebaseConfig";
import s from "./Reviews.module.css";

type Review = {
  id: string;
  imageUrl: string;
  author: string;
  city: string;
  text: string;
  createdAt: number;
};

export default function Reviews() {
  const [file, setFile] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setReviews(
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }))
    );
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const upload = async () => {
    if (!file || !author || !text) return;

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("/api/upload", formData);

    await addDoc(collection(db, "reviews"), {
      imageUrl: data.url,
      author,
      city,
      text,
      createdAt: Date.now(),
    });

    setFile(null);
    setAuthor("");
    setCity("");
    setText("");
    fetchReviews();
  };

  const remove = async (id: string) => {
    if (!confirm("Видалити відгук?")) return;
    await deleteDoc(doc(db, "reviews", id));
    fetchReviews();
  };

  return (
    <div>
      <div className={s.table}>
        <div className={`${s.row} ${s.header}`}>
          <div>Фото</div>
          <div>Імʼя</div>
          <div>Місто</div>
          <div>Текст</div>
          <div>Дія</div>
        </div>
        <div className={s.wrappTable}>
          <div className={`${s.row} ${s.addRow}`}>
            <label className={s.button}>
              + Додати фото
              <input
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>

            <input
              name="author"
              placeholder="Імʼя"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              name="city"
              placeholder="Місто"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <textarea
              name="review"
              placeholder="Текст відгуку"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={upload}>Додати відгук</button>
          </div>

          {reviews.map((r) => (
            <div key={r.id} className={s.row}>
              <Image src={r.imageUrl} alt="" width={48} height={48} />
              <p>{r.author}</p>
              <p>{r.city}</p>
              <p className={s.review}>{r.text}</p>
              <button className={s.deleteButton} onClick={() => remove(r.id)}>
                <Image
                  src="/img/admin/trash.svg"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
