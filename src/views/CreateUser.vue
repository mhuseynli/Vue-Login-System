<template>
  <div class="container">
    <div class="create-user">
      <router-link class="btn-link" to="/">< Back</router-link>
      <router-view></router-view>
      <div class="add-edit-user">
        <input
          class="input-standard"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
          v-model="firstName"
          required
        />
        <input
          class="input-standard"
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          v-model="lastName"
          required
        />
        <input
          class="input-standard"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <select
          class="input-standard"
          v-model="gender"
          name="gender"
          id="gender"
        >
          <option selected disabled value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          class="input-standard"
          type="text"
          name="ip_address"
          id="ip_address"
          placeholder="IP Address"
          v-model="ip_address"
          disabled
          required
        />
        <div>
          <button @click="createUser" class="btn-standard">Create</button>
        </div>
      </div>
      <p class="error-message" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      ip_address: "",
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  created() {
    fetch(`https://api.ipify.org`)
      .then((data) => data.text())
      .then((data) => {
        this.ip_address = data;
      });
  },
  methods: {
    createUser() {
      if (
        this.firstName.trim() === "" ||
        this.lastName.trim() === "" ||
        this.email.trim() === "" ||
        this.gender === "" ||
        this.ip_address === ""
      ) {
        alert("Fill out all fields");
        return;
      }

      this.$store.dispatch("createUser", {
        id: this.$store.getters.users.length + 1,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        gender: this.gender,
        ip_address: this.ip_address,
      });

      if (!this.error) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
.create-user {
  margin-top: 1rem;
}
</style>