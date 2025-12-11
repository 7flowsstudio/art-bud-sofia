"use client";
import React from "react";
import s from "./GallerySwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SlideItem from "./SlideItem/SlideItem";

const GallerySwiper = () => {
	const media = [
		"/img/gallery/img_1.webp",
		"/img/gallery/img_2.webp",
		"/img/gallery/img_3.webp",
		"/img/gallery/img_1.webp",
		"/img/gallery/img_2.webp",
		"/img/gallery/img_3.webp",
	];

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
					modules={[Pagination, Navigation]}
					autoHeight={true}
					loop={true}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 4 },
						768: { slidesPerView: 1, spaceBetween: 4 },
						1280: { slidesPerView: 2, spaceBetween: 24 },
					}}
				>
					{media.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
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
