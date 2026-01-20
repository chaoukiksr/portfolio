<template>
   <section id="contact" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-8">
         <h2 class="text-5xl font-bold text-gray-400 mb-12">Contact Me</h2>

         <div class="bg-gray-50 p-8 md:p-12 rounded-lg shadow-sm">
            <p class="text-gray-600 mb-8">Have a project in mind? Let's work together to create something amazing!</p>

            <div class="space-y-6">
               <div class="grid md:grid-cols-2 gap-6">
                  <div>
                     <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                     <input type="text" v-model="form.name"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition"
                        placeholder="Your name">
                  </div>
                  <div>
                     <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                     <input type="email" v-model="form.email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition"
                        placeholder="your.email@example.com">
                  </div>
               </div>

               <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" v-model="form.subject"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition"
                     placeholder="How can I help you?">
               </div>

               <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="6" v-model="form.message"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition resize-none"
                     placeholder="Tell me about your project..."></textarea>
               </div>

               <button @click="sendEmail" :disabled="isLoading"
                  class="bg-pink-100 text-gray-700 px-8 py-4 tracking-widest text-sm font-medium hover:bg-pink-200 transition rounded-lg w-full md:w-auto disabled:opacity-50">
                  {{ isLoading ? 'SENDING...' : 'SEND MESSAGE' }}
               </button>

               <p v-if="statusMessage" :class="statusClass">{{ statusMessage }}</p>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isLoading = ref(false)
const statusMessage = ref('')
const statusClass = ref('')

const sendEmail = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    statusMessage.value = 'Please fill in all fields'
    statusClass.value = 'text-red-500'
    return
  }

  isLoading.value = true
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_name: form.value.name,
        from_email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    statusMessage.value = '✓ Message sent successfully!'
    statusClass.value = 'text-green-500'
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    statusMessage.value = '✗ Failed to send message. Try again.'
    statusClass.value = 'text-red-500'
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>