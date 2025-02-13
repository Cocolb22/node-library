<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
        <button @click="goToEdit(user.id)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userService } from "@/services/userService";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const users = ref<User[]>([]); // Déclare la liste des utilisateurs
const router = useRouter(); // Récupère l'instance du routeur


// Fonction pour naviguer vers la page d'édition d'un utilisateur
const goToEdit = (id: number) => {
  router.push(`/users/${id}`);
};

// Appel de `fetchUsers` lors du montage du composant
onMounted(
  async () => {
    const fetchedUsers = await userService.fetchUsers();
    users.value = fetchedUsers;
  }
);
</script>
