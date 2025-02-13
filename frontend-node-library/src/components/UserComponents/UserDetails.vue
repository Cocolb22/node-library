<template>
  <div>
    <h1>Modifier vos informations</h1>
    <form @submit.prevent="updateUser">
      <input v-model="user.firstName" placeholder="Prénom" />
      <input v-model="user.lastName" placeholder="Nom" />
      <input v-model="user.email" placeholder="Email" />
      <!-- Ici on utilisera un champ distinct pour le nouveau mot de passe -->
      <input v-model="newPassword" type="password" placeholder="Nouveau mot de passe" />
      <button type="submit">Mettre à jour</button>
    </form>
    <button @click="deleteUser" class="delete-btn">Supprimer mon compte</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userService } from "@/services/userService";

// Utilisez directement l'objet réactif défini dans le service
const user = userService.user;

// Pour le nouveau mot de passe, on utilise un ref séparé
const newPassword = ref("");

// Au montage du composant, récupérez l'utilisateur et mettez à jour l'objet réactif
onMounted(async () => {
  const fetchedUser = await userService.fetchUser();
  if (fetchedUser) {
    // Mettez à jour l'objet réactif sans changer sa référence (important pour Vue)
    Object.assign(user, fetchedUser);
  }
});

const updateUser = async () => {
  try {
    // Préparez les données à envoyer
    const payload: { id?: number; firstName?: string; lastName?: string; email?: string; password?: string } = {
      id: user.id ?? undefined,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // Si un nouveau mot de passe a été saisi, l'ajouter à la payload
    if (newPassword.value.trim() !== "") {
      payload.password = newPassword.value;
    }

    const updateUser = await userService.updateUser(payload);
    if (updateUser) {
      // Mettez à jour l'objet réactif sans changer sa référence (important pour Vue)
      Object.assign(user, updateUser);
      alert("Mise à jour réussie !");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("Erreur lors de la mise à jour");
  }
};

const deleteUser = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
    try {
      await userService.deleteUser();
      alert("Compte supprimé !");
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
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
