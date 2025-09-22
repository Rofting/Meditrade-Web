<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import FloatingButton from './components/FloatingButton.vue'
import ConsentBanner from './components/ConsentBanner.vue'
</script>

<template>
  <div class="app-container">
    <!-- Skip link accesible -->
    <a href="#content" class="skip-link">Saltar al contenido</a>

    <Navbar />

    <main id="content" class="min-h-[70vh]">
      <RouterView />
    </main>

    <Footer />
    <FloatingButton />
    <ConsentBanner />
  </div>
</template>

<style scoped>
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
