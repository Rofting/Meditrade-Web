<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const POSTER = '/images/escritorio1.webp'
const SOURCES = [
  { src: '/images/video%20web.mp4', type: 'video/mp4' },
  // Si tienes versión webm, colócala primero:
  // { src: '/videos/video-web.webm', type: 'video/webm' },
]

const videoRef = ref<HTMLVideoElement | null>(null)
const showOverlay = ref(false)
const aspect = ref('16 / 9') // se actualiza al metadata real

const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let io: IntersectionObserver | null = null

function setAspectFromMeta() {
  const el = videoRef.value
  if (!el || !el.videoWidth || !el.videoHeight) return
  aspect.value = `${el.videoWidth} / ${el.videoHeight}` // p.ej. "1920 / 804"
}

onMounted(() => {
  const el = videoRef.value
  if (!el) return

  el.preload = 'metadata'
  el.muted = true
  el.playsInline = true

  // Cuando el navegador sabe el tamaño real del vídeo, ajustamos el ratio
  const onMeta = () => { setAspectFromMeta() }
  el.addEventListener('loadedmetadata', onMeta, { once: true })

  if (prefersReduced) {
    el.pause()
    showOverlay.value = true
  } else {
    el.play().then(() => { showOverlay.value = false }).catch(() => { showOverlay.value = true })
  }

  // Pausa fuera de viewport, reproduce al entrar
  io = new IntersectionObserver((entries) => {
    const e = entries[0]
    if (!el) return
    if (e.isIntersecting) el.play().catch(() => {})
    else el.pause()
  }, { threshold: 0.25 })
  io.observe(el)
})

onBeforeUnmount(() => io?.disconnect())

function togglePlay() {
  const el = videoRef.value
  if (!el) return
  if (el.paused) {
    el.play().then(() => { showOverlay.value = false }).catch(() => { showOverlay.value = true })
  } else {
    el.pause()
    showOverlay.value = true
  }
}
</script>

<template>
  <section class="relative py-16 md:py-24 bg-[var(--color-surface)]">
    <div class="container-default text-center">
      <div
          class="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-sm"
          :style="{ aspectRatio: aspect }"
      >
        <video
            ref="videoRef"
            class="h-full w-full object-contain"
            loop
            muted
            playsinline
            preload="metadata"
            :poster="POSTER"
        >
          <source v-for="s in SOURCES" :key="s.src" :src="s.src" :type="s.type" />
          Tu navegador no soporta el vídeo HTML5.
        </video>

        <button
            v-show="showOverlay"
            @click="togglePlay"
            class="absolute inset-0 grid place-items-center bg-black/35 backdrop-blur-sm focus:outline-none"
            aria-label="Reproducir vídeo"
        >
          <span class="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow">
            <svg viewBox="0 0 24 24" class="h-7 w-7 text-[var(--color-text)]" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </div>

      <div class="mt-8 md:mt-10">
        <p class="mx-auto max-w-3xl text-[var(--color-text)]/80">
          Gestión ágil y transparente para tu comunidad. Hablemos de cómo podemos ayudarte.
        </p>
        <div class="mt-5 flex flex-wrap justify-center gap-3">
          <RouterLink
              to="/contact"
              class="rounded-full bg-[var(--color-brand-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Contáctanos
          </RouterLink>
          <RouterLink
              to="/services"
              class="rounded-full border border-[var(--color-border)] px-6 py-3 font-semibold hover:bg-black/5"
          >
            Ver servicios
          </RouterLink>
        </div>
      </div>

      <noscript>
        <p class="mt-6">
          <img src="/images/escritorio1.webp" alt="Vista previa del vídeo" class="mx-auto max-w-3xl rounded-xl border" />
        </p>
      </noscript>
    </div>
  </section>
</template>

<style scoped>
/* sin CSS extra */
</style>