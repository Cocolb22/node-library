import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserForm from '@/components/UserComponents/UserForm.vue'
import UserList from '@/components/UserComponents/UserList.vue'
import UserDetails from '@/components/UserComponents/UserDetails.vue'

const routes = [
  // Route d'accueil
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  // Routes pour la gestion des utilisateurs
  {
    path: '/users/list',
    name: 'user-list',
    component: UserList,
  },
  {
    path: '/users/create',
    name: 'user-create',
    component: UserForm,
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: UserDetails,
    props: true, // Permet de passer l'ID comme une prop au composant
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
