<template>
   <nav class="fixed top-0 w-full bg-white shadow-sm z-50">
   <div class="max-w-6xl mx-auto px-8 py-6">
      <div class="flex justify-center space-x-12 text-sm font-medium tracking-widest">
         <a href="#hero" class="hover:text-gray-600 transition">CV</a>
         <a href="#about" class="hover:text-gray-600 transition">ABOUT</a>
         <a href="#work" class="hover:text-gray-600 transition">WORK</a>
         <a href="#contact" class="hover:text-gray-600 transition">CONTACT</a>
      </div>
   </div>
   </nav>

</template>


<script setup>
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

</script>