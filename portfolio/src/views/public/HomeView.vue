<template>
   <body class="bg-gray-50 text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <WorkSection />
      <Contact />
      <Footer />
   </body>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue';
import Hero from '../../components/Hero.vue';
import About from '../../components/About.vue';
import WorkSection from '../../components/WorkSection.vue';
import Contact from '../../components/Contact.vue';
import Footer from '../../components/Footer.vue';
</script>