<template>
  <header>
    <nav>
      <NavbarComponent />
    </nav>
    <AlertMessageComponent />
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/SharedComponents/NavbarComponent.vue';
import AlertMessageComponent from './components/SharedComponents/AlertMessageComponent.vue';

</script>

<style>
</style>
