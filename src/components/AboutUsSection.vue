<!-- src/components/AboutUsSection.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
// Componente puramente visual. Si usas v-reveal, ya queda listo; si no, puedes quitarlo.
</script>

<template>
  <section class="relative py-16 md:py-24 bg-[var(--color-surface)]">
    <div class="container-default">
      <div class="grid items-center gap-12 md:grid-cols-2">

        <!-- Imagen / Logo con “halo” suave y sin deformar -->
        <div class="relative" v-reveal="'left'">
          <!-- Halo/blur decorativo -->
          <div
              class="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl"
              style="background: radial-gradient(60% 60% at 30% 30%, color-mix(in oklab, var(--color-accent-600), transparent 80%) 0%, transparent 100%),
                    radial-gradient(50% 50% at 90% 20%, color-mix(in oklab, var(--color-brand-600), transparent 85%) 0%, transparent 100%);">
          </div>

          <figure class="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <div class="aspect-[4/3] w-full">
              <picture>
                <source srcset="/images/logo-bueno.webp" type="image/webp" />
                <img
                    src="/images/logo-bueno.webp"
                    alt="Meditrade del Ebro — Identidad de marca"
                    class="h-full w-full object-contain p-6"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 50vw, 100vw"
                />
              </picture>
            </div>
          </figure>
        </div>

        <!-- Texto -->
        <div v-reveal="'up'">
          <span
              class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-600)]"
          >
            Conócenos
          </span>

          <h2 class="h-title mt-3 text-3xl md:text-4xl font-bold">
            Administrador de fincas con <span class="text-[var(--color-brand-600)]">agilidad</span> y
            <span class="text-[var(--color-accent-600)]">transparencia</span>
          </h2>

          <p class="mt-3 text-[var(--color-text)]/80">
            Nuestro equipo combina experiencia y dedicación para una gestión cercana y eficiente.
            Cuidamos tu comunidad con procesos claros, comunicación constante y enfoque en el ahorro.
          </p>

          <!-- Pilares -->
          <ul class="mt-6 grid gap-4 sm:grid-cols-2">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-600)]/10 text-[var(--color-brand-600)]">
                <!-- check -->
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <p class="font-medium">Agilidad</p>
                <p class="text-sm text-[var(--color-text)]/70">Atención 365 días y tramitación de incidencias con seguimiento.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <p class="font-medium">Servicio</p>
                <p class="text-sm text-[var(--color-text)]/70">Gestión integral: proveedores, contabilidad y juntas.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-600)]/10 text-[var(--color-brand-600)]">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <p class="font-medium">Transparencia</p>
                <p class="text-sm text-[var(--color-text)]/70">Información clara y accesible para propietarios y juntas.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <p class="font-medium">Ahorro</p>
                <p class="text-sm text-[var(--color-text)]/70">Negociación de contratos y control del gasto real.</p>
              </div>
            </li>
          </ul>

          <!-- CTAs -->
          <div class="mt-6 flex flex-wrap gap-3">
            <RouterLink
                to="/presupuesto"
                class="rounded-xl bg-[var(--color-brand-600)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Solicitar presupuesto
            </RouterLink>
            <RouterLink
                to="/about"
                class="rounded-xl border border-[var(--color-border)] px-5 py-3 font-semibold hover:bg-black/5"
            >
              Conócenos
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* sin CSS extra: todo con utilidades */
</style>
