import { onMounted, onBeforeUnmount, ref } from 'vue'

export function useScrollSpy(ids: string[], offset = 96) {
    const activeId = ref<string | null>(null)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const options = { root: null, rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0, 0.2, 1] }
        observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
            if (visible?.target?.id) activeId.value = visible.target.id
        }, options)

        ids.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer!.observe(el)
        })
    })

    onBeforeUnmount(() => observer?.disconnect())
    return { activeId }
}
