<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

// Colores
const BRAND_RED = '#E1353B'
const TEXT_DARK = '#0A0A0A'

const route = useRoute()
const router = useRouter()
const open = ref(false)
const scrolled = ref(false)

// Secciones para scroll-spy
const sectionIds = ['servicios', 'nosotros', 'por-que', 'contacto']
const activeSection = ref<string | null>(null)

type NavItem = { label: string; to: string }
const nav: NavItem[] = [
  { to: '/', label: 'Inicio' },
  { to: '/services', label: 'Servicios' },
  { to: '/about', label: 'Conócenos' },
  { to: '/propietarios', label: 'Propietarios' },
  { to: '/blog', label: 'Blog' },
]

function isActive(to: string) {
  if (to.startsWith('/#')) {
    const id = to.split('#')[1]
    return activeSection.value === id
  }
  if (to === '/') return route.path === '/' && !activeSection.value
  return route.path === to
}

function go(to: string) {
  if (to.startsWith('/#')) {
    const id = to.split('#')[1]
    router.replace({ hash: `#${id}` })
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    open.value = false
    return
  }
  router.push(to)
  open.value = false
}

let observer: IntersectionObserver | null = null
function setupSpy() {
  observer?.disconnect()
  const opts = { root: null, rootMargin: '-120px 0px -60% 0px', threshold: [0, 0.2, 0.6, 1] }
  observer = new IntersectionObserver((entries) => {
    const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    activeSection.value = vis?.target?.id ?? null
  }, opts)
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
}
function onScroll() { scrolled.value = window.scrollY > 4 }

onMounted(() => { setupSpy(); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); observer?.disconnect() })
</script>

<template>
  <header
      class="sticky top-0 z-40 bg-white transition-shadow"
      :class="scrolled ? 'shadow-sm' : ''"
      :style="{ '--brand-red': BRAND_RED, '--text-dark': TEXT_DARK }"
  >
    <!-- CONTAINER con padding lateral mínimo para llevar el logo más a la izquierda -->
    <div class="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6">
      <div class="flex items-center justify-between py-3">
        <!-- LOGO integrado (sin borde/placa) -->
        <RouterLink to="/" class="flex items-center">
          <img
              src="/images/logo-web1.webp"
              alt="Meditrade del Ebro — Logotipo"
              class="max-w-none object-contain transition-all duration-200"
              :class="scrolled ? 'h-[56px] md:h-[64px]' : 'h-[72px] md:h-[80px]'"
              decoding="async"
              fetchpriority="high"
          />
        </RouterLink>

        <!-- NAV DESKTOP empujado a la derecha -->
        <nav class="ml-auto hidden md:flex items-center gap-6 lg:gap-8">
          <button
              v-for="item in nav"
              :key="item.to"
              @click="go(item.to)"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              class="group relative px-1 py-2 text-sm font-medium transition-colors"
              :class="isActive(item.to)
              ? 'text-[var(--brand-red)]'
              : 'text-[var(--text-dark)] hover:text-[var(--brand-red)]'"
          >
            <span class="relative inline-block">
              {{ item.label }}
              <!-- subrayado animado a ancho del texto -->
              <span
                  class="pointer-events-none absolute -bottom-1 left-0 block h-[3px] w-full origin-left scale-x-0 bg-[var(--brand-red)] transition-transform duration-300 group-hover:scale-x-100"
                  :class="isActive(item.to) ? 'scale-x-100' : ''"
              />
            </span>
          </button>

          <button
              @click="go('/presupuesto')"
              class="rounded-full bg-[var(--brand-red)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Solicite Presupuesto
          </button>
        </nav>

        <!-- NAV MÓVIL -->
        <button
            class="md:hidden ml-2 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
            @click="open = !open"
            :aria-expanded="open ? 'true' : 'false'"
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
        >
          <span class="sr-only">Abrir menú</span>
          <span class="flex h-5 w-6 flex-col justify-between">
            <span class="block h-[3px] w-full rounded bg-black"></span>
            <span class="block h-[3px] w-full rounded bg-black"></span>
            <span class="block h-[3px] w-full rounded bg-black"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Drawer móvil -->
    <div id="mobile-menu" class="md:hidden" v-show="open">
      <div class="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6 pb-4">
        <nav class="grid gap-1 rounded-xl border border-neutral-200 bg-white p-3">
          <button
              v-for="item in nav"
              :key="item.to"
              @click="go(item.to)"
              class="group relative rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-dark)] hover:text-[var(--brand-red)] hover:bg-black/5"
          >
            <span class="relative inline-block">
              {{ item.label }}
              <span
                  class="pointer-events-none absolute -bottom-1 left-0 block h-[3px] w-full origin-left scale-x-0 bg-[var(--brand-red)] transition-transform duration-300 group-hover:scale-x-100"
                  :class="isActive(item.to) ? 'scale-x-100' : ''"
              />
            </span>
          </button>

          <button
              @click="go('/presupuesto')"
              class="mt-2 rounded-lg bg-[var(--brand-red)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90 text-left"
          >
            Solicite Presupuesto
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* sin CSS extra */
</style>
