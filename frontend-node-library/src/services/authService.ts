import axios from "axios";

export const authService = {

  async getToken() {
    try {
      const token = await axios.get("http://localhost:3000/auth/get_valid_token", {
        withCredentials: true,
      });
      if (token) {
        return true;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
      return false;
    }
  },
};
