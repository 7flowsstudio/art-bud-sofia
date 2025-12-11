"use client";
import React, { useEffect, useState } from "react";
import s from "./GallerySwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import SlideItem from "./SlideItem/SlideItem";

const GallerySwiper = () => {
	const [width, setWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const autoHeightValue = width < 1280;

	const media = [
		"/img/gallery/img_1.webp",
		"/img/gallery/img_2.webp",
		"/img/gallery/img_3.webp",
		"/img/gallery/img_1.webp",
		"/img/gallery/img_2.webp",
		"/img/gallery/img_3.webp",
	];

	const widths = ["slide25", "slide30", "slide45"];

	return (
		<div id="SliderGallery" className={s.gallerySwiper}>
			<div className={`container ${s.sliderContainer}`}>
				<div className={s.headBlock}>
					<h2 className={s.title}>Galeria prac</h2>

					<div className={s.laptopPagination}>
						<button type="button" className={`gallery-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-btn-on-top"></use>
							</svg>
						</button>

						<button type="button" className={`gallery-next ${s.navButton}`}>
							<svg className={`${s.navButton_icon} ${s.right}`}>
								<use href="/sprite.svg#icon-btn-on-top"></use>
							</svg>
						</button>
					</div>
				</div>

				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".gallery-next",
						prevEl: ".gallery-prev",
					}}
					modules={[Navigation]}
					autoHeight={autoHeightValue}
					loop={true}
					slidesPerView="auto"
					spaceBetween={24}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 6,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
						1280: {
							slidesPerView: "auto",
							spaceBetween: 20,
						},
					}}
				>
					{media.map((item, index) => (
						<SwiperSlide
							key={index}
							className={`${s.slide} ${s[widths[index % 3]]}`}
						>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className={s.mobPagination}>
					<button type="button" className={`gallery-prev ${s.navButton}`}>
						<svg className={s.navButton_icon}>
							<use href="/sprite.svg#icon-btn-on-top"></use>
						</svg>
					</button>

					<button type="button" className={`gallery-next ${s.navButton}`}>
						<svg className={`${s.navButton_icon} ${s.right}`}>
							<use href="/sprite.svg#icon-btn-on-top"></use>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default GallerySwiper;
