<template>
  <header>
    <nav>
      <NavbarComponent />
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/SharedComponents/Navbar.vue'

</script>

<style>
</style>
