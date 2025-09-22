import type { Directive } from 'vue'
import router from '@/router'

function prefetch(to: string) {
    try {
        // Resuelve la ruta y toma el componente lazy del último match
        const match = router.resolve(to)
        const record = match.matched.at(-1)
        const comp = record?.components?.default
        if (typeof comp === 'function') {
            // Llama al import() para que Vite descargue el chunk
            (comp as () => void)()
        }
    } catch {}
}

export const prefetchRoute: Directive<HTMLElement, string> = {
    mounted(el, binding) {
        const to = binding.value
        if (!to) return
        const onEnter = () => prefetch(to)
        const onTouch = () => prefetch(to)  // móvil: primer tap
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('touchstart', onTouch, { passive: true })
        ;(el as any)._pf = { onEnter, onTouch }
    },
    unmounted(el) {
        const pf = (el as any)._pf
        if (!pf) return
        el.removeEventListener('mouseenter', pf.onEnter)
        el.removeEventListener('touchstart', pf.onTouch)
    }
}
