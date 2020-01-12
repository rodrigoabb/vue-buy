<template>
  <li class="pagination__item">
    <span class="pagination__link" @click="onClick">
      {{ pageNumber }}
    </span>
  </li>
</template>

<script>

export default {
  name: 'PaginationNumberList',
  props: {
    pageNumber: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('loadPage', this.pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>


</style>
