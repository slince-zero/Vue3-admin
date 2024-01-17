import { createRouter, createWebHistory } from 'vue-router'
import { routerMenu } from './routerMenu'

const router = createRouter({
 history: createWebHistory(),
 routes: [
  {
   path: '/login',
   name: 'login',
   component: () => import('../views/login/login.vue'),
  },
  {
   path: '/',
   name: 'home',
   meta: {
    title: 'vue3-admin',
   },
   redirect: '/login',
   component: () => import('../layout/MainLayout.vue'),
   children: [...routerMenu],
  },
 ],
})

// router.beforeEach((to, from, next) => {
//  // 设置浏览器标题
//  document.title = to.meta.title + ' - ' + 'vue3-admin'
//  // 路由拦截
//  if (to.path === '/login') return next()
//  if (!localStorage.getItem('token')) return next('/login')
//  next()
// })

export default router
