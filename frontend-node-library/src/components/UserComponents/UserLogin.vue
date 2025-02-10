<template>
  <form @submit.prevent="login">
    <input v-model="credentials.email" type="email" placeholder="Email" required />
    <input v-model="credentials.password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>

  <p>{{ message }}</p>

</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();

// Objet regroupant les données de connexion
const credentials = ref({
  email: "",
  password: "",
});

// Message de retour pour afficher le résultat de la connexion
const message = ref("");

const login = async () => {
  try {
    // Envoi de l'objet credentials au serveur pour la connexion
    await axios.post("http://localhost:3000/auth/login", credentials.value,
     {withCredentials: true}
    );
    await useUserStore().fetchUser();
    router.push({ name: "Home" });
    message.value = "Login successful!";
  } catch (error) {
    message.value = error.response?.data?.message || "Login failed!";
  }
};

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  margin-top: 10px;
}
</style>
