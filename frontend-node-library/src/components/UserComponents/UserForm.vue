<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="user.firstName" placeholder="First Name" required />
    <input v-model="user.lastName" placeholder="Last Name" required />
    <input v-model="user.email" type="email" placeholder="Email" required />
    <input v-model.number="user.password" placeholder="password" required />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "UserForm",
  setup() {
    const user = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: 0,
    });

    const handleSubmit = async () => {
      await axios.post("http://localhost:3000/users", user);
      alert("User created successfully!");
    };

    return { user, handleSubmit };
  },
});
</script>
