import Swiper, { Navigation, Autoplay } from "swiper";

export const slider = () => {
  const swiper = new Swiper(".slider", {
    // Optional parameters
    // direction: "vertical",
    loop: true,
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // If we need pagination
    // pagination: {
    //  el: ".swiper-pagination",
    // },

    // Navigation arrows
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },

    // And if we need scrollbar
    // scrollbar: {
    //  el: ".swiper-scrollbar",
    // },
  });
};
