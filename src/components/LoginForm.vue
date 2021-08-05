<template>
  <div class="container">
    <div class="login-form">
      <h1>Welcome.</h1>

      <input
        class="input-standard"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        v-model="email"
        required
        @keypress.enter="userLogin"
      />
      <button class="btn-standard" type="submit" @click="userLogin">
        Login
      </button>

      <p class="error-message" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
        localStorage.setItem("user", JSON.stringify(value));
      }
    },
  },
  methods: {
    userLogin() {
      this.$store.dispatch("logUserIn", this.email);
    },
  },
};
</script>

<style lang="scss">
.login-form {
  text-align: center;
  height: 100vh;
  @include perfectCenter;
  justify-content: flex-start;
  padding-top: 10vh;
  flex-direction: column;
  h1 {
    font-size: 4rem;
    margin-bottom: 30px;
  }
  .input-standard {
    width: calc(100% - 10%);
  }
}
</style>