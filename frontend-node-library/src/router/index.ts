import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/UserComponents/UserList.vue'
import UserDetails from '@/components/UserComponents/UserDetails.vue'
import UserRegistrationForm from '@/components/UserComponents/UserRegistrationForm.vue'
import UserLogin from '@/components/UserComponents/UserLogin.vue'
import { useAlertStore } from '@/stores/alertStore';


const routes = [
  // Route d'accueil
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // Routes pour la gestion des utilisateurs
  {
    path: '/users/list',
    name: 'user-list',
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: '/users/register',
    name: 'user-register',
    component: UserRegistrationForm,
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: UserDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/users/login',
    name: 'user-login',
    component: UserLogin,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isTokenPresent = await authService.getToken(); // Attendre la réponse

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isTokenPresent) {
      const alertStore = useAlertStore();
      alertStore.showAlert('Votre session a expiré, veuillez vous reconnecter.', 'warning');

      return next({ name: "user-login" }); // Redirige vers la page de login
    }
  }
  next(); // Continue la navigation si l'utilisateur est authentifié
});


export default router
