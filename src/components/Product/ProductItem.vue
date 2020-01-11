<template>
  <div>
    <article class="product" itemscope>
      <figure class="product__image-wrapper">
        <img class="product__image" :src="product.cover_image_url" alt="Product" itemprop="image" />
        <button class="product__wishlist-button button button--round button--wishlist">
          <svg
            id="Wishlist-Icon"
            class="icon"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Add to Wishlist</title>
            <path
              class="heart"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </figure>
      <div class="product__details">
        <h1 class="product__title" itemprop="brand">{{ product.title }}</h1>
        <p class="product__subtitle" itemprop="description">{{ product.description }}</p>
        <div class="product__price" itemscope itemtype="http://schema.org/Offer">
          <span class="product__price--strike">{{ product.price.originalPrice }}</span>
          <span
            class="product__price--discounted"
            itemprop="price"
          >{{ product.price.discountPrice}}</span>
        </div>
        <button class="product__add-to-cart button button--primary">{{ cartButtonText }}</button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cartButtonClass() {
      return this.product.isAddedToCart ? 'button--in-cart' : '';
    },
    cartButtonText() {
      return !this.product.isAddedToCart ? 'Add to Cart' : 'In Cart';
    },
    wishlistButtonClass() {
      return this.product.isAddedToWishlist ? 'button--in-wishlist' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
/* ==========================================================================
   Buttons
   ========================================================================== */

.button--round {
  display: block;
  border-radius: 50%;
}

.button--primary {
  padding: 13px;
  font-family: "Lato-Bold", sans-serif;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.39px;
}

.button--in-wishlist > .icon {
  fill: #ffc15d;
}

.button--in-cart {
  /* pointer-events: none; */
  background-color: #d9d9d9;
}

/* ==========================================================================
   Product Image
   ========================================================================== */

.product__image-wrapper {
  padding: 20px;
  position: relative;
  text-align: center;
}

.product__image {
  max-width: 100%;
  height: 220px;
}

/* ==========================================================================
   Product Details
   ========================================================================== */

.product__details {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  padding: 10px 20px 20px;
  text-align: center;
}

/* ==========================================================================
   Product Titles
   ========================================================================== */

.product__title {
  padding-bottom: 10px;
  font-family: "Lato-Bold", sans-serif;
  font-size: 14px;
  letter-spacing: 1.37px;
  text-transform: uppercase;
  overflow: hidden;
  height: 65px;
}

.product__subtitle {
  padding-bottom: 10px;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.43px;
  color: #808080;
  overflow: hidden;
  height: 40px;
}

/* ==========================================================================
   Product Prices
   ========================================================================== */

.product__price {
  padding-bottom: 20px;
  font-family: "Lato-Bold", sans-serif;
  font-size: 14px;
  letter-spacing: 2.33px;
}

.product__price--strike {
  margin-right: 10px;
  text-decoration: line-through;
}

.product__price--discounted {
  color: red;
}

/* ==========================================================================
   Product actions
   ========================================================================== */

.product__wishlist-button {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
}

.product__add-to-cart {
  width: 100%;
  margin-top: 10px;
  margin-top: auto;
}

/* ==========================================================================
   Media Queries
   ========================================================================== */

@media (hover: hover) {
  .button--primary:hover {
    border: 1px solid #444a59;
    color: #ffffff;
    background-color: #444a59;
  }

  .button--wishlist:hover {
    border: 1px solid #444a59;
  }

  .button--wishlist:hover > .icon {
    fill: #444a59;
  }
}
</style>