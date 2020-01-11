<template>
  <main class="product-page">
    <div class="container">
      Products!
      <div>
        <ul class="product-list">
            <li class="product-list__item" v-for="product in productsForThisPage" :key="product.uuid">
              <ProductItem
                :product="product"
                />
            </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
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
    productsForThisPage() {
      return [
        {
          uuid: '95aca17a-45cd-84cd-4517-a199dbd8524b',
          title: 'A really beautiful image from a random topic',
          description: 'You can see here something that is really nice, unexpected, you probably do not know if it is for sale or not but you want to buy it. See the price, it is not too bad.',
          price: {
            currency: 'EUR',
            value: 45,
            originalPrice: '€ 85.00 ',
            discountPrice: '€ 45,00 ',
          },
          cover_image_url: 'https://i.picsum.photos/id/154/200/200.jpg',
        },
      ];
    },
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
