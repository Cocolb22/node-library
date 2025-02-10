import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as { id: number; firstName: string; lastName: string; email: string } | null,
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:3000/auth/get_current_user", {
          withCredentials: true,
        });

        if (response.data.user) {
          this.user = {
            id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
          };
        } else {
          this.user = null;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        this.user = null;
      }
    },

    async logout() {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      this.user = null;
    },
  },
});
