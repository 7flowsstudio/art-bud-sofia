"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./GallerySwiper.module.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { useSmoothScroll } from "@/utils/useSmoothScroll";

const GallerySwiper = () => {
  const [media, setMedia] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollSmooth } = useSmoothScroll(containerRef, {
    slidesToScroll: 1,
    gap: 1,
    duration: 50,
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const urls = snapshot.docs.map((doc) => doc.data().imageUrl);
        setMedia(urls);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div id="SliderGallery" className={s.gallerySwiper}>
      <div className={`container ${s.sliderContainer}`}>
        <div className={s.headBlock}>
          <h2 className={s.title}>Galeria prac</h2>

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

        <div className={s.galleryContainer} ref={containerRef}>
          {media.map((item) => (
            <div key={item} className={s.slideWrapper}>
              <Image
                src={item}
                alt="article"
                width={300} // реальна ширина
                height={200} // висота пропорційна картинці
                style={{ width: "auto", height: "auto", maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySwiper;

// const scrollSmooth = (direction: "left" | "right", slidesToScroll = 4) => {
//   if (!containerRef.current) return;

//   const slideWidth =
//     (containerRef.current.firstElementChild as HTMLElement)?.clientWidth ||
//     150;
//   const gap = 16; // відповідно до CSS
//   const distance = slidesToScroll * (slideWidth + gap);

//   const step = 15; // маленькі кроки для плавності
//   let scrolled = 0;

//   const interval = setInterval(() => {
//     if (scrolled >= distance) {
//       clearInterval(interval);
//       return;
//     }
//     containerRef.current!.scrollBy({
//       left: direction === "right" ? step : -step,
//       behavior: "auto",
//     });
//     scrolled += step;
//   }, 1);
// };
// const SLIDES_TO_SCROLL = 5;
// // Гортання клавішами ← →
// useEffect(() => {
//   const handleKey = (e: KeyboardEvent) => {
//     if (e.key === "ArrowLeft") scrollSmooth("left", SLIDES_TO_SCROLL);
//     if (e.key === "ArrowRight") scrollSmooth("right", SLIDES_TO_SCROLL);
//   };
//   window.addEventListener("keydown", handleKey);
//   return () => window.removeEventListener("keydown", handleKey);
// }, []);

// "use client";
// import React, { useEffect, useState } from "react";
// import s from "./GallerySwiper.module.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// import SlideItem from "./SlideItem/SlideItem";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../../../../firebaseConfig";

// const GallerySwiper = () => {
//   const [width, setWidth] = useState(0);
//   const [media, setMedia] = useState<string[]>([]);

//   useEffect(() => {
//     setWidth(window.innerWidth);
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const q = query(
//           collection(db, "gallery"),
//           orderBy("createdAt", "desc")
//         );
//         const snapshot = await getDocs(q);
//         const urls = snapshot.docs.map((doc) => doc.data().imageUrl);
//         setMedia(urls);
//       } catch (err) {
//         console.error("Error fetching gallery:", err);
//       }
//     };

//     fetchGallery();
//   }, []);

//   const autoHeightValue = width < 1280;
//   const widths = ["slide25", "slide30", "slide45"];

//   return (
//     <div id="SliderGallery" className={s.gallerySwiper}>
//       <div className={`container ${s.sliderContainer}`}>
//         <div className={s.headBlock}>
//           <h2 className={s.title}>Galeria prac</h2>

//           <div className={s.laptopPagination}>
//             <button type="button" className={`gallery-prev ${s.navButton}`}>
//               <svg className={s.navButton_icon}>
//                 <use href="/sprite.svg#icon-btn-on-top" />
//               </svg>
//             </button>

//             <button type="button" className={`gallery-next ${s.navButton}`}>
//               <svg className={`${s.navButton_icon} ${s.right}`}>
//                 <use href="/sprite.svg#icon-btn-on-top" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* 🔑 КЛЮЧОВЕ МІСЦЕ */}
//         {media.length > 0 && (
//           <Swiper
//             className={s.swiper}
//             modules={[Navigation]}
//             navigation={{
//               nextEl: ".gallery-next",
//               prevEl: ".gallery-prev",
//             }}
//             observer
//             observeParents
//             autoHeight={autoHeightValue}
//             loop
//             slidesPerView="auto"
//             spaceBetween={24}
//             breakpoints={{
//               320: { slidesPerView: 1, spaceBetween: 6 },
//               768: { slidesPerView: 2, spaceBetween: 10 },
//               1280: { slidesPerView: 4, spaceBetween: 20 },
//             }}
//           >
//             {media.map((item, index) => (
//               <SwiperSlide
//                 key={item}
//                 style={{ width: "auto" }}
//                 className={`${s.slide} ${s[widths[index % 3]]}`}
//               >
//                 <SlideItem item={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}

//         <div className={s.mobPagination}>
//           <button type="button" className={`gallery-prev ${s.navButton}`}>
//             <svg className={s.navButton_icon}>
//               <use href="/sprite.svg#icon-btn-on-top" />
//             </svg>
//           </button>

//           <button type="button" className={`gallery-next ${s.navButton}`}>
//             <svg className={`${s.navButton_icon} ${s.right}`}>
//               <use href="/sprite.svg#icon-btn-on-top" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GallerySwiper;
