import type { Directive } from 'vue'

type Dir = 'up'|'down'|'left'|'right'|'zoom'|'fade'

export const reveal: Directive<HTMLElement, Dir | undefined> = {
    mounted(el, binding) {
        const dir = binding.value || 'up'
        const reduced = typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

        // Estado inicial (sin animar si reduced)
        el.classList.add('reveal-init')
        el.dataset.reveal = dir
        if (reduced) {
            el.classList.remove('reveal-init')
            el.classList.add('reveal-in')
            return
        }

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add('reveal-in')
                el.classList.remove('reveal-init')
                io.disconnect()
            }
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 })

        io.observe(el)
    },
}
