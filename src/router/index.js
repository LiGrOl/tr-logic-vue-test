import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/MainTaskList.vue')
  },
  {
    path: '/todo/:id',
    name: 'todo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ToDoList.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
