<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Accueil</router-link>

      <ul class="navbar-nav ms-auto">
        <!-- Utilisateur NON connecté -->
        <template v-if="!user">
          <li class="nav-item">
            <router-link to="/users/login" class="nav-link">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users/register" class="nav-link">Inscription</router-link>
          </li>
        </template>

        <!-- Utilisateur CONNECTÉ -->
        <template v-else>
          <li class="nav-item">
            <router-link :to="`/users/${user.id}`" class="nav-link">Mon Profil</router-link>
          </li>
          <li class="nav-item">
            <button @click="handleLogout" class="btn btn-danger">Déconnexion</button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

const handleLogout = async () => {
  await userStore.logout();
  await nextTick(); // Attend la mise à jour du state Pinia avant de rediriger
  router.push("/users/login"); // Redirige vers la page de connexion
};

onMounted(() => {
  userStore.fetchUser();
});
</script>
