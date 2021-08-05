<template>
  <div class="user-card">
    <div class="user-info">
      <h3>{{ user.first_name + " " + user.last_name }}</h3>
      <p>Gender: {{ user.gender }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div class="actions">
      <p @click="editUser(user)" class="btn-link">Edit</p>
      <p @click="deleteUser" class="btn-link">Delete</p>
      <router-link class="btn-link" :to="`/profile/${user.id}`"
        >View</router-link
      >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser", this.user.id);
    },
    editUser(user) {
      this.$emit("editUser", user);
    },
  },
};
</script>

<style lang="scss">
.user-card {
  box-shadow: 0 0 10px 0 #0000002b;
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .actions {
    text-align: right;
  }
}
</style>