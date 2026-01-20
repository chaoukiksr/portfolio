<template>
  <div class="project space-y-16">
      <!-- Project 1 -->
      <div class="  border-b border-gray-200 pb-16">
         <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
               <h3 class="text-2xl font-semibold text-gray-700 mb-2">{{ props.title }}</h3>
               <p class="text-gray-400 text-sm tracking-wider mb-4">{{props.date}}</p>
            </div>
            <div>
               <p class="text-gray-600 mb-6"> {{props.description}}</p>
            </div>
         </div>

         <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-6">
               <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2 tracking-wider">  PROBLEM IT SOLVES</h4>
                  <p class="text-gray-600 text-sm"> {{ props.Problem }}</p>
               </div>

               <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2 tracking-wider"> KEY FEATURES</h4>
                  <ul class="text-gray-600 text-sm space-y-1">
                     <li v-for="f in props.features">• {{ f }}</li>
                  </ul>
               </div>
               <div class="flex flex-wrap gap-2">
                  <span v-for="t in props.stack" class="bg-gray-200 text-gray-600 px-4 py-2 rounded text-sm">{{t}}</span>
               </div>
            </div>
            </div>
            </div>
   </div>
</template>

<script setup>
   const props = defineProps({
      title:{
         type:String
      },
      Problem:{
         type:String
      },
      description:{
         type:String,
      },
      features:{
         type:Array
      },
      stack:{
         type:Array
      },
      date:{
         type:String
      }
   })
</script>