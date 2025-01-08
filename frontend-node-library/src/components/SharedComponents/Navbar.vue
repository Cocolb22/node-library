<template>
  <nav>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/users/list">Liste des utilisateurs</router-link></li>
      <li><router-link to="/users/create">Créer un utilisateur</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavbarComponent',
}
</script>

<style scoped>
nav {
  background-color: #f8f9fa;
  padding: 1em;
}
ul {
  list-style: none;
  display: flex;
  gap: 1em;
}
a {
  text-decoration: none;
  color: #007bff;
}
a:hover {
  text-decoration: underline;
}
</style>
