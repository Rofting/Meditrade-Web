/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// Nuestras declaraciones de Swiper que añadimos antes:
declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/effect-fade';