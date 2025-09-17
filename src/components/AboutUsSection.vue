<script setup lang="ts">
// De nuevo, un componente puramente visual.
// La lógica (si la hubiera) iría aquí.
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">

      <div class="grid md:grid-cols-2 gap-12 items-center">

        <div>
          <img
              src="/images/logo-bueno.webp"
              alt="Logo Meditrade"
              class="rounded-lg shadow-xl w-full"
          >
        </div>

        <div class="mt-8 md:mt-0">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Administrador de fincas
          </h2>
          <p class="text-gray-600 text-lg leading-relaxed mb-6">
            Nuestro equipo de profesionales es una combinación entre experiencia y dedicación para poder ofrecer una gestión cercana y eficiente. Estamos muy comprometidos para cuidar de tu comunidad, facilitando soluciones que garantizan tranquilidad y bienestar.
          </p>
          <a
              href="services.html"
              class="inline-block bg-blue-600 text-white font-bold text-lg
                   py-3 px-10 rounded-full uppercase tracking-wider
                   hover:bg-blue-700 transition-colors duration-300
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            VER SERVICIOS
          </a>
        </div>
      </div> <div class="mt-20">
      <div class="grid md:grid-cols-3 gap-10">

        <div class="text-center md:text-left">
          <h3 class="text-2xl font-semibold text-gray-900 mb-3">
            AGILIDAD
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Nuestro equipo le atiende 365 días al año para resolver las incidencias en el menor tiempo posible, controlando presupuestos y funciones de los gremios.
          </p>
        </div>

        <div class="text-center md:text-left">
          <h3 class="text-2xl font-semibold text-gray-900 mb-3">
            SERVICIO
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Más de 30 años de experiencia y conocimiento del mercado nos avalan, velamos por el buen estado de la Comunidad tanto frente a incidencias como renegociando las mejores condiciones contractuales.
          </p>
        </div>

        <div class="text-center md:text-left">
          <h3 class="text-2xl font-semibold text-gray-900 mb-3">
            TRANSPARENCIA
          </h3>
          <p class="text-gray-600 leading-relaxed">
            La honestidad garantiza nuestra profesionalidad y reputación. Siempre en contacto con las Juntas de Gobierno y a disposición de los propietarios.
          </p>
        </div>

      </div>
    </div> </div>
  </section>
</template>

<style scoped>
/* ¡Seguimos sin necesitar CSS personalizado! */
</style>