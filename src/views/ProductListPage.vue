<template>
  <main class="product-page">
    <div class="container">
      <div v-if="allProductsStatus.isLoading || fakeIsLoading">
        <LoadingSpinner :spinnerType=1 />
      </div>
      <div v-else-if="allProductsStatus.error" class="error product-list-error">
        <p>{{ allProductsStatus.error }}</p>
      </div>
      <div v-else>
        <ul class="product-list">
            <li class="product-list__item" v-for="product in productsForThisPage" :key="product.uuid">
              <ProductItem
                :product="product"
                @onAddToCart="addProductToCart"
                @onRemoveToCart="removeProductFromCart"
                @onAddToWishlist="addProductToWishlist"
                @onRemoveToWishlist="removeProductFromWishlist"
                />
            </li>
        </ul>
        <Pagination
          :current-page="currentPage"
          :page-count="pageCount"
          @nextPage="pageChangeHandle('next')"
          @previousPage="pageChangeHandle('previous')"
          @loadPage="pageChangeHandle"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductItem from '@/components/Product/ProductItem.vue';
import { PRODUCTS_PER_PAGE, FAKE_WAIT_TIME_MS, PAGE_COUNT } from '@/utilities/constants';
import LoadingSpinner from '@/components/Utils/LoadingSpinner.vue';
import Pagination from '@/components/Pagination/Pagination.vue';

export default {
  name: 'ProductListPage',
  components: {
    LoadingSpinner,
    ProductItem,
    Pagination,
  },
  created() {
    this.askForThisPageProducts();
  },
  data() {
    return {
      currentPage: 1,
      fakeIsLoading: false,
      pageCount: PAGE_COUNT,
    };
  },
  computed: {
    ...mapGetters([
      'allProducts',
      'allProductsStatus',
    ]),
    productsForThisPage() {
      const productsForThisPage = this.allProducts.slice(this.firstProductGlobalIndex, this.firstProductGlobalIndex + PRODUCTS_PER_PAGE);
      return productsForThisPage;
    },
    firstProductGlobalIndex() {
      return (this.currentPage - 1) * PRODUCTS_PER_PAGE; // -1 for refer to a zero-indexed array
    },
  },
  methods: {
    ...mapActions([
      'fetchProducts',
      'addProductToCart',
      'removeProductFromCart',
      'addProductToWishlist',
      'removeProductFromWishlist',
    ]),
    async pageChangeHandle(value) {
      switch (value) {
        case 'next':
          if (this.currentPage < PAGE_COUNT) {
            this.currentPage += 1;
          }
          break;
        case 'previous':
          if (this.currentPage > 1) {
            this.currentPage -= 1;
          }
          break;
        default:
          this.currentPage = value;
      }
      this.askForThisPageProducts();
    },
    askForThisPageProducts() {
      this.fakeIsLoading = true;
      setTimeout(() => {
        this.fakeIsLoading = false;
      }, FAKE_WAIT_TIME_MS);
      if (!this.allProducts[this.firstProductGlobalIndex]) {
        this.fetchProducts(this.firstProductGlobalIndex);
      }
    },
  },
};

</script>

<style lang="scss">

@import "@/utilities/variables";

/* ==========================================================================
   Product List
   ========================================================================== */

.product-list {
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  margin: 0 -10px;
}

.product-list__item {
  padding: 10px;
  flex: 1 0 33.3333%;
  max-width: 33.3333%;
}

.product-page {
  /* height: 100%; */
  height: fit-content;
  min-height: 80vh;
  /* min-height: 100%; */
}

.product-list-error {
  text-align: center;
  line-height: 90px
}

/* ==========================================================================
   Product
   ========================================================================== */

.product {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
}


/* ==========================================================================
   Media Queries
   ========================================================================== */

  @media (max-width: $phone-upper-boundary - 1) {

    .product-list__item {
      /* flex: none; */
      flex: 1 0 100%;
      max-width: 100%;
    }
  }

  @media (min-width: $phone-upper-boundary) {
    .product-list__item {
      flex: 1 0 50%;
      max-width: 50%;
    }
  }

  @media (min-width: $tablet-portrait-upper-boundary) {
    .product-list__item {
      padding: 10px;
      flex: 1 0 33.3333%;
      max-width: 33.3333%;
    }
  }

</style>
