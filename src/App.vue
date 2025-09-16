<script setup lang="ts">
import Navbar from './components/Navbar.vue'; // Pieza de arriba
import Footer from './components/Footer.vue'; // Pieza de abajo
</script>

<template>
  <div class="app-container">
    <Navbar />

    <main>
      <h2>Contenido del Home</h2>
      <p>Aquí es donde construiremos la página de inicio específica.</p>
    </main>

    <Footer />
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ocupa al menos el 100% de la altura de la pantalla */
}

main {
  flex: 1; /* Hace que el contenido principal crezca y ocupe el espacio */
  padding: 2rem;
}
</style>