<script setup lang="ts">
import { RouterLink } from 'vue-router'
const BRAND_RED = '#E1353B'
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }" class="min-h-[60vh] flex items-center">
    <div class="container-default text-center">
      <p class="text-sm text-neutral-500">Error 404</p>
      <h1 class="mt-1 text-4xl md:text-5xl font-bold">Página no encontrada</h1>
      <p class="mt-3 text-neutral-700">Puede que el enlace esté roto o la página haya sido movida.</p>
      <div class="mt-6 flex justify-center gap-3">
        <RouterLink to="/" class="rounded-xl bg-[var(--brand-red)] px-5 py-3 font-semibold text-white hover:opacity-90">
          Volver al inicio
        </RouterLink>
        <RouterLink to="/contact" class="rounded-xl border px-5 py-3 font-semibold hover:bg-neutral-50">
          Contacto
        </RouterLink>
      </div>
    </div>
  </main>
</template>
