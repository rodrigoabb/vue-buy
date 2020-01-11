<template>
  <main class="product-page">
    <div class="container">
      Products!
      <div>
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
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductItem from '@/components/Product/ProductItem.vue';

export default {
  name: 'ProductListPage',
  components: {
    ProductItem,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'allProducts',
      'allProductsStatus',
    ]),
    productsForThisPage() {
      const productsForThisPage = this.allProducts;
      return productsForThisPage;
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
  },
};

</script>

<style lang="scss">

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

</style>
