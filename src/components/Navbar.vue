<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import ColorModeToggle from '@/components/ColorModeToggle.vue'

const route = useRoute()
const router = useRouter()

const open = ref(false)
const scrolled = ref(false)
const btnRef = ref<HTMLButtonElement | null>(null)
const firstMobLinkRef = ref<HTMLButtonElement | null>(null)

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
  sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer!.observe(el) })
}
function onScroll() { scrolled.value = window.scrollY > 4 }
function onKeydown(e: KeyboardEvent) { if (e.key === 'Escape' && open.value) { open.value = false; btnRef.value?.focus() } }

onMounted(() => {
  setupSpy()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  watch(open, (v) => { if (v) requestAnimationFrame(() => firstMobLinkRef.value?.focus()) })
  watch(() => route.fullPath, () => { open.value = false })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
})
</script>

<template>
  <header
      class="sticky top-0 z-40 transition-shadow supports-[backdrop-filter]:bg-white/70 backdrop-blur"
      :class="scrolled ? 'shadow-sm' : ''"
  >
    <div class="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-6">
      <div class="flex items-center justify-between py-3">
        <!-- Logo .webp -->
        <RouterLink to="/" class="flex items-center" aria-label="Ir a inicio">
          <img
              src="/images/logo-web1.webp"
              alt="Meditrade del Ebro — Logotipo"
              class="max-w-none object-contain transition-all duration-200"
              :class="scrolled ? 'h-[56px] md:h-[64px]' : 'h-[72px] md:h-[80px]'"
              decoding="async"
              fetchpriority="high"
          />
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="ml-auto hidden md:flex items-center gap-6 lg:gap-8">
          <button
              v-for="item in nav"
              :key="item.to"
              v-prefetch="item.to"
              @click="go(item.to)"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              class="group relative px-1 py-2 text-sm font-medium transition-colors"
              :class="isActive(item.to) ? 'text-[var(--color-brand-600)]' : 'text-[var(--color-text)] hover:text-[var(--color-brand-600)]'"
          >
            <span class="relative inline-block">
              {{ item.label }}
              <!-- Subrayado animado rojo corporativo -->
              <span
                  class="pointer-events-none absolute -bottom-1 left-0 block h-[3px] w-full origin-left scale-x-0 bg-[var(--color-brand-600)] transition-transform duration-300 group-hover:scale-x-100"
                  :class="isActive(item.to) ? 'scale-x-100' : ''"
              />
            </span>
          </button>

          <!-- Toggle icon-only (usa azul en hover/foco) -->
          <ColorModeToggle />

          <button
              v-prefetch="'/presupuesto'"
              @click="go('/presupuesto')"
              class="rounded-full bg-[var(--color-brand-600)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
          >
            Solicite Presupuesto
          </button>
        </nav>

        <!-- Botón móvil -->
        <button
            ref="btnRef"
            class="md:hidden ml-2 inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
            @click="open = !open"
            :aria-expanded="open ? 'true' : 'false'"
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
        >
          <span class="sr-only">Abrir menú</span>
          <span class="flex h-5 w-6 flex-col justify-between text-[var(--color-text)]">
            <span class="block h-[3px] w-full rounded bg-current"></span>
            <span class="block h-[3px] w-full rounded bg-current"></span>
            <span class="block h-[3px] w-full rounded bg-current"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Móvil: overlay + drawer -->
    <div v-show="open" class="md:hidden fixed inset-0 z-50 bg-black/30" role="dialog" aria-modal="true" aria-labelledby="mobile-title" @click.self="open=false">
      <div id="mobile-menu" class="ml-auto h-full w-80 bg-[var(--color-surface)] p-6 shadow-lg">
        <h2 id="mobile-title" class="text-sm font-semibold text-[var(--color-muted)]">Menú</h2>
        <div class="mt-4 grid gap-1">
          <button
              v-for="(item, i) in nav"
              :key="item.to"
              :ref="i===0 ? 'firstMobLinkRef' : undefined"
              v-prefetch="item.to"
              @click="go(item.to)"
              class="group relative rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand-600)] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
              :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            <span class="relative inline-block">
              {{ item.label }}
              <span
                  class="pointer-events-none absolute -bottom-1 left-0 block h-[3px] w-full origin-left scale-x-0 bg-[var(--color-brand-600)] transition-transform duration-300 group-hover:scale-x-100"
                  :class="isActive(item.to) ? 'scale-x-100' : ''"
              />
            </span>
          </button>

          <div class="mt-2">
            <ColorModeToggle />
          </div>

          <button
              v-prefetch="'/presupuesto'"
              @click="go('/presupuesto')"
              class="mt-2 rounded-lg bg-[var(--color-brand-600)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
          >
            Solicite Presupuesto
          </button>

          <button @click="open=false" class="mt-4 text-sm text-[var(--color-muted)] underline">Cerrar</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* todo con utilidades */
</style>
