<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-gray-400 py-16">
    <div class="container mx-auto px-4">

      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

        <div class="md:col-span-1"> <img
            src="/images/logo-web1.png"
            alt="Logo Meditrade"
            class="h-10 w-auto mb-6"
        >
          <h4 class="font-semibold text-white text-lg mb-3">SÍGUENOS</h4>
          <div class="space-y-2">
            <a
                href="https://es.linkedin.com/company/meditrade-del-ebro-sl"
                class="hover:text-white transition-colors"
                target="_blank" rel="noopener noreferrer"
            >
              @meditradedelebro (LinkedIn)
            </a>
            <a
                href="https://www.instagram.com/meditradeebro/"
                class="block hover:text-white transition-colors"
                target="_blank" rel="noopener noreferrer"
            >
              @meditradeebro (Instagram)
            </a>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 class="font-semibold text-white text-lg mb-4">Contacto</h4>
          <div class="space-y-2">
            <p>Teléfono: 976794320</p>
            <p>Email: info@meditrade.es</p>
          </div>

          <h4 class="font-semibold text-white text-lg mb-4 mt-8">Legal</h4>
          <div class="space-y-2">
            <a href="legal.html" class="block hover:text-white transition-colors">Aviso Legal</a>
            <a href="privacidad.html" class="block hover:text-white transition-colors">Política de privacidad</a>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 class="font-semibold text-white text-lg mb-4">Menú</h4>
          <div class="space-y-2">
            <a href="inicio.html" class="block hover:text-white transition-colors">Inicio</a>
            <a href="about-us.html" class="block hover:text-white transition-colors">Conócenos</a>
            <a href="services.html" class="block hover:text-white transition-colors">Servicios</a>
            <a href="propietarios.html" class="block hover:text-white transition-colors">Propietarios</a>
            <a href="blog.html" class="block hover:text-white transition-colors">Blog</a>
          </div>
        </div>

        <div class="md:col-span-1">
          <h4 class="font-semibold text-white text-lg mb-4">Ubicación</h4>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.202112562873!2d-0.8846871231993677!3d41.65137497957808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914c2d5ef1743%3A0x30a32ff018b18645!2sMeditrade%20del%20Ebro%20S.L.!5e0!3m2!1ses!2ses!4v1727861157307!5m2!1ses!2ses"
              class="w-full h-48 rounded-lg"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div> <div class="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
      <p>&copy; {{ currentYear }} Meditrade. Todos los derechos reservados.</p>
    </div>

    </div>
  </footer>
</template>

<style scoped>
/* ¡Tampoco necesitamos CSS aquí! */
</style>