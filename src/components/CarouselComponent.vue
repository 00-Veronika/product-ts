<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
</script>

<template>
  <section class="carousel">
    <swiper :slides-per-view="1" :loop="true" :autoplay="true" space-between="10" class="mySwiper">
      <swiper-slide>
        <img src="@/assets/images/pic_1.jpg" alt="Картинка 1" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/pic_2.jpg" alt="Картинка 2" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/pic_3.jpg" alt="Картинка 3" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/pic_4.jpg" alt="Картинка 4" />
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
.carousel {
  width: 100%;
  height: 130px;
  position: relative;
}

/* .carousel .swiper.swiper-initialized  {
  height: 530px;
} */

.carousel .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
