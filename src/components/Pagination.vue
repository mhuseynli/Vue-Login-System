<template>
  <ul class="pagination" v-if="data.length > 5 || currentPage > 1">
    <li class="pagination-item" title="First Page">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        <<
      </button>
    </li>

    <li class="pagination-item" title="Previous Page">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <
      </button>
    </li>

    <li class="pagination-item" v-for="(page, index) in pages" :key="index">
      <button
        type="button"
        @click="onClickPage(page.number)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.number) }"
      >
        {{ page.number }}
      </button>
    </li>

    <li class="pagination-item" title="Next Page">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        >
      </button>
    </li>
    <li class="pagination-item" title="Last Page">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        >>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages)
        return (
          this.totalPages -
          this.maxVisibleButtons +
          (this.maxVisibleButtons - 1)
        );
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },

    onPageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  margin: auto 0 0 0;
  list-style-type: none;
  .pagination-item {
    button {
      margin: 0 !important;
      padding: 0.25rem 0.5rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 0.25rem;
      background: none;
      &:hover {
        cursor: pointer;
        background-color: silver;
      }
      &[disabled="disabled"] {
        color: silver;
        cursor: default;
        &:hover {
          cursor: default;
          background-color: transparent;
        }
      }
      &.active {
        color: red;
      }
    }
  }
}
</style>