<template>
  <div class="header-container">
    <header class="header">
      <router-link to="/">
        <Logo />
      </router-link>
      <aside class="header-cart">
        <div class="header-cart__item header-cart__count">
          <div class="header-cart__price">
            {{ cartTotalPrice }}
          </div>
          <div id="cart-icon" class="dropdown" @click="onCartClick" >
            <svg
              ref="dropdownButton"
              class="icon dropbtn "
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
            <CartDropdown
              v-show="showCartDropdown"
              class="dropdown-content"
              :items="productsToCartItem"
              @onRemoveToCart="removeFromCartHandler"
              v-closable="{
                exclude: ['dropdownButton'],
                handler: 'onCloseCartDropdown'
              }"
            />
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
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { CURRENCY } from '@/utilities/constants';
import CartDropdown from '@/components/Utils/CartDropdown.vue';
import Logo from '@/components/Utils/Logo.vue';

/**
   * @module Header/Header
   * @desc Header component
   * @vue-data {Boolean} [showCartDropdown=false] showCartDropdown - Determines if the Cart Dropdown component is shown or not
   * @vue-computed {String} cartTotalPrice - Composed by chosen CURRENCY and sum of all product prices on cart
   * @vue-computed {Array.<Object>} productsToCartItem - Array of product objects. Formats products objects on cart to be sent as an array to Cart Dropdown components
*/

// This variable will hold the reference to document's click handler
let handleOutsideClick;

Vue.directive('closable', {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler (it's registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation();
      // Get the handler method name and the exclude array from the object used in v-closable
      const { handler, exclude } = binding.value;
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false;
      exclude.forEach((refName) => {
        // We only run this code if we haven't detected any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName];
          // See if this excluded element is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target);
        }
      });
      // We check to see if the clicked element is not the dropdown element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dropdown and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]();
      }
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },
  unbind() {
    // If the element that has v-closable is removed, then unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  },
});

export default {
  name: 'Header',
  components: {
    CartDropdown,
    Logo,
  },
  data() {
    return {
      showCartDropdown: false,
    };
  },
  computed: {
    ...mapGetters([
      'allProductsInCart',
      'allProductsInWishlist',
    ]),
    cartTotalPrice() {
      const sumValue = this.allProductsInCart.reduce((a, b) => a + (Number(b.price.discountValue) || 0), 0);
      return `${CURRENCY.symbol} ${sumValue.toFixed(2)}`;
    },
    productsToCartItem() {
      const items = this.allProductsInCart.map(product => ({
        uuid: product.uuid,
        image: product.cover_image_url,
        title: product.title,
        price: `${CURRENCY.symbol} ${product.price.discountValue}`,
      }));
      return items;
    },
  },
  methods: {
    ...mapActions([
      'removeProductFromCart',
    ]),
    /**
     * Shows/hides Cart Dropdown menu
     */
    onCartClick() {
      this.showCartDropdown = !this.showCartDropdown;
    },
    /**
     * Hides Cart Dropdown menu
     */
    onCloseCartDropdown() {
      this.showCartDropdown = false;
    },
    /**
     * Handles removing product item from Cart Dropdown menu - Triggered by event emmited from CartDropdown component
     * @param {Object} itemSelected - Product selected to be removed from cart
     */
    removeFromCartHandler(itemSelected) {
      // Ugly workaround until figure out something better
      // Goal: not close dropdown element when delete product button is clicked
      // Explanation: 'closable' directive checks for target elements to be included on main element (dropdown) and doesn't hide it
      // if it's true. Since delete icon is deleted when it's clicked (alongisde with product), metioned check seems to be done before this,
      // so includes() return false and closes the dropdown element (even though it removes product perfectly).
      // Workaround: I've given some time to wait before action is performed, so includes() returns 'true' and dropdown keeps open as intended
      setTimeout(() => {
        this.removeProductFromCart(itemSelected);
        // For experience, wait time just has to be more than 0
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>

@import "@/utilities/variables";

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
   Cart
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
  font-family: sans-serif;
  font-size: 8px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  background-color: #358ed7;
}

/* ==========================================================================
   Dropdown
   ========================================================================== */

.dropdown {
  float: left;
  overflow: hidden;
}

.dropbtn {
  cursor: pointer;
}

.dropdown-content {
  overflow: auto; /* to get scroll */
  max-height: 500px;
  position: absolute;
  right: 2%;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* ==========================================================================
   Media Queries
   ========================================================================== */

@media (max-width: $phone-upper-boundary - 1) {
  .header-logo {
    padding-left: 2em;
  }

  .header-logo svg {
    width: 80px;
    height: 80px;
  }

  .header {
    padding-right: 1em;
  }
}

@media (min-width: $phone-upper-boundary) {
  .header-logo {
    padding-left: 2em;
  }
  .header {
    padding-right: 1.5em;
  }
}

@media (min-width: $tablet-landscape-upper-boundary) {
  .header {
    padding-right: 0em;
  }
}

</style>
