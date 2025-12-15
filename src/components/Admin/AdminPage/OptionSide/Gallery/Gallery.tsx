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
import s from "./Gallery.module.css";
import { db } from "../../../../../../firebaseConfig";

type GalleryItem = {
  id: string;
  imageUrl: string;
  createdAt: number;
};

// const Gallery = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);

//   const fetchGallery = async () => {
//     const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
//     const snapshot = await getDocs(q);
//     const galleryArray: GalleryItem[] = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       imageUrl: doc.data().imageUrl,
//       createdAt: doc.data().createdAt,
//     }));
//     setGallery(galleryArray);
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const upload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const { data } = await axios.post("/api/upload", formData);

//       await addDoc(collection(db, "gallery"), {
//         imageUrl: data.url,
//         createdAt: Date.now(),
//       });

//       setFile(null);
//       fetchGallery(); // оновлюємо список після завантаження
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Видалити фото?")) return;

//     try {
//       await deleteDoc(doc(db, "gallery", id));
//       fetchGallery(); // оновлюємо список після видалення
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };
const Gallery = () => {
  const [file, setFile] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Завантажуємо список фото з локального стану (або з Firebase/DB, якщо потрібно)
  useEffect(() => {
    const storedGallery = localStorage.getItem("gallery");
    if (storedGallery) {
      setGallery(JSON.parse(storedGallery));
    }
  }, []);

  // Зберігаємо в localStorage, щоб після перезавантаження залишались
  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery));
  }, [gallery]);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newItem: GalleryItem = {
        id: Date.now().toString(),
        imageUrl: data.url,
        createdAt: Date.now(),
      };

      setGallery([newItem, ...gallery]);
      setFile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Upload error:", message);
      alert("Помилка завантаження файлу");
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Видалити фото?")) return;
    setGallery(gallery.filter((item) => item.id !== id));
  };

  return (
    <div>
      Gallery
      <div>
        <label className={s.button}>
          + Додати нове фото
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <div>
        <button onClick={upload} disabled={!file}>
          Upload
        </button>
      </div>
      <div className={s.galleryList}>
        {gallery.map((item) => (
          <div key={item.id} className={s.galleryItem}>
            <Image
              src={item.imageUrl}
              alt="uploaded"
              width={200}
              height={200}
              className={s.image}
            />
            <button
              className={s.deleteButton}
              onClick={() => handleDelete(item.id)}
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
