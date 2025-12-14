import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonialSwiper = new Swiper(".testimonials-swiper", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1110: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    },
  },
});
