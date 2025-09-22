<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { hasConsent, grantConsent, denyConsent, initAnalytics } from '@/utils/analytics'

const show = ref(false)
const router = useRouter()

onMounted(() => { show.value = !hasConsent() })

function accept() {
  grantConsent()
  initAnalytics(router, import.meta.env.VITE_PLAUSIBLE_DOMAIN || location.hostname)
  show.value = false
}
function reject() {
  denyConsent()
  show.value = false
}
</script>

<template>
  <div
      v-if="show"
      class="fixed inset-x-0 bottom-0 z-50 mx-auto w-full md:max-w-3xl
           rounded-t-2xl border border-[var(--color-border)] bg-[var(--color-surface)]
           shadow-lg p-4 md:p-5"
      role="dialog" aria-live="polite"
  >
    <p class="text-sm text-[var(--color-text)]/80">
      Usamos analítica anónima (Plausible) para mejorar la web. ¿Nos das permiso?
    </p>
    <div class="mt-3 flex gap-2 justify-end">
      <button @click="reject" class="rounded-lg border px-3 py-2 text-sm">No, gracias</button>
      <button
          @click="accept"
          class="rounded-lg bg-[var(--color-brand-600)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        Aceptar
      </button>
    </div>
  </div>
</template>
