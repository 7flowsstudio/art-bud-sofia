"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";
import Image from "next/image";
import { db } from "../../../../../../firebaseConfig";
import s from "./Services.module.css";

type Service = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
};

export default function Services() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchServices = async () => {
    const snap = await getDocs(collection(db, "services"));
    setServices(
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Service, "id">) }))
    );
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const upload = async () => {
    if (!file || !title || !description) return;

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("/api/upload", formData);

    await addDoc(collection(db, "services"), {
      imageUrl: data.url,
      title,
      description,
    });

    setFile(null);
    setTitle("");
    setDescription("");
    fetchServices();
    setPreview(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Видалити послугу?")) return;
    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  return (
    <div className={s.contAdmServ}>
      <div className={s.table}>
        <div className={`${s.row} ${s.header}`}>
          <div>Фото</div>
          <div>Назва</div>
          <div>Опис</div>
          <div>Дія</div>
        </div>
        <div className={s.wrappTable}>
          <div className={`${s.row} ${s.addRow}`}>
            <label className={s.button}>
              {preview ? (
                <Image src={preview} alt="preview" width={48} height={48} />
              ) : (
                "+ Додати фото"
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
            <input
              name="name"
              placeholder="Назва"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={s.textar}
              name="description"
              placeholder="Опис"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={s.btnAdd} onClick={upload}>
              Додати послугу
            </button>
          </div>
          {services.map((r) => (
            <div key={r.id} className={s.row}>
              <Image src={r.imageUrl} alt="" width={85} height={78} />
              <p>{r.title}</p>
              <p className={s.descr}>{r.description}</p>
              <button onClick={() => remove(r.id)}>
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
