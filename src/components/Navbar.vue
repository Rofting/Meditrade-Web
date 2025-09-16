<script setup lang="ts">
// En el futuro, aquí puedes añadir lógica,
// como saber qué link está "activo"
// o si el usuario ha iniciado sesión.
</script>

<template>
  <header class="navbar-header">
    <nav class="navbar-container">

      <div class="navbar-logo">
        <a href="/">Meditrade</a>
      </div>

      <ul class="navbar-links">
        <li><a href="/" class="nav-link active">Inicio</a></li>
        <li><a href="/productos" class="nav-link">Productos</a></li>
        <li><a href="/nosotros" class="nav-link">Nosotros</a></li>
        <li><a href="/contacto" class="nav-link">Contacto</a></li>
      </ul>

      <div class="navbar-actions">
        <button class="cta-button">Iniciar Sesión</button>
      </div>

    </nav>
  </header>
</template>

<style scoped>
/*
 * 'scoped' es crucial.
 * Asegura que estos estilos SOLO se aplican a este componente Navbar
 * y no afectarán a ninguna otra parte de tu sitio web.
 */

.navbar-header {
  background-color: #ffffff; /* Fondo blanco */
  border-bottom: 1px solid #e0e0e0; /* Línea gris sutil abajo */
  padding: 1rem 2rem; /* Espaciado interno (arriba/abajo, izquierda/derecha) */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra suave */
}

.navbar-container {
  display: flex;
  justify-content: space-between; /* Espacia los elementos: logo | links | actions */
  align-items: center; /* Centra todo verticalmente */
  max-width: 1200px; /* Ancho máximo para pantallas grandes */
  margin: 0 auto; /* Centra el contenedor */
}

/* --- Logo --- */
.navbar-logo a {
  font-size: 1.5rem; /* Tamaño de letra grande */
  font-weight: 700; /* Negrita */
  color: #333; /* Color de texto oscuro */
  text-decoration: none; /* Sin subrayado */
}

/* --- Links de Navegación --- */
.navbar-links {
  display: flex;
  list-style: none; /* Quita los puntos de la lista */
  margin: 0;
  padding: 0;
  gap: 2rem; /* Espacio entre cada enlace */
}

.nav-link {
  color: #555; /* Color de enlace gris oscuro */
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500; /* Semi-negrita */
  transition: color 0.3s ease; /* Transición suave al pasar el ratón */
}

.nav-link:hover {
  color: #007bff; /* Color azul al pasar el ratón */
}

/* Estilo para el enlace "activo" */
.nav-link.active {
  color: #007bff;
  font-weight: 700;
}

/* --- Botón de Acción --- */
.cta-button {
  background-color: #007bff; /* Fondo azul */
  color: white; /* Texto blanco */
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 6px; /* Bordes redondeados */
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el ratón */
}
</style>