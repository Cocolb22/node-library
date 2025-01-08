<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
        <button @click="goToEdit(user.id)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserList",
  setup() {
    const users = ref([]);
    const router = useRouter();

    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/users");
      users.value = response.data;
    };

    const goToEdit = (id: number) => {
      router.push(`/users/${id}`);
    };

    onMounted(fetchUsers);

    return { users, goToEdit };
  },
});
</script>
