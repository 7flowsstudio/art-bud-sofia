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

const Gallery = () => {
  const [file, setFile] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    setGallery(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GalleryItem, "id">),
      }))
    );
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const upload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/api/upload", formData);

      await addDoc(collection(db, "gallery"), {
        imageUrl: data.url,
        createdAt: Date.now(),
      });

      setFile(null);
      fetchGallery();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити фото?")) return;

    try {
      await deleteDoc(doc(db, "gallery", id));
      fetchGallery();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2>Gallery</h2>

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

      <button onClick={upload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div className={s.galleryList}>
        {gallery.map((item) => (
          <div key={item.id} className={s.galleryItem}>
            <Image
              src={item.imageUrl}
              alt="gallery image"
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
