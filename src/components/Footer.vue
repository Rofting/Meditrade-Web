<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
const phoneDisplay = '976 79 43 20'
const phoneHref = '+34976794320'

// Color de marca principal (rojo)
const BRAND_RED = '#E1353B'
</script>

<template>
  <!-- Fondo suave; acentos en rojo corporativo -->
  <footer class="text-neutral-700 bg-[#eef3f9]" :style="{ '--brand-red': BRAND_RED }">
    <h2 class="sr-only">Pie de página</h2>

    <!-- Sección principal -->
    <div class="container-default py-16">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-4">
        <!-- Columna 1: Marca + Social -->
        <div>
          <img
              src="/images/logo-web1.webp"
              alt="Meditrade del Ebro — Logotipo"
              class="h-10 w-auto mb-6"
          />
          <p class="text-sm text-neutral-600">
            <strong>Meditrade del Ebro</strong>, Administradores de Fincas en Zaragoza.
            Gestión integral, transparencia y ahorro para tu comunidad.
          </p>

          <h3 class="mt-6 text-lg font-semibold text-[var(--brand-red)]">Síguenos</h3>
          <ul class="mt-3 space-y-2">
            <li>
              <a
                  href="https://es.linkedin.com/company/meditrade-del-ebro-sl"
                  target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 hover:text-[var(--brand-red)] transition-colors"
                  aria-label="Perfil de Meditrade del Ebro en LinkedIn (se abre en pestaña nueva)"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" style="fill: currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.75 2.6 4.75 6V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24h-4V8z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                  href="https://www.instagram.com/meditradeebro/"
                  target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 hover:text-[var(--brand-red)] transition-colors"
                  aria-label="Perfil de Meditrade del Ebro en Instagram (se abre en pestaña nueva)"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" style="fill: currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.4.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.3 1.2.4 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.3-2.4.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1 .1-1.6.2-1.9.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.2.9-.3 1.9-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.3 1.9.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.9.2 1.9.3 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 1.9-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.2-.9.3-1.9.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.3-1.9-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.9-.2-1.9-.3-1.2-.1-1.5-.1-4.7-.1zm0 3.2a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6zm0 11.2a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8zm5.6-11.7a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Columna 2: Contacto -->
        <div>
          <h3 class="text-lg font-semibold text-[var(--brand-red)]">Contacto</h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li><a :href="`tel:${phoneHref}`" class="hover:underline">Teléfono: {{ phoneDisplay }}</a></li>
            <li><a href="mailto:info@meditrade.es" class="hover:underline">Email: info@meditrade.es</a></li>
          </ul>

          <h3 class="mt-8 text-lg font-semibold text-[var(--brand-red)]">Legal</h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li><RouterLink to="/legal" class="hover:underline">Aviso legal</RouterLink></li>
            <li><RouterLink to="/privacidad" class="hover:underline">Política de privacidad</RouterLink></li>
          </ul>
        </div>

        <!-- Columna 3: Menú -->
        <div>
          <h3 class="text-lg font-semibold text-[var(--brand-red)]">Menú</h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li><RouterLink to="/" class="hover:underline">Inicio</RouterLink></li>
            <li><a href="/#nosotros" class="hover:underline">Conócenos</a></li>
            <li><a href="/#servicios" class="hover:underline">Servicios</a></li>
            <li><RouterLink to="/propietarios" class="hover:underline">Propietarios</RouterLink></li>
            <li><RouterLink to="/blog" class="hover:underline">Blog</RouterLink></li>
          </ul>
        </div>

        <!-- Columna 4: Ubicación -->
        <div>
          <h3 class="text-lg font-semibold text-[var(--brand-red)]">Ubicación</h3>
          <div class="mt-4 space-y-3">
            <iframe
                class="w-full h-48 rounded-lg"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa de Meditrade del Ebro S.L. en Zaragoza"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.202112562873!2d-0.8846871231993677!3d41.65137497957808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914c2d5ef1743%3A0x30a32ff018b18645!2sMeditrade%20del%20Ebro%20S.L.!5e0!3m2!1ses!2ses!4v1727861157307!5m2!1ses!2ses"
            ></iframe>

            <a
                href="https://maps.google.com/?q=Meditrade%20del%20Ebro%20S.L."
                target="_blank" rel="noopener noreferrer"
                class="inline-block text-sm underline underline-offset-4 text-[var(--brand-red)]"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t border-neutral-200">
      <div class="container-default py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p class="text-xs md:text-sm text-neutral-600">
          © {{ currentYear }} Meditrade del Ebro. Todos los derechos reservados.
        </p>
        <nav class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm">
          <RouterLink to="/privacidad" class="hover:underline">Privacidad</RouterLink>
          <RouterLink to="/legal" class="hover:underline">Términos</RouterLink>
          <a href="/#contacto" class="hover:underline">Contacto</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* sin CSS extra */
</style>
