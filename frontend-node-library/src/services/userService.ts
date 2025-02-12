import { reactive, ref } from "vue";
import axios from "axios";

export const userService = {
  user: reactive({
    id: null as number | null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }),

  // Charger l'utilisateur depuis le backend
  async fetchUser() {
    try {
      const response = await axios.get("http://localhost:3000/auth/get_current_user", {
        withCredentials: true,
      });
      console.log("réponse", response.data);

      if (response.data.user) {
        return {
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
      return null;
    }
  },

  async fetchUsers() {
    const users = ref([]);
        try {
          const response = await axios.get("http://localhost:3000/users", { withCredentials: true });
          users.value = response.data;
          console.log("Users fetched:", users.value);
          return users.value;
        } catch (error) {
          console.error("Failed to fetch users:", error);
          return [];
        }
    },


  // Mettre à jour les informations utilisateur
  async updateUser(updatedData: {id?: number; firstName?: string; lastName?: string; email?: string; password?: string }) {
    if (!this.user.id) {
      throw new Error("Impossible de mettre à jour : ID utilisateur manquant.");
    }

    try {
      const response = await axios.put(`http://localhost:3000/users/${this.user.id}`, updatedData,
      {
        withCredentials: true,
      }
      );

      // Mettre à jour les données locales
      Object.assign(this.user, response.data);
      console.log("user", this.user);
      console.log("response dans update", response.data);
      return response.data;

    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      throw error;
    }
  },

  // Supprimer l'utilisateur
  async deleteUser() {
    if (!this.user.id) {
      throw new Error("Impossible de supprimer : ID utilisateur manquant.");
    }

    try {
      await axios.delete(`http://localhost:3000/users/${this.user.id}`,
      {
        withCredentials: true,
      }
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw error;
    }
  },
};
