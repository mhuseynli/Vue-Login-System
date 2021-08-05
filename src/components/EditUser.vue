<template>
  <div class="add-edit-user">
    <input
      class="input-standard"
      type="text"
      name="first_name"
      id="first_name"
      placeholder="First Name"
      v-model="editedFirstName"
      required
    />
    <input
      class="input-standard"
      type="text"
      name="last_name"
      id="last_name"
      placeholder="Last Name"
      v-model="editedLastName"
      required
    />
    <input
      class="input-standard"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      v-model="editedEmail"
      required
    />
    <select
      class="input-standard"
      v-model="editedGender"
      name="gender"
      id="gender"
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    <button @click="editUser" class="btn-standard">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedFirstName: this.editingUser.first_name,
      editedLastName: this.editingUser.last_name,
      editedEmail: this.editingUser.email,
      editedGender: this.editingUser.gender,
    };
  },
  props: {
    editingUser: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    editUser() {
      if (
        this.editedFirstName.trim() === "" ||
        this.editedLastName.trim() === "" ||
        this.editedEmail.trim() === ""
      ) {
        return;
      }
      this.$store.dispatch("updateUserData", {
        id: this.editingUser.id,
        first_name: this.editedFirstName,
        last_name: this.editedLastName,
        email: this.editedEmail,
        gender: this.editedGender,
      });
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
</style>