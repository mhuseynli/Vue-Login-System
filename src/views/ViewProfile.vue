<template>
  <div class="container">
    <div class="profile-view">
      <router-link class="btn-link" to="/">< Back</router-link>
      <router-view></router-view>
      <div class="profile-details">
        <h1>{{ profile.first_name + " " + profile.last_name }}</h1>
        <p>
          Gender: <strong>{{ profile.gender }}</strong>
        </p>
        <p>
          Email: <strong>{{ profile.email }}</strong>
        </p>
        <p>
          IP Address: <strong>{{ profile.ip_address }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    profile() {
      return this.$store.getters.getUserById(this.id);
    },
  },
};
</script>

<style lang="scss">
.profile-view {
  margin-top: 1rem;
}
</style>