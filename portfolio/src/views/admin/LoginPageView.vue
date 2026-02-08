<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 w-full max-w-md border-b border-gray-200">
      <h1 class="text-2xl font-semibold text-gray-700 mb-8 tracking-wider">ADMIN LOGIN</h1>
      <div v-if="error" class="bg-red-50 text-red-600 p-4 mb-6 text-sm">
        {{ error }}
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">USERNAME</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label class="text-sm font-semibold text-gray-700 tracking-wider block mb-2">PASSWORD</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-100 text-gray-700 py-3 text-sm font-semibold tracking-wider hover:bg-green-200 transition"
        >
          {{ loading ? 'LOGGING IN...' : 'LOGIN' }}
        </button>
      </form>
      <p class="text-center mt-6">
        <router-link to="/" class="text-gray-400 text-sm hover:text-gray-600">
          ← Back to Portfolio
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try{
   console.log(username.value, password.value);
   
   const response = await fetch('http://localhost:5000/api/auth/login',{
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({
         username:username.value,
         password:password.value
      })
   })
   const data = await response.json()
   
   if(response.ok){
      localStorage.setItem('admin_token', data.admin_token);
      router.push({name:'dashboard'})
   }
   if(!response.ok){
      error.value = data.message
     
   }
}catch(e){
   console.error(e);
   
   
}finally{
     loading.value = false;

  }
}


</script>