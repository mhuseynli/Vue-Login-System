<template>
  <div>
    <div class="users">
      <UserCard
        v-for="user in paginatedData"
        :key="user.id"
        :user="user"
        @editUser="editUser($event)"
      />
      <ModalDialogue v-if="editingUser" @closeModal="editingUser = null">
        <EditUser :editingUser="editingUser" @closeModal="editingUser = null" />
      </ModalDialogue>
    </div>
    <Pagination
      :data="users"
      :total-pages="Math.ceil(users.length / this.perPage)"
      :total="users.length"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import ModalDialogue from "@/components/ModalDialogue";
import EditUser from "@/components/EditUser";
import Pagination from "@/components/Pagination";

export default {
  data() {
    return {
      editingUser: null,
      currentPage: 1,
      perPage: 50,
    };
  },
  components: {
    UserCard,
    ModalDialogue,
    EditUser,
    Pagination,
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    paginatedData() {
      let start = (this.currentPage - 1) * this.perPage,
        end = start + this.perPage;
      return this.users.slice(start, end);
    },
  },
  methods: {
    editUser(user) {
      this.editingUser = user;
    },
    onPageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style lang="scss">
.users {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>