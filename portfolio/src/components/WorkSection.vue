<template>
   <section id="work" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-8">
         <h2 class="text-5xl font-bold text-gray-400 mb-16">Work</h2>
         <div class="space-y-12">
            <Work v-for="project in projects" :key="project.id" :title="project.title" :date="project.date"
               :description="project.description"
               :problem="project.problem"
               :features="project.features" :stack="project.stack" />

         </div>
      </div>
   </section>
</template>

<script setup>
import Work from './Work.vue';
import projectsData from '../data/projects.json'

const projects = projectsData
</script>
