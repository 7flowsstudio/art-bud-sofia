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
  };

  const remove = async (id: string) => {
    if (!confirm("Видалити послугу?")) return;
    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  return (
    <div>
      <h2>Services</h2>

      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />
      <button onClick={upload}>Add service</button>

      {services.map((s) => (
        <div key={s.id}>
          <Image src={s.imageUrl} alt="" width={100} height={100} />
          <h4>{s.title}</h4>
          <p>{s.description}</p>
          <button onClick={() => remove(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
