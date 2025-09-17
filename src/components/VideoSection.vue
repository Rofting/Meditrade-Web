<script setup lang="ts">
// Este componente es solo visual, así que no necesita lógica de script.
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 text-center">

      <video
          class="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          loop
          muted
          autoplay
          playsinline
      >
        <source src="/images/video web.mp4" type="video/mp4">
        Tu navegador no soporta el tag de vídeo.
      </video>

      <div class="mt-10"> <a
          href="contact.html"
          class="inline-block bg-blue-600 text-white font-bold text-lg
                 py-3 px-10 rounded-full uppercase tracking-wider
                 hover:bg-blue-700 transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        CONTÁCTANOS
      </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ¡No necesitamos CSS! Tailwind se encarga de todo. */
</style>