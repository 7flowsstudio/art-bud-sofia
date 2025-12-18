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
      <h2>Reviews</h2>

      <input
        placeholder="Імʼя"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        placeholder="Місто"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <textarea
        placeholder="Текст відгуку"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      <button onClick={upload}>Add review</button>

      {reviews.map((r) => (
        <div key={r.id}>
          <Image src={r.imageUrl} alt="" width={48} height={48} />
          <p>{r.author}</p>
          <p>{r.city}</p>
          <p>{r.text}</p>
          <button onClick={() => remove(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
