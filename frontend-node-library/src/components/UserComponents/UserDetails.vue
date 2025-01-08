<template>
  <form @submit.prevent="handleUpdate">
    <input v-model="user.firstName" placeholder="First Name" required />
    <input v-model="user.lastName" placeholder="Last Name" required />
    <input v-model="user.email" type="email" placeholder="Email" required />
    <input v-model.number="user.password" placeholder="password" required />
    <button type="submit">Update</button>
    <button type="button" @click="handleDelete">Delete</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "UserDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = reactive({ firstName: "", lastName: "", email: "", password: "" });

    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/users/${route.params.id}`
      );
      Object.assign(user, response.data);
    };

    const handleUpdate = async () => {
      await axios.put(`http://localhost:3000/users/${route.params.id}`, user);
      alert("User updated successfully!");
      router.push("/");
    };

    const handleDelete = async () => {
      await axios.delete(`http://localhost:3000/users/${route.params.id}`);
      alert("User deleted successfully!");
      router.push("/");
    };

    onMounted(fetchUser);

    return { user, handleUpdate, handleDelete };
  },
});
</script>
