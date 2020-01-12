<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <div id="previousPageIcon" class="pagination__link"  :class="{ 'pagination-button_disabled': isPreviousButtonDisabled }" @click="previousPage">
          <span> &lt; </span>
        </div>
      </li>
      <PaginationNumberList
        v-for="pagNumber in paginationNumbers"
        :key="pagNumber"
        :pageNumber="pagNumber"
        @loadPage="onLoadPage"
        :class="{
          'pagination-custom__description--current':
          pagNumber === currentPage,
          'nonClickable': pagNumber === '...'
        }"
        class="pagination-custom__description"
      />
      <li class="pagination__item">
        <div id="nextPageIcon" class="pagination__link"  :class="{ 'pagination-button_disabled': isNextButtonDisabled }" @click="nextPage">
          <span> &gt; </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PaginationNumberList from '@/components/Pagination/PaginationNumberList.vue';

/**
  * @module Pagination/Pagination
  * @desc Pagniation component
  * @vue-prop {Number} currentPage - Positive
  * @vue-prop {Number} pageCount - Positive
  * @vue-computed {Boolean} isPreviousButtonDisabled - Determines if 'Left Arrow' is disabled or not - True if current page is equal to 1, else otherwise
  * @vue-computed {Boolean} isNextButtonDisabled - Determines if 'Rigth Arrow' is disabled or not - True if current page is equal to pageCount (page quantity), else otherwise
  * @vue-computed {Boolean} shouldAddEllipsis - Determines if ellipsis need to be shown on pagination component or not - True if pageCount (page quantity) is greater than 3, false otherwise
  * @vue-computed {Number} pagesToShow - Determines how many pages will be shown on the list of pages. Depends on pageCount (page quantity) value
  * @vue-computed {Array.<String>} paginationNumbers - Build array of pages that are going to be shown on component - Depends on pagesToShow and currentPage
  * @vue-event {Number} nextPage - Emits 'nextPage' event
  * @vue-event {Number} previousPage - Emits 'previousPage' event
  * @vue-event {Number} loadPage - Emits 'loadPage' event
*/


export default {
  name: 'Pagination',
  components: {
    PaginationNumberList,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
      validator: value => value > 0 && value,
    },
    pageCount: {
      type: Number,
      required: true,
      validator: value => value > 0,
    },
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    },
    shouldAddEllipsis() {
      return this.pageCount > 3;
    },
    pagesToShow() {
      let realCount = 0;
      if (this.pageCount <= 0) {
        realCount = 1;
      } else if (this.pageCount <= 3) {
        realCount = this.pageCount;
      } else if (this.pageCount <= 5) {
        realCount = 3;
      } else {
        realCount = 5; // Ideal amount
      }
      return realCount;
    },
    paginationNumbers() {
      if (this.pagesToShow > 1) {
        const visiblePagesThreshold = (this.pagesToShow - 1) / 2;
        const paginationNumbersArray = Array(this.pagesToShow - 1).fill(0);

        // Selected page number is smaller than half of the list width
        if (this.currentPage <= visiblePagesThreshold + 1) {
          paginationNumbersArray[0] = 1;
          const paginationNumbers = paginationNumbersArray.map(
            (paginationNumber, index) => paginationNumbersArray[0] + index,
          );
          if (this.shouldAddEllipsis) {
            paginationNumbers.splice(paginationNumbers.length, 0, '...');
          }
          paginationNumbers.push(this.pageCount);
          return paginationNumbers;
        }

        // Selected page number is bigger than half of the list width counting from the end of the list
        if (this.currentPage >= this.pageCount - visiblePagesThreshold) {
          const paginationNumbers = paginationNumbersArray.map(
            (paginationNumber, index) => this.pageCount - index,
          );

          paginationNumbers.reverse();
          if (this.shouldAddEllipsis) {
            paginationNumbers.splice(0, 0, '...');
            // paginationNumbers.unshift('...');
          }
          paginationNumbers.unshift(1);
          return paginationNumbers;
        }

        // All other cases
        // Middle section (variable)
        paginationNumbersArray[0] = this.currentPage - visiblePagesThreshold + 1;
        const paginationNumbers = paginationNumbersArray.map(
          (paginationNumber, index) => paginationNumbersArray[0] + index,
        );

        paginationNumbers.unshift(1);
        if (this.shouldAddEllipsis) {
          paginationNumbers.splice(paginationNumbers.length - 1, 0, '...');
        }
        paginationNumbers[paginationNumbers.length - 1] = this.pageCount;
        return paginationNumbers;
      }
      return 1;
    },
  },
  methods: {
    /**
     * Emits a 'nextPage' event
    */
    nextPage() {
      this.$emit('nextPage');
    },
    /**
     * Emits a 'previousPage' event
    */
    previousPage() {
      this.$emit('previousPage');
    },
    /**
     * Emits a 'loadPage' event with specified page number
     * @param {Number} pageToLoad - Page selected to be load
    */
    onLoadPage(pageToLoad) {
      this.$emit('loadPage', pageToLoad);
    },
  },
};
</script>

<style lang='scss'>

@import "@/utilities/variables";


.pagination-custom {
  display: flex;
  justify-content: center;
  align-items: center;

  &__description {
    display: flex;
      font-size: 16px;

    &--current {
      font-weight: 1000;
    }

    &--current span {
      color: $c-primary-accent;
      pointer-events: none;
    }
  }
}

.nonClickable {
  pointer-events: none;
}


/* ==========================================================================
   Pagination
   ========================================================================== */

.pagination {
  height: 45px;
  margin: 30px auto;
  text-align: center;
}

.pagination__list {
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.pagination__item {
  height: 100%;
  width: 45px;
  font-family: 'Lato-Bold', sans-serif;
  font-size: 13px;
  letter-spacing: 1.39px;
  text-align: center;
  cursor: pointer;
  transition: .3s border, .3s color, .3s background-color;
  color: $c-primary-accent;
}

.pagination-button_disabled {
  pointer-events: none;
  opacity: 0.3;
}

.pagination__link {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444A59;
}

.pagination__link:hover {
  cursor: pointer;
  transition: all 300ms ease;
  color: $c-primary-accent;
}

.pagination__link .icon {
  width: 8px;
  fill: #444A59;
}

</style>
