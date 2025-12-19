"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import s from "./Works.module.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const Works = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [itemsPerClick, setItemsPerClick] = useState(4);

  // Підтягуємо дані з Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // якщо хочеш сортувати за назвою:
        const q = query(collection(db, "services"), orderBy("title", "asc"));
        const snapshot = await getDocs(q);

        const data: ServiceItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          imageUrl: doc.data().imageUrl,
        }));

        console.log("Fetched services:", data); // перевірка
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // Динамічна кількість елементів на клік
  const updateItemsPerClick = () => {
    const width = window.innerWidth;
    if (width <= 767) {
      setItemsPerClick(2);
      setVisibleCount(4);
    } else if (width <= 1279) {
      setItemsPerClick(3);
      setVisibleCount(6);
    } else {
      setItemsPerClick(4);
      setVisibleCount(8);
    }
  };

  useEffect(() => {
    updateItemsPerClick();
    window.addEventListener("resize", updateItemsPerClick);
    return () => window.removeEventListener("resize", updateItemsPerClick);
  }, []);

  const addItem = () => setVisibleCount((prev) => prev + itemsPerClick);
  const resetItem = () => updateItemsPerClick();

  return (
    <div className={s.worksSection} id="works">
      <div className={`container ${s.worksContainer}`}>
        <h2 className={s.title}>Nasze kluczowe obszary</h2>
        <ul className={s.worksList}>
          {services.slice(0, visibleCount).map((item) => (
            <li key={item.id} className={s.worksItem}>
              <div className={s.imageWrapper}>
                <Image
                  src={item.imageUrl}
                  fill
                  alt={`image_${item.id}`}
                  className={s.image}
                />
              </div>
              <div className={s.cardDescription}>
                <h3 className={s.titleItem}>{item.title}</h3>
                <p className={s.description}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={s.btnMore}
          onClick={visibleCount < services.length ? addItem : resetItem}
        >
          <div className={s.iconBlock}>
            <svg className={s.btnIcon}>
              <use href="/sprite.svg#icon-Shape"></use>
            </svg>
          </div>
          {visibleCount < services.length ? "Pokaż więcej" : " Pokaż mniej"}
        </button>
      </div>
    </div>
  );
};

export default Works;
