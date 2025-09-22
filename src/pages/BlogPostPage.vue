<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts } from '@/content/blog' // si tu archivo es blogs.ts, cambia a '@/content/blogs'
import { setSeo } from '@/utils/seo'
import { setJsonLd, articleSchema, breadcrumbSchema } from '@/utils/ldjson'

const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const post = computed(() => posts.find(p => p.slug === slug.value))
if (!post.value) {
  router.replace('/blog')
}

// SEO por post (title/description/OG/canonical)
watchEffect(() => {
  if (!post.value) return
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  setSeo({
    title: post.value.title,
    description: post.value.excerpt,
    image: post.value.cover, // setSeo la hace absoluta si es relativa
    type: 'article',
    canonical: `${origin}/blog/${post.value.slug}`,
  })
})

// JSON-LD Article + Breadcrumbs
watchEffect(() => {
  if (!post.value) return
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = `${origin}/blog/${post.value.slug}`

  setJsonLd(
      'article',
      articleSchema({
        title: post.value.title,
        description: post.value.excerpt,
        url,
        image: post.value.cover?.startsWith('http') ? post.value.cover : origin + '/' + post.value.cover,
        date: post.value.date,
      })
  )

  setJsonLd(
      'breadcrumb',
      breadcrumbSchema([
        { name: 'Inicio', url: `${origin}/` },
        { name: 'Blog', url: `${origin}/blog` },
        { name: post.value.title, url },
      ])
  )
})

// Navegación prev/next
const idx = computed(() => posts.findIndex(p => p.slug === slug.value))
const prev = computed(() => (idx.value > 0 ? posts[idx.value - 1] : null))
const next = computed(() => (idx.value < posts.length - 1 ? posts[idx.value + 1] : null))
</script>

<template>
  <main v-if="post" :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-10 md:py-14">
        <div class="text-sm text-neutral-500">
          {{ new Date(post.date).toLocaleDateString() }}
        </div>
        <h1 class="mt-1 text-3xl md:text-4xl font-bold text-[var(--brand-red)]">
          {{ post.title }}
        </h1>
      </div>
    </section>

    <!-- Cover -->
    <div class="container-default">
      <img
          :src="(post.cover?.startsWith('http') ? post.cover : BASE + post.cover)"
          :alt="post.title"
          class="mt-6 w-full max-h-[480px] object-cover rounded-2xl border border-neutral-200"
          loading="eager"
          fetchpriority="high"
          decoding="async"
      >
    </div>

    <!-- Body -->
    <section class="container-default py-10">
      <article
          class="prose max-w-none prose-p:leading-relaxed prose-li:leading-relaxed"
          v-html="post.body"
      ></article>

      <!-- Tags -->
      <div class="mt-8 flex flex-wrap gap-2">
        <span
            v-for="t in post.tags"
            :key="t"
            class="rounded-full bg-neutral-100 px-2 py-0.5 text-xs"
        >{{ t }}</span>
      </div>

      <!-- Navegación -->
      <div class="mt-10 flex justify-between gap-3">
        <RouterLink
            v-if="prev"
            :to="`/blog/${prev.slug}`"
            class="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
        >← {{ prev.title }}</RouterLink>

        <span class="flex-1"></span>

        <RouterLink
            v-if="next"
            :to="`/blog/${next.slug}`"
            class="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
        >{{ next.title }} →</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.prose :where(h2){margin-top:1.25rem;margin-bottom:.5rem}
.prose :where(h3){margin-top:.75rem;margin-bottom:.25rem}
</style>
