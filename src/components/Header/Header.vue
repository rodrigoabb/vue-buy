<template>
  <div class="header-container">
    <header class="header">
      <router-link to="/">
        <div>Some kind of Company Logo</div>
      </router-link>
      <aside class="header-cart">
        <div class="header-cart__item header-cart__count">
          <div class="header-cart__price">{{ cartTotalPrice }}</div>
          <div id="cart-icon" class>
            <svg
              class="icon"
              width="40px"
              height="36px"
              viewBox="0 0 40 36"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              style="enable-background:new 0 0 40 36;"
              xml:space="preserve"
            >
              <title>Cart Icon</title>
              <g>
                <g transform="translate(-84.000000, -410.000000)" sketch:type="MSArtboardGroup">
                  <path
                    id="Cart"
                    sketch:type="MSShapeGroup"
                    d="M94.5,434.6h24.8l4.7-15.7H92.2l-1.3-8.9H84v4.8h3.1l3.7,27.8h0.1
                    c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h12.8c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h1.7v-3.9l-25.8-0.1L94.5,434.6"
                  />
                </g>
              </g>
            </svg>
          </div>
          <span class="cart__item-counter">{{ allProductsInCart.length }}</span>
        </div>
        <div id="wishlist-icon" class="header-cart__item header-cart__wishlist-count">
          <svg
            class="icon"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Wishlist Icon</title>
            <path
              class="heart"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span class="wishlist__item-counter">{{ allProductsInWishlist.length }}</span>
        </div>
      </aside>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      allProductsInCart: ['product1', 'product2', 'product3', 'product4'],
      allProductsInWishlist: ['product1', 'product4'],
      cartTotalPrice: '€ 15',
    };
  },
};
</script>

<style lang="scss" scoped>
/* ==========================================================================
   Header
   ========================================================================== */

.header-container {
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  top: 0;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  padding: 0;
  z-index: 999;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding-left: 5px;
  max-width: 1240px;
  margin: auto;
}

.header-logo svg {
  height: 25px;
  box-sizing: border-box;
}

/* ==========================================================================
   cart / Cart
   ========================================================================== */

.header-cart {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.header-cart__item {
  height: 25px;
  display: flex;
  align-items: flex-end;
}

.header-cart__item .icon {
  height: auto;
  fill: #444a59;
}

.header-cart__price {
  margin-right: 14px;
  font-size: 16px;
  line-height: 18px;
  color: green;
  white-space: nowrap;
}

.header-cart__count {
  margin-left: 10px;
}

.header-cart__count .icon {
  width: 17px;
}

.header-cart__wishlist-count {
  margin-left: 10px;
}

.cart__item-counter,
.wishlist__item-counter {
  width: 13px;
  height: 13px;
  margin-left: -1px;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  font-family: "Lato-Bold", sans-serif;
  font-size: 8px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  background-color: #358ed7;
}
</style>
