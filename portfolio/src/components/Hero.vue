<template>
  <section id="hero" class="min-h-screen flex items-center pt-20">
      <div class="max-w-6xl mx-auto px-8 w-full">
         <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h1 class="text-6xl md:text-7xl font-bold text-gray-400 mb-8">
                  Hello<br>I'm Chaouki<br>KESSOURI
               </h1>
               <div class="flex space-x-6 text-xs tracking-widest mb-8">
                  <span> <a href="https://github.com/chaoukiksr/">GITHUB.</a></span>
                  <span><a href="www.linkedin.com/in/kessouri-chaouki-5935b6225">LINKEDIN.</a></span>
                  
               </div>
               <a href="/Kessouri_Chaouki_CV (2).pdf" download 
                  class="inline-block bg-green-200 text-gray-700 px-8 py-4 tracking-widest text-sm font-medium hover:bg-green-300 transition">
                  DOWNLOAD CV
               </a>
            </div>
            <div>
               <img src="../assets/imgs/image.png"
                  alt="Profile" class="w-full h-auto rounded-lg shadow-lg">
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
   
</script>
<style scoped>
      img {
         width: 600;
         height: 700px;
         max-width: fit-content;
         max-height: fit-content;
      }
</style>