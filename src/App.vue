<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import FloatingButton from './components/FloatingButton.vue';
</script>

<template>
  <div class="app-container">
    <a href="#content" class="skip-link">Saltar al contenido</a>
    <Navbar />

    <main id="content" class="min-h-[70vh]">
      <router-view />
    </main>

    <Footer />
    <FloatingButton />
  </div>
</template>

<style scoped>
/* 3. Los estilos del layout SÍ se quedan aquí.
*/
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 0;
}
</style>