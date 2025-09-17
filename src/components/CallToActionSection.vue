<script setup lang="ts">
import { reactive, ref } from 'vue'

const BRAND_RED  = '#E1353B'

type FormData = {
  name: string
  email: string
  message: string
  phone?: string // honeypot
}
const form = reactive<FormData>({ name: '', email: '', message: '', phone: '' })
const sending = ref(false)
const sent = ref(false)
const errorMsg = ref<string | null>(null)

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

async function onSubmit() {
  errorMsg.value = null
  if (form.phone) return
  if (!form.name || !validateEmail(form.email) || !form.message) {
    errorMsg.value = 'Por favor, completa todos los campos correctamente.'
    return
  }
  sending.value = true
  try {
    // aquí iría tu llamada a API / email service
    await new Promise(r => setTimeout(r, 700))
    sent.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contacto" class="py-16 md:py-24" :style="{ '--brand-red': BRAND_RED }">
    <div class="container-default">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <!-- Texto de empresa (no médico) -->
        <div>
          <h2 class="h-title text-3xl md:text-4xl font-bold text-[var(--brand-red)]">
            ¿Hablamos sobre tu comunidad?
          </h2>
          <p class="mt-3 text-neutral-600">
            Cuéntanos las necesidades de tu finca. Te responderemos con una propuesta clara y ajustada,
            con enfoque en <strong>transparencia</strong>, <strong>ahorro</strong> y <strong>mantenimiento eficaz</strong>.
          </p>

          <ul class="mt-6 grid gap-3 text-sm text-neutral-700">
            <li class="inline-flex items-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
              Gestión contable y de recibos, con informes claros.
            </li>
            <li class="inline-flex items-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
              Proveedores y mantenimiento bajo control.
            </li>
            <li class="inline-flex items-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
              Incidencias y urgencias con respuesta rápida.
            </li>
          </ul>
        </div>

        <!-- Formulario -->
        <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <form @submit.prevent="onSubmit" class="grid gap-4" novalidate>
            <!-- Honeypot -->
            <label class="hidden">Teléfono<input v-model="form.phone" autocomplete="off"></label>

            <label class="block">
              <span class="text-sm font-medium">Nombre</span>
              <input
                  v-model.trim="form.name"
                  required
                  name="name"
                  autocomplete="name"
                  class="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
              >
            </label>

            <label class="block">
              <span class="text-sm font-medium">Email</span>
              <input
                  v-model.trim="form.email"
                  required
                  type="email"
                  name="email"
                  autocomplete="email"
                  class="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
              >
            </label>

            <label class="block">
              <span class="text-sm font-medium">Mensaje</span>
              <textarea
                  v-model.trim="form.message"
                  rows="4"
                  name="message"
                  required
                  class="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
                  placeholder="Cuéntanos brevemente tu caso (nº de viviendas, necesidades, etc.)"
              ></textarea>
            </label>

            <button
                type="submit"
                class="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--brand-red)] px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                :disabled="sending || sent"
            >
              <span v-if="!sending && !sent">Solicitar información</span>
              <span v-else-if="sending">Enviando…</span>
              <span v-else>¡Enviado!</span>
            </button>

            <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
            <p v-if="sent" class="text-sm text-green-700">
              Gracias. Hemos recibido tu mensaje y te contactaremos muy pronto.
            </p>
          </form>

          <!-- Datos alternativos -->
          <div class="mt-6 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
            También puedes escribirnos a
            <a href="mailto:info@meditrade.es" class="font-medium text-[var(--brand-red)] underline underline-offset-4">
              info@meditrade.es
            </a>
            o llamarnos al
            <a href="tel:+34976794320" class="font-medium text-[var(--brand-red)] underline underline-offset-4">
              976 79 43 20
            </a>.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* sin css extra */
</style>
