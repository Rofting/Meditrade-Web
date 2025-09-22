import { ref } from 'vue'

const STORAGE_KEY = 'theme' // 'light' | 'dark' | 'system'
export const mode = ref<'light'|'dark'|'system'>('system')
export const isDark = ref(false)

function apply(isDarkNow: boolean) {
    isDark.value = isDarkNow
    const root = document.documentElement
    root.classList.toggle('dark', isDarkNow)
    root.style.colorScheme = isDarkNow ? 'dark' : 'light'
}

export function initColorMode() {
    if (typeof window === 'undefined') return
    const saved = (localStorage.getItem(STORAGE_KEY) as 'light'|'dark'|'system'|null) ?? 'system'
    mode.value = saved
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const compute = () => apply(saved === 'system' ? mq.matches : saved === 'dark')
    compute()
    mq.addEventListener?.('change', compute)
}

export function setMode(next: 'light'|'dark'|'system') {
    mode.value = next
    localStorage.setItem(STORAGE_KEY, next)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    apply(next === 'system' ? mq.matches : next === 'dark')
}

export function toggleDark() {
    setMode(isDark.value ? 'light' : 'dark')
}
