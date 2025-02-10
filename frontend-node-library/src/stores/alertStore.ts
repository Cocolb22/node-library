// src/stores/alertStore.ts
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: 'warning', // success, error, warning
    visible: false,
  }),
  actions: {
    showAlert(message: string, type: string = 'warning') {
      this.message = message;
      this.type = type;
      this.visible = true;
    },
    hideAlert() {
      this.visible = false;
      this.message = '';
    }
  }
});
