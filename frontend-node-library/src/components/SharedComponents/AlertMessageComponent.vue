<template>
  <div v-if="alertStore.visible" :class="['alert', alertClass]" role="alert">
    <span>{{ alertStore.message }}</span>
    <button type="button" class="btn-close" aria-label="Close" @click="alertStore.hideAlert"></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore();

const alertClass = computed(() => {
  return `alert-${alertStore.type} alert-dismissible fade show`;
});
</script>
