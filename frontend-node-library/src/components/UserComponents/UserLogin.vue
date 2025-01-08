<template>
  <form @submit.prevent="handleLogin">
    <input v-model="credentials.email" type="email" placeholder="Email" required />
    <input v-model="credentials.password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios"; 

// Déclare un type pour les credentials
interface Credentials {
  email: string;
  password: string;
}

// Déclare un type pour la réponse de l'API
interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

// État réactif pour les credentials
const credentials = reactive<Credentials>({
  email: "",
  password: "",
});

// Fonction pour gérer la connexion
const handleLogin = async (): Promise<void> => {
  try {
    // Requête POST à l'API avec le typage de la réponse
    const response = await axios.post<AuthResponse>(
      "http://localhost:3000/auth/login",
      credentials
    );

    const { token, user } = response.data;

    // Stocke le token dans le localStorage pour la session utilisateur
    localStorage.setItem("authToken", token);
    alert(`Welcome ${user.email}, your role is ${user.role}`);
  } catch (error) {
    console.error("Login error:", error);
    alert("Invalid email or password. Please try again.");
  }
};
</script>
