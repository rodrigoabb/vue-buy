<template>
  <li class="pagination__item">
    <span class="pagination__link" @click="onClick">
      {{ pageNumber }}
    </span>
  </li>
</template>

<script>

/**
* @module Pagination/PaginationNumberList
* @desc PaginationNumberList component
* @vue-prop {Number} pageNumber - Number of page being rendered. NOTE: String type is also allowed for just once case: it can be a ellipsis
* @vue-event {Number} onClick - Emits 'loadPage' event
*/

export default {
  name: 'PaginationNumberList',
  props: {
    pageNumber: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    /**
     * Emits a 'loadPage' event with pageNumber value
    */
    onClick() {
      this.$emit('loadPage', this.pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
