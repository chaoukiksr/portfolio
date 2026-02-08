
import {createRouter,createWebHistory} from 'vue-router'
import DashbaordView from '../views/admin/DashbaordView.vue'
import LoginPageView from '../views/admin/LoginPageView.vue'
import HomeView from '../views/public/HomeView.vue'
const routes = [
   {
      path:'/',
      component:HomeView,
      name:'HomeView'
   },
   {
      path:'/admin/login',
      component:LoginPageView,
      name:'login'
   },
   {
      path:'/admin/dashboard',
      component:DashbaordView,
      name:'dashboard',
      meta:{requiresAuth:true},
   }
]

const router = createRouter({
   history:createWebHistory(),
   routes
})
// router.beforeEach((to, from, next)=>{
//    const admin_token = localStorage.getItem('admin_token')
//    if(to.meta.requiresAuth && !admin_token){
//       next({name:'login'});
//    }else{
//       next({name:'dashboard'});
//    }
// })
export default router;