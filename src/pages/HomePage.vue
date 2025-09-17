<script setup lang="ts">
// 1. Importamos TODAS las secciones de la página de inicio
import HeroSlider from '../components/HeroSlider.vue';
import VideoSection from '../components/VideoSection.vue';
import AboutUsSection from '../components/AboutUsSection.vue';
import WhyUsSection from '../components/WhyUsSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
import CallToActionSection from '../components/CallToActionSection.vue';
</script>

<template>
  <HeroSlider />
  <VideoSection />
  <AboutUsSection />
  <WhyUsSection />
  <ServicesSection />
  <CallToActionSection />
</template>

<style scoped>
/* No se necesita CSS aquí */
</style>