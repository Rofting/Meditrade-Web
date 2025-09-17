<script setup lang="ts">
// --- Importaciones de Swiper ---
// Importa los componentes principales de Swiper para Vue
import { Swiper, SwiperSlide } from 'swiper/vue';

// Importa los módulos que vamos a usar:
// - Pagination: Los "puntitos" de abajo
// - Autoplay: Para que pase solo
// - EffectFade: Para el efecto "fade" que tenías
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// --- Importa los Estilos de Swiper ---
// Estilos base de Swiper
import 'swiper/css';
// Estilos para los módulos que usamos
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// --- Configuración ---
// Le decimos a Swiper qué módulos cargar
const modules = [Pagination, Autoplay, EffectFade];

// Datos de tus slides (del inicio.html)
// Así es más limpio: si quieres otra slide, solo la añades aquí.
const slides = [
  {
    img: '/images/edificio4.png',
    titleLine1: 'Meditrade del Ebro',
    titleLine2: 'Administradores de',
    titleLine3: 'Fincas en Zaragoza',
  },
  {
    img: '/images/escritorio1.png',
    titleLine1: 'Meditrade del Ebro',
    titleLine2: 'Administradores de',
    titleLine3: 'Fincas en Zaragoza',
  },
  {
    img: '/images/edificio2.1.png',
    titleLine1: 'Meditrade del Ebro',
    titleLine2: 'Administradores de',
    titleLine3: 'Fincas en Zaragoza',
  },
];
</script>

<template>
  <section class="relative w-full h-[50vh] md:h-[80vh]">
    <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :pagination="{ clickable: true }"
        :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
        class="w-full h-full"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="w-full h-full relative">
          <img
              :src="slide.img"
              :alt="'Slide ' + (index + 1)"
              class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>

          <div class="absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 lg:p-24">

            <h1 class="text-3xl md:text-5xl lg:text-6xl font-light uppercase">
              {{ slide.titleLine1 }}
              <b class="font-bold block">{{ slide.titleLine2 }}</b>
              <b class="font-bold block">{{ slide.titleLine3 }}</b>
            </h1>

            <a href="about-us.html">
              <button class="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg
                             hover:bg-blue-700 transition-colors duration-300
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Conócenos
              </button>
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
/* Podemos usar 'scoped' para modificar los estilos de Swiper
que son difíciles de cambiar con Tailwind.
Aquí hacemos que los "puntitos" de paginación
sean cuadrados, ¡solo como ejemplo de personalización!
*/

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: white;
  opacity: 0.7;
  border-radius: 0; /* Quitamos el borde redondeado */
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #007bff; /* Azul (puedes cambiarlo) */
  opacity: 1;
  transform: scale(1.1);
}
</style>