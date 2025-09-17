import { createRouter, createWebHistory } from 'vue-router';

// 1. Importa la página que vamos a crear
// (No te preocupes si WebStorm lo marca en rojo, aún no la hemos creado)
import HomePage from '../pages/HomePage.vue';

// 2. Define las rutas
const routes = [
    {
        path: '/', // La URL raíz
        name: 'Home',
        component: HomePage, // El componente que se cargará
    },
    // (Aquí añadiremos '/conocenos', '/contacto', etc. en el futuro)
];

// 3. Crea la instancia del router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;