<script setup lang="ts">
import { reactive, ref } from 'vue'

const BRAND_RED = '#E1353B'

type FormData = {
  name: string
  email: string
  message: string
  privacy: boolean
  website?: string   // honeypot anti-spam
}
const form = reactive<FormData>({
  name: '',
  email: '',
  message: '',
  privacy: false,
  website: '',
})

const sending = ref(false)
const sent = ref(false)
const errorMsg = ref<string | null>(null)

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

async function onSubmit() {
  errorMsg.value = null
  if (form.website) return // honeypot: si está relleno, ignorar

  if (!form.name || !validateEmail(form.email) || !form.message || !form.privacy) {
    errorMsg.value = 'Revisa los campos: nombre, email, mensaje y acepta la privacidad.'
    return
  }

  sending.value = true
  try {
    // Llama a tu función serverless (ver sección 2)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
    if (!res.ok) throw new Error('No se pudo enviar el mensaje')
    sent.value = true
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Ha ocurrido un error al enviar el mensaje.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero pequeño -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="h-title text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Contacto</h1>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Estamos en <strong>Pº de la Independencia, 8, 6ª E · 50004, Zaragoza</strong>.
          Escríbenos y te responderemos lo antes posible.
        </p>
      </div>
    </section>

    <!-- Mapa + Datos + Form -->
    <section class="container-default py-10">
      <div class="grid gap-10 lg:grid-cols-2">
        <!-- Columna izquierda: mapa + datos -->
        <div class="space-y-6">
          <iframe
              class="w-full h-72 rounded-2xl"
              style="border:0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Mapa de Meditrade del Ebro S.L. en Zaragoza"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.202112562873!2d-0.8846871231993677!3d41.65137497957808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914c2d5ef1743%3A0x30a32ff018b18645!2sMeditrade%20del%20Ebro%20S.L.!5e0!3m2!1ses!2ses!4v1727861157307!5m2!1ses!2ses"
          ></iframe>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-neutral-200 bg-white p-5">
              <p class="text-sm text-neutral-500">Dirección</p>
              <p class="mt-1 font-medium">
                Pº de la Independencia, 8, 6ª E<br>50004 Zaragoza
              </p>
            </div>
            <div class="rounded-2xl border border-neutral-200 bg-white p-5">
              <p class="text-sm text-neutral-500">Contacto</p>
              <p class="mt-1 font-medium">
                <a href="tel:+34976794320" class="underline underline-offset-4">976 79 43 20</a><br>
                <a href="mailto:info@meditrade.es" class="underline underline-offset-4">info@meditrade.es</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Formulario -->
        <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <form @submit.prevent="onSubmit" class="grid gap-4" novalidate>
            <!-- Honeypot -->
            <input v-model="form.website" type="text" class="hidden" tabindex="-1" autocomplete="off">

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
                  rows="5"
                  required
                  name="message"
                  class="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
                  placeholder="Cuéntanos brevemente tu caso (nº de viviendas, necesidades, etc.)"
              ></textarea>
            </label>

            <label class="mt-1 flex items-start gap-2 text-sm">
              <input v-model="form.privacy" type="checkbox" required class="mt-1">
              <span>Acepto la <a href="/privacidad" class="underline">política de privacidad</a>.</span>
            </label>

            <button
                type="submit"
                class="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--brand-red)] px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                :disabled="sending || sent"
            >
              <span v-if="!sending && !sent">Enviar</span>
              <span v-else-if="sending">Enviando…</span>
              <span v-else>¡Enviado!</span>
            </button>

            <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
            <p v-if="sent" class="text-sm text-green-700">
              Gracias. Hemos recibido tu mensaje y te contactaremos muy pronto.
            </p>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* sin CSS extra */
</style>
