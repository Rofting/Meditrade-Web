<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <p>&copy; {{ currentYear }} Mi Empresa. Todos los derechos reservados.</p>
    <ul class="footer-links">
      <li><a href="/privacy">Política de Privacidad</a></li>
      <li><a href="/terms">Términos de Servicio</a></li>
    </ul>
  </footer>
</template>

<style scoped>
/* De nuevo, 'scoped' asegura que estos estilos
SOLO se aplican al Footer. No pueden "escaparse"
y romper otros estilos de tu web.
*/
.site-footer {
  background-color: #222;
  color: #aaa;
  padding: 2rem 1rem;
  text-align: center;
  margin-top: auto; /* Esto ayuda a "empujarlo" al fondo */
}

.footer-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>