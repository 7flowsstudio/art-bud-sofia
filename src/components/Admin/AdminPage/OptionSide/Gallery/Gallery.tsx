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
import Resizer from "react-image-file-resizer";
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
  const [preview, setPreview] = useState<string | null>(null);

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

  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200, // max ширина
        1200, // max висота
        "JPEG", // формат
        80, // якість %
        0, // поворот
        (uri) => resolve(uri as File),
        "file"
      );
    });

  const upload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const resizedFile = await resizeFile(file);

      const formData = new FormData();
      formData.append("file", resizedFile);

      const { data } = await axios.post("/api/upload", formData);

      await addDoc(collection(db, "gallery"), {
        imageUrl: data.url,
        createdAt: Date.now(),
      });

      setFile(null);
      fetchGallery();
      setPreview(null);
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
    <div className={`container ${s.contAdmGall}`}>
      <div className={s.wrappContF}>
        <div className={s.wrapp}>
          <label className={s.button}>
            {preview ? (
              <Image src={preview} alt="preview" width={48} height={48} />
            ) : (
              "+ Додати нове фото"
            )}
            <input
              type="file"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }
              }}
            />
          </label>

          <button
            onClick={upload}
            disabled={!file || loading}
            className={s.btnUpl}
          >
            {loading ? "Завантаження..." : "Завантажити"}
          </button>
        </div>
      </div>
      <div className={s.wrappSec}>
        <div className={s.galleryList}>
          <div className={s.head}>
            <p className={s.textF}>Фото</p>
            <p className={s.text}>Дія</p>
          </div>
          {gallery.map((item) => (
            <div key={item.id} className={s.galleryItem}>
              <div className={s.wrappImg}>
                <Image
                  src={item.imageUrl}
                  alt="gallery image"
                  width={78}
                  height={78}
                  className={s.image}
                />
              </div>
              <button
                className={s.deleteButton}
                onClick={() => handleDelete(item.id)}
              >
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
};

export default Gallery;
