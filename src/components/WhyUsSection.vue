<!-- src/components/WhyUsSection.vue -->
<script setup lang="ts">
// Componente presentacional. Si usas v-reveal de tu proyecto, ya está listo.
// Si no lo usas, puedes quitar los atributos v-reveal sin que afecte al layout.
</script>

<template>
  <section class="relative py-16 md:py-24 bg-[var(--color-surface)]">
    <!-- fondo decorativo sutil -->
    <div
        class="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style="background:
        radial-gradient(50% 40% at 15% 20%, color-mix(in oklab, var(--color-accent-600), transparent 90%) 0%, transparent 100%),
        radial-gradient(55% 45% at 95% 10%, color-mix(in oklab, var(--color-brand-600), transparent 92%) 0%, transparent 100%);">
    </div>

    <div class="container-default">
      <div class="grid items-center gap-12 md:grid-cols-2">

        <!-- Imagen correctamente encajada -->
        <div class="relative" v-reveal="'left'">
          <figure class="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <div class="aspect-[4/3] w-full">
              <picture>
                <source srcset="/images/fincas.webp" type="image/webp" />
                <img
                    src="/images/fincas.webp"
                    alt="Administrador de Fincas Colegiado"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 50vw, 100vw"
                />
              </picture>
            </div>
          </figure>
          <!-- etiqueta pequeña opcional -->
          <div
              class="pointer-events-none absolute left-4 top-4 rounded-full bg-[var(--color-brand-600)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Colegiado
          </div>
        </div>

        <!-- Texto -->
        <div class="mt-2 md:mt-0" v-reveal="'up'">
          <span
              class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-600)]"
          >
            Calidad y confianza
          </span>

          <h3 class="mt-3 text-3xl md:text-4xl font-bold text-[var(--color-text)]">
            ¿Por qué un <span class="text-[var(--color-brand-600)]">Administrador de Fincas colegiado</span>?
          </h3>

          <ul class="mt-6 space-y-5">
            <li class="flex items-start gap-3">
              <span
                  class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-brand-600)]/10 text-[var(--color-brand-600)]"
                  aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <p class="text-lg leading-relaxed text-[var(--color-text)]/80">
                Garantía de <strong>formación</strong> y actualización normativa continua.
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span
                  class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]"
                  aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <p class="text-lg leading-relaxed text-[var(--color-text)]/80">
                Respaldo del <strong>colegio profesional</strong>: ética, responsabilidad y transparencia.
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span
                  class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-brand-600)]/10 text-[var(--color-brand-600)]"
                  aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <p class="text-lg leading-relaxed text-[var(--color-text)]/80">
                Acceso a <strong>recursos especializados</strong> para soluciones eficientes y personalizadas.
              </p>
            </li>
          </ul>

          <!-- CTAs -->
          <div class="mt-7 flex flex-wrap gap-3">
            <router-link
                to="/about"
                class="rounded-xl bg-[var(--color-brand-600)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Conócenos
            </router-link>
            <router-link
                to="/services"
                class="rounded-xl border border-[var(--color-border)] px-5 py-3 font-semibold hover:bg-black/5"
            >
              Ver servicios
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Sin CSS adicional: todo con utilidades */
</style>
