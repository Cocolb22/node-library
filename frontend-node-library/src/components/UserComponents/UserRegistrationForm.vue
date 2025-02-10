<template>
  <form @submit.prevent="register">
    <input v-model="user.firstName" placeholder="First Name" required />
    <input v-model="user.lastName" placeholder="Last Name" required />
    <input v-model="user.email" type="email" placeholder="Email" required />
    <input v-model="user.password" type="password" placeholder="Password" required />
    <button type="submit">Submit</button>
  </form>
  <p>{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();

// Objet utilisateur pour regrouper les données du formulaire
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

// Message de retour pour afficher le résultat de l'inscription
const message = ref("");

const register = async () => {
  try {
    // Envoi de l'objet utilisateur entier au serveur
    const response = await axios.post("http://localhost:3000/auth/register", user.value,
      { withCredentials: true }
    );
    message.value = response.data.message;
    await useUserStore().fetchUser();
    router.push({ name: "Home" });

  } catch (error) {
    message.value = error.response?.data?.message || "Error occurred";
  }
};
</script>

<style scoped>
/* Ajoute des styles pour le formulaire si nécessaire */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  margin-top: 10px;
}
</style>
