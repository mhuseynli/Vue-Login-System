<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <button class="btn-standard" @click="closeModal">Close</button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss">
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
  .btn-standard {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
</style>