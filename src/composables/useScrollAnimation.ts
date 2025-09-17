import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Exportamos nuestra nueva función "composable"
export function useScrollAnimation() {
    // 1. 'target' es el elemento del DOM que queremos observar
    const target = ref<any>(null)

    // 2. 'isVisible' rastrea si ya lo hemos visto
    const isVisible = ref(false)

    // 3. 'useIntersectionObserver' es la magia de @vueuse/core
    const { stop } = useIntersectionObserver(
        target,
        // 4. Callback que se dispara cuando cambia la visibilidad
        ([{ isIntersecting }]) => {
            // 5. 'isIntersecting' es true si el elemento está en pantalla
            if (isIntersecting) {
                isVisible.value = true // Lo marcamos como visible
                stop() // Y dejamos de observar (la animación es solo 1 vez)
            }
        },
        // 6. Opciones: se dispara cuando el 10% del elemento es visible
        { threshold: 0.1 }
    )

    // 7. Creamos las clases de Tailwind dinámicas
    const animationClasses = computed(() => [
        'transition-all duration-700 ease-out', // La transición
        isVisible.value
            ? 'opacity-100 translate-y-0' // Estado final (visible)
            : 'opacity-0 translate-y-10'  // Estado inicial (invisible y 10px abajo)
    ])

    // 8. Devolvemos las variables que el componente necesitará
    return {
        target,
        animationClasses
    }
}