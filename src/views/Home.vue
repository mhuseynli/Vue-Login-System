<template>
  <div class="container">
    <div class="headline">
      <p class="hello-message">
        Hello <strong>{{ user.first_name + " " + user.last_name }}</strong>
      </p>
      <div>
        <router-link to="/create"
          ><button class="btn-standard">Create User</button>
        </router-link>

        <button class="btn-standard" @click="userLogout()">Logout</button>
      </div>
    </div>

    <Users />
    <router-view></router-view>
  </div>
</template>

<script>
import Users from "@/components/Users";

export default {
  components: {
    Users,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    userLogout() {
      this.$store.dispatch("logUserOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0 10px;
  flex-direction: column;

  .hello-message {
    font-size: 1.5rem;
  }
  button {
    margin-left: 5px;
  }
}
</style>
