// src/composables/useScrollAnimation.ts
import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'

export type UseScrollAnimationOptions = {
    threshold?: number | number[]
    root?: Element | null
    rootMargin?: string
    /** Si true, se queda visible una vez intersecta; si false, alterna visible/oculto */
    once?: boolean
}

export function useScrollAnimation(opts: UseScrollAnimationOptions = {}) {
    const {
        threshold = 0.1,
        root = null,
        rootMargin = '0px',
        once = true,
    } = opts

    const target: Ref<HTMLElement | null> = ref(null)
    const isVisible = ref(false)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

        // Si no hay IO o el usuario prefiere menos movimiento: sin animación
        if (prefersReduced || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            isVisible.value = true
            return
        }

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible.value = true
                    if (once && observer && target.value) observer.unobserve(target.value)
                } else if (!once) {
                    isVisible.value = false
                }
            },
            { threshold, root, rootMargin },
        )

        if (target.value) observer.observe(target.value)
    })

    onBeforeUnmount(() => {
        observer?.disconnect()
        observer = null
    })

    // Clases performantes (opacity/transform)
    const animationClasses = computed(() => [
        'transition-all duration-700 ease-out will-change-transform',
        isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
    ])

    return { target, isVisible, animationClasses }
}
