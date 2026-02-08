<template>
   <div class="min-h-screen bg-gray-50">
      <!-- Dashboard Navbar -->
      <nav class="fixed top-0 w-full bg-white shadow-sm z-50">
         <div class="max-w-6xl mx-auto px-8 py-6">
            <div class="flex justify-between items-center">
               <h1 class="text-xl font-semibold text-gray-700 tracking-wider">DASHBOARD</h1>
               <div class="flex space-x-8 text-sm font-medium tracking-widest">
                  <a href="#stats" class="hover:text-gray-600 transition">STATS</a>
                  <a href="#projects" class="hover:text-gray-600 transition">PROJECTS</a>
                  <a href="/" class="hover:text-gray-600 transition">VIEW SITE</a>
                  <button @click="handleLogout" class="text-red-500 hover:text-red-600 transition">LOGOUT</button>
               </div>
            </div>
         </div>
      </nav>

      <!-- Main Content -->
      <main class="pt-28 pb-20">
         <div class="max-w-6xl mx-auto px-8">

            <!-- Stats Section -->
            <section id="stats" class="mb-20">
               <h2 class="text-5xl font-bold text-gray-400 mb-16">Stats</h2>
               <div class="grid md:grid-cols-3 gap-8">
                  <!-- Stat Card 1 -->
                  <div class="bg-white border-b border-gray-200 p-8">
                     <p class="text-sm font-semibold text-gray-700 tracking-wider mb-2">TOTAL PROJECTS</p>
                     <p class="text-5xl font-bold text-gray-700">{{ stats.totalProjects }}</p>
                     <p class="text-gray-400 text-sm mt-2">Published works</p>
                  </div>
                  <!-- Stat Card 2 -->
                  <div class="bg-white border-b border-gray-200 p-8">
                     <p class="text-sm font-semibold text-gray-700 tracking-wider mb-2">PORTFOLIO VIEWS</p>
                     <p class="text-5xl font-bold text-gray-700">{{ stats.totalViews }}</p>
                     <p class="text-gray-400 text-sm mt-2">This month</p>
                  </div>
                  <!-- Stat Card 3 -->
                  <div class="bg-white border-b border-gray-200 p-8">
                     <p class="text-sm font-semibold text-gray-700 tracking-wider mb-2">MESSAGES</p>
                     <p class="text-5xl font-bold text-gray-700">{{ stats.messagesReceived }}</p>
                     <p class="text-gray-400 text-sm mt-2">Contact submissions</p>
                  </div>
               </div>

               <!-- Technologies Chart -->
               <div class="mt-12 bg-white border-b border-gray-200 p-8">
                  <h4 class="text-sm font-semibold text-gray-700 tracking-wider mb-6">TECHNOLOGIES USED</h4>
                  <div class="space-y-4">
                     <div v-for="tech in topTechnologies" :key="tech.name" class="flex items-center gap-4">
                        <span class="text-gray-600 text-sm w-24">{{ tech.name }}</span>
                        <div class="flex-1 bg-gray-100 rounded h-3">
                           <div 
                              class="bg-green-100 h-3 rounded" 
                              :style="{ width: tech.percentage + '%' }"
                           ></div>
                        </div>
                        <span class="text-gray-400 text-sm w-16">{{ tech.count }} uses</span>
                     </div>
                  </div>
               </div>
            </section>

            <!-- Projects Management Section -->
            <section id="projects">
               <div class="flex justify-between items-center mb-16">
                  <h2 class="text-5xl font-bold text-gray-400">Projects</h2>
                  <button 
                     @click="showAddModal = true"
                     class="bg-green-100 text-gray-700 px-6 py-3 text-sm font-semibold tracking-wider hover:bg-green-200 transition"
                  >
                     + ADD PROJECT
                  </button>
               </div>

               <!-- Projects List -->
               <div class="space-y-12">
                  <div 
                     v-for="project in projects" 
                     :key="project.id" 
                     class="border-b border-gray-200 pb-12"
                  >
                     <div class="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                           <h3 class="text-2xl font-semibold text-gray-700 mb-2">{{ project.title }}</h3>
                           <p class="text-gray-400 text-sm tracking-wider">{{ project.date }}</p>
                        </div>
                        <div class="flex justify-end items-start gap-4">
                           <button 
                              @click="editProject(project)"
                              class="text-sm font-medium tracking-wider text-gray-600 hover:text-gray-900 transition"
                           >
                              EDIT
                           </button>
                           <button 
                              @click="deleteProject(project.id)"
                              class="text-sm font-medium tracking-wider text-red-500 hover:text-red-600 transition"
                           >
                              DELETE
                           </button>
                        </div>
                     </div>

                     <p class="text-gray-600 mb-6">{{ project.description }}</p>

                     <div class="flex flex-wrap gap-2">
                        <span 
                           v-for="tech in project.stack" 
                           :key="tech"
                           class="bg-green-100 text-gray-600 px-4 py-2 rounded text-sm"
                        >
                           {{ tech }}
                        </span>
                     </div>
                  </div>
               </div>

               <!-- Empty State -->
               <div v-if="projects.length === 0" class="text-center py-20">
                  <p class="text-gray-400 text-lg">No projects yet</p>
                  <p class="text-gray-400 text-sm mt-2">Click "ADD PROJECT" to create your first one</p>
               </div>
            </section>
         </div>
      </main>

      <!-- Add/Edit Project Modal -->
      <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
         <div class="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="p-8">
               <h3 class="text-2xl font-semibold text-gray-700 mb-8">
                  {{ showEditModal ? 'Edit Project' : 'Add New Project' }}
               </h3>

               <form @submit.prevent="saveProject" class="space-y-6">
                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">TITLE</label>
                     <input 
                        v-model="form.title"
                        type="text" 
                        required
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="Project title"
                     />
                  </div>

                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">DATE</label>
                     <input 
                        v-model="form.date"
                        type="text" 
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="e.g., MARCH - JUNE • 2023"
                     />
                  </div>

                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">DESCRIPTION</label>
                     <textarea 
                        v-model="form.description"
                        rows="3"
                        required
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="Brief description of the project"
                     ></textarea>
                  </div>

                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">PROBLEM IT SOLVES</label>
                     <textarea 
                        v-model="form.problem"
                        rows="2"
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="What problem does this project solve?"
                     ></textarea>
                  </div>

                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">KEY FEATURES</label>
                     <textarea 
                        v-model="form.featuresText"
                        rows="4"
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="One feature per line"
                     ></textarea>
                     <p class="text-gray-400 text-xs mt-1">Enter each feature on a new line</p>
                  </div>

                  <div>
                     <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">TECH STACK</label>
                     <input 
                        v-model="form.stackText"
                        type="text"
                        class="w-full border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:border-gray-400"
                        placeholder="Vue.js, Node.js, MongoDB"
                     />
                     <p class="text-gray-400 text-xs mt-1">Separate technologies with commas</p>
                  </div>

                  <div class="flex gap-4 pt-4">
                     <button 
                        type="submit"
                        class="flex-1 bg-green-100 text-gray-700 py-3 text-sm font-semibold tracking-wider hover:bg-green-200 transition"
                     >
                        {{ showEditModal ? 'UPDATE PROJECT' : 'CREATE PROJECT' }}
                     </button>
                     <button 
                        type="button"
                        @click="closeModal"
                        class="flex-1 border border-gray-200 text-gray-700 py-3 text-sm font-semibold tracking-wider hover:bg-gray-50 transition"
                     >
                        CANCEL
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const projects = ref([])
const stats = ref({
   totalProjects: 0,
   totalViews: 124,
   messagesReceived: 8
})

const showAddModal = ref(false)
const showEditModal = ref(false)
const editingId = ref(null)

const form = ref({
   title: '',
   date: '',
   description: '',
   problem: '',
   featuresText: '',
   stackText: ''
})

// Computed
const topTechnologies = computed(() => {
   const techCount = {}
   
   projects.value.forEach(project => {
      project.stack?.forEach(tech => {
         techCount[tech] = (techCount[tech] || 0) + 1
      })
   })
   
   const sorted = Object.entries(techCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
   
   const maxCount = sorted[0]?.[1] || 1
   
   return sorted.map(([name, count]) => ({
      name,
      count,
      percentage: (count / maxCount) * 100
   }))
})

// Methods
async function fetchProjects() {
   try {
      const response = await fetch('/api/projects')
      if (response.ok) {
         projects.value = await response.json()
         stats.value.totalProjects = projects.value.length
      }
   } catch (error) {
      console.error('Failed to fetch projects:', error)
   }
}

function editProject(project) {
   editingId.value = project.id
   form.value = {
      title: project.title || '',
      date: project.date || '',
      description: project.description || '',
      problem: project.problem || '',
      featuresText: project.features?.join('\n') || '',
      stackText: project.stack?.join(', ') || ''
   }
   showEditModal.value = true
}

async function saveProject() {
   const projectData = {
      title: form.value.title,
      date: form.value.date,
      description: form.value.description,
      problem: form.value.problem,
      features: form.value.featuresText.split('\n').map(f => f.trim()).filter(Boolean),
      stack: form.value.stackText.split(',').map(t => t.trim()).filter(Boolean)
   }

   try {
      const url = showEditModal.value 
         ? `/api/projects/${editingId.value}` 
         : '/api/projects'
      
      const method = showEditModal.value ? 'PUT' : 'POST'

      const response = await fetch(url, {
         method,
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
         },
         body: JSON.stringify(projectData)
      })

      if (response.ok) {
         await fetchProjects()
         closeModal()
      }
   } catch (error) {
      console.error('Failed to save project:', error)
   }
}

async function deleteProject(id) {
   if (!confirm('Are you sure you want to delete this project?')) return

   try {
      const response = await fetch(`/api/projects/${id}`, {
         method: 'DELETE',
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
         }
      })

      if (response.ok) {
         await fetchProjects()
      }
   } catch (error) {
      console.error('Failed to delete project:', error)
   }
}

function closeModal() {
   showAddModal.value = false
   showEditModal.value = false
   editingId.value = null
   form.value = {
      title: '',
      date: '',
      description: '',
      problem: '',
      featuresText: '',
      stackText: ''
   }
}

function handleLogout() {
   localStorage.removeItem('admin_token')
   window.location.href = '/admin/login'
}

onMounted(fetchProjects)
</script>