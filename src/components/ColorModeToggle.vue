<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/colorMode'
</script>

<template>
  <button
      class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:text-[var(--color-accent-600)] hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
      :aria-pressed="isDark"
      aria-label="Cambiar tema"
      title="Cambiar tema"
      @click="toggleDark()"
  >
    <!-- Sol / Luna (cambiando solo con v-if) -->
    <svg v-if="!isDark" viewBox="0 0 24 24" class="h-5 w-5 transition-transform duration-300" style="fill:currentColor">
      <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.22 19.78l1.79-1.79-1.8-1.8-1.79 1.8 1.8 1.79zM20 13h3v-2h-3v2zM17.24 4.84l1.8-1.79L21.83 4.84l-1.79 1.79-1.8-1.79zM11 1h2v3h-2V1zm7.78 18.78l-1.79-1.79-1.8 1.8 1.79 1.79 1.8-1.8zM12 6a6 6 0 100 12A6 6 0 0012 6z"/>
    </svg>
    <svg v-else viewBox="0 0 24 24" class="h-5 w-5 rotate-12 transition-transform duration-300" style="fill:currentColor">
      <path d="M12 2a9.93 9.93 0 00-7.07 2.93A10 10 0 1012 2zm0 18a8 8 0 01-5.66-13.66A8.93 8.93 0 0011 7a9 9 0 009 9 8.93 8.93 0 01-1.34.66A8 8 0 0112 20z"/>
    </svg>
  </button>
</template>
