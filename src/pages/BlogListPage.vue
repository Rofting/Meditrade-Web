<script setup lang="ts">
import { computed, ref } from 'vue'
import { posts as ALL } from '../content/blog'

const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

const q = ref('')
const activeTag = ref<string>('')

const tags = computed(() => {
  const set = new Set<string>()
  ALL.forEach(p => p.tags.forEach(t => set.add(t)))
  return Array.from(set).sort()
})

const posts = computed(() => {
  const query = q.value.trim().toLowerCase()
  return ALL
      .filter(p => !activeTag.value || p.tags.includes(activeTag.value))
      .filter(p => !query || (p.title + p.excerpt).toLowerCase().includes(query))
      .sort((a,b) => b.date.localeCompare(a.date))
})
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Blog</h1>
        <p class="mt-3 max-w-2xl text-neutral-700">
          Ideas, consejos y experiencias para cuidar tu comunidad.
        </p>
      </div>
    </section>

    <!-- Filtros -->
    <section class="container-default py-8">
      <div class="flex flex-wrap items-center gap-3">
        <input
            v-model="q"
            type="search"
            placeholder="Buscar artículos…"
            class="w-full sm:w-80 rounded-xl border border-neutral-300 px-4 py-2"
        />
        <div class="flex flex-wrap gap-2">
          <button
              class="rounded-full border px-3 py-1.5 text-sm"
              :class="!activeTag ? 'border-neutral-900' : 'border-neutral-300 text-neutral-600'"
              @click="activeTag=''"
          >Todos</button>
          <button
              v-for="t in tags" :key="t"
              class="rounded-full border px-3 py-1.5 text-sm"
              :class="activeTag===t ? 'border-neutral-900' : 'border-neutral-300 text-neutral-600'"
              @click="activeTag=t"
          >{{ t }}</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
            v-for="p in posts" :key="p.slug"
            :to="`/blog/${p.slug}`"
            class="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition"
        >
          <img :src="BASE + p.cover" :alt="p.title" class="h-48 w-full object-cover">
          <div class="p-4">
            <div class="text-xs text-neutral-500">{{ new Date(p.date).toLocaleDateString() }}</div>
            <h3 class="mt-1 text-lg font-semibold group-hover:text-[var(--brand-red)]">{{ p.title }}</h3>
            <p class="mt-2 text-neutral-700 line-clamp-3">{{ p.excerpt }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="t in p.tags" :key="t" class="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">{{ t }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
