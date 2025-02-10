<template>
  <div>
    <h1>Modifier vos informations</h1>
    <form @submit.prevent="updateUser">
      <input v-model="user.firstName" placeholder="Prénom" />
      <input v-model="user.lastName" placeholder="Nom" />
      <input v-model="user.email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit">Mettre à jour</button>
    </form>
    <button @click="deleteUser" class="delete-btn">Supprimer mon compte</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userService } from "@/services/userService";

const user = userService.user;
const password = ref(""); // Ne pas stocker le mot de passe dans `userService`

onMounted(() => {
  userService.fetchUser();
});

const updateUser = async () => {
  try {
    await userService.updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    alert("Mise à jour réussie !");
  } catch {
    alert("Erreur lors de la mise à jour");
  }
};

const deleteUser = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
    try {
      await userService.deleteUser();
      alert("Compte supprimé !");
      window.location.href = "/"; // Rediriger vers l'accueil après suppression
    } catch {
      alert("Erreur lors de la suppression du compte");
    }
  }
};
</script>

<style scoped>
.delete-btn {
  margin-top: 10px;
  background-color: red;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}
</style>
