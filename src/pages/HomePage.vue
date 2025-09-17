<!-- src/pages/HomePage.vue -->
<template>
  <!-- Hero -->
  <!-- Hero -->
  <section class="relative min-h-[80dvh] overflow-hidden">
    <HeroSlider />
  </section>


  <!-- Resto de secciones -->
  <div id="servicios" class="py-20 md:py-28">
    <ServicesSection />
  </div>

  <div id="nosotros" class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900/40">
    <AboutUsSection />
  </div>

  <div id="por-que" class="py-20 md:py-28">
    <WhyUsSection />
  </div>

  <div class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900/40">
    <VideoSection />
  </div>

  <div id="contacto" class="py-20 md:py-28">
    <CallToActionSection />
  </div>
</template>

<script setup lang="ts">
import HeroSlider from '../components/HeroSlider.vue'
import ServicesSection from '../components/ServicesSection.vue'
import AboutUsSection from '../components/AboutUsSection.vue'
import WhyUsSection from '../components/WhyUsSection.vue'
import VideoSection from '../components/VideoSection.vue'
import CallToActionSection from '../components/CallToActionSection.vue'
</script>
