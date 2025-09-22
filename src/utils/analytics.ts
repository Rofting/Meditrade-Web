// src/utils/analytics.ts
import type { Router } from 'vue-router'

declare global {
    interface Window {
        plausible?: (event: string, opts?: any) => void
        __analyticsReady?: boolean
    }
}

const KEY = 'analytics_consent' // 'granted' | 'denied'

export function hasConsent() {
    return typeof localStorage !== 'undefined' && localStorage.getItem(KEY) === 'granted'
}
export function grantConsent() {
    try { localStorage.setItem(KEY, 'granted') } catch {}
}
export function denyConsent() {
    try { localStorage.setItem(KEY, 'denied') } catch {}
}

export function loadPlausible(domain: string) {
    if (typeof document === 'undefined' || window.__analyticsReady) return
    const s = document.createElement('script')
    s.defer = true
    s.setAttribute('data-domain', domain)
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
    window.__analyticsReady = true
}

export function initAnalytics(router: Router, domain: string) {
    if (!hasConsent()) return
    loadPlausible(domain)
    // SPA pageviews
    router.afterEach(() => { window.plausible && window.plausible('pageview') })
}
