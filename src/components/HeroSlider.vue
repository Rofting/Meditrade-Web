<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const modules = [Pagination, Autoplay, EffectFade, A11y]
const BASE = import.meta.env.BASE_URL || '/'

// SOLO imágenes (sin textos)
const slides = [
  { src: `${BASE}images/edificio4.webp`,   alt: 'Edificio 1' },
  { src: `${BASE}images/escritorio1.webp`, alt: 'Escritorio' },
  { src: `${BASE}images/edificio2.1.webp`, alt: 'Edificio 2' },
]

// Emitimos el índice real del slide activo
const emit = defineEmits<{ (e: 'change', index: number): void }>()
function onSlideChange(swiper: any) {
  const i = typeof swiper?.realIndex === 'number' ? swiper.realIndex : (swiper?.activeIndex ?? 0)
  emit('change', i)
}

// Respeta “reduced motion”
const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

const autoplay = prefersReduced ? false : { delay: 5000, disableOnInteraction: false }
const effect = 'fade'
</script>

<template>
  <!-- Ocupa 100% del contenedor padre; SIN textos -->
  <div class="absolute inset-0 z-0 w-full h-full">
    <Swiper
        :modules="modules"
        :loop="true"
        :pagination="{ clickable: true }"
        :a11y="{ enabled: true }"
        :autoplay="autoplay"
        :effect="effect"
        class="w-full h-full"
        @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(s, i) in slides" :key="i">
        <img
            :src="s.src"
            :alt="s.alt"
            class="w-full h-full object-cover"
            :fetchpriority="i===0 ? 'high' : undefined"
            loading="eager"
            decoding="async"
            sizes="100vw"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:global(.swiper-pagination-bullet){ width:10px; height:10px; opacity:.5 }
:global(.swiper-pagination-bullet-active){ opacity:1 }
</style>

