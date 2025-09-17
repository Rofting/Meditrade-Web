<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

const testimonials = [
  { img: `${BASE}images/andrea.webp`, name: 'Andrea López', text: 'Resolutivos y atención inmejorable.' },
  { img: `${BASE}images/sergio.webp`, name: 'Sergio', text: 'Profesionales y atentos, muy recomendables.' },
  { img: `${BASE}images/sara.webp`,   name: 'Sara', text: 'Trato cercano y profesional. Muy recomendables 😃' },
  { img: `${BASE}images/laura.webp`,  name: 'Laura', text: 'Gracias por la ayuda y la atención. 100% confianza.' },
  { img: `${BASE}images/jorge.webp`,  name: 'Jorge', text: 'Siempre receptivos y resolutivos con las incidencias.' },
  { img: `${BASE}images/raquel.webp`, name: 'Raquel G. A.', text: 'Gestión efectiva y transparente. Encantados.' },
]

const modules = [Navigation, Pagination, A11y, Autoplay]
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-neutral-50">
      <div class="container-default py-14 md:py-20">
        <h1 class="h-title text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Conócenos</h1>
        <p class="mt-3 max-w-3xl text-neutral-700">
          En <strong>Meditrade del Ebro</strong> administramos comunidades con experiencia, transparencia y cercanía.
          Nuestro objetivo: tu tranquilidad y la buena salud de tu comunidad.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="container-default">
      <div class="grid gap-8 md:grid-cols-[auto_1fr] items-start">
        <img :src="`${BASE}images/exclamacion.webp`" alt="" class="h-20 w-auto md:h-24" />
        <p class="text-neutral-700">
          Gracias a nuestra dilatada experiencia como despacho profesional, resolvemos de forma
          rápida y eficaz las gestiones de tu Comunidad de Propietarios con un trato personalizado y humano,
          basado en el compromiso, la responsabilidad y la transparencia.
        </p>
      </div>
      <div class="mt-8 h-px w-full bg-neutral-200"></div>
    </section>

    <!-- Director -->
    <section class="container-default py-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-2 md:items-center">
        <div class="order-2 md:order-1">
          <h2 class="text-2xl md:text-3xl font-bold">Fernando Piazuelo</h2>
          <p class="mt-3 text-neutral-700">
            Más de <strong>35 años</strong> administrando Comunidades de Propietarios avalan una gestión
            eficaz, rápida y profesional, siempre en defensa de los intereses de la Comunidad y sus copropietarios.
          </p>
        </div>
        <div class="order-1 md:order-2">
          <img :src="`${BASE}images/fernando.webp`" alt="Fernando Piazuelo" class="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-sm" />
        </div>
      </div>
    </section>

    <!-- Experiencia & Diferenciales -->
    <section class="container-default py-8 md:py-12">
      <div class="grid gap-10 md:grid-cols-2">
        <div>
          <h3 class="text-xl md:text-2xl font-semibold">La experiencia nos avala</h3>
          <ul class="mt-4 space-y-3 text-neutral-700">
            <li>Comunidades de todos los tamaños (hasta +160 viviendas) en Zaragoza: Valdespartera, Arcosur, Miralbueno, etc.</li>
            <li>Complejos inmobiliarios y entidades urbanísticas de conservación.</li>
            <li>Áreas de parcelas y viviendas unifamiliares (ej.: Montecanal).</li>
            <li>Control de costes en salas de calderas con contadores individuales de calefacción y ACS.</li>
            <li>Experiencia en reclamaciones por deficiencias constructivas y a copropietarios morosos.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl md:text-2xl font-semibold">¿Qué nos diferencia?</h3>
          <p class="mt-4 text-neutral-700">
            Buscamos tu tranquilidad y confianza. Contamos con programas de gestión integral que permiten
            el control individual de gastos e ingresos, facturas, contratos de servicio y mantenimiento
            preventivo. Seguimos incidencias y siniestros, y comunicamos a la comunidad de forma clara y ágil.
          </p>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="container-default py-12 md:py-16">
      <h3 class="text-2xl md:text-3xl font-bold text-center">Nuestros clientes opinan</h3>
      <div class="mt-8">
        <Swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="16"
            :breakpoints="{ 640:{slidesPerView:2}, 1024:{slidesPerView:3} }"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 6000, disableOnInteraction: false }"
            class="!pb-10"
        >
          <SwiperSlide v-for="(t, i) in testimonials" :key="i">
            <article class="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <img :src="t.img" :alt="t.name" class="h-14 w-14 rounded-full object-cover" />
              <h4 class="mt-3 font-semibold">{{ t.name }}</h4>
              <p class="mt-2 text-neutral-700 text-sm">{{ t.text }}</p>
              <div class="mt-3 text-[var(--brand-red)]">★★★★★</div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <!-- Innovación y sostenibilidad -->
    <section class="container-default py-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h3 class="text-2xl font-semibold">Innovación y sostenibilidad</h3>
          <p class="mt-3 text-neutral-700">
            Hemos modernizado nuestros procesos con plataformas de gestión y comunicación para que tengas
            acceso rápido y claro a la información.
            Nuestros clientes cuentan con <strong>TUCOMUNIDAD</strong>, web y app para estar al tanto de todo.
          </p>
          <p class="mt-3 text-neutral-700">
            Además, reducimos el uso de papel y trabajamos para que los edificios administrados sean
            más eficientes y sostenibles.
          </p>
          <div class="mt-6">
            <a href="/presupuesto" class="inline-flex items-center rounded-xl bg-[var(--brand-red)] px-5 py-3 font-semibold text-white hover:opacity-90">
              TUCOMUNIDAD
            </a>
          </div>
        </div>
        <div class="flex justify-center">
          <img :src="`${BASE}images/mundo.webp`" alt="Compromiso con el entorno" class="max-w-md w-full rounded-2xl border border-neutral-200 bg-white shadow-sm" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* sin css extra */
</style>
