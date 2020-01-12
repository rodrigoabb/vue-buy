<template>
  <div class="dropdown-container">
    <div class="shopping-cart">
      <div class="shopping-cart-header">
        <span style="float: left; paddingBottom: 10px"><b>Cart list</b></span>
        <!-- <span style="float: right"><b>Total items:</b> {{ items.length }}</span> -->
      </div>

      <ul class="shopping-cart-items">
        <div v-if="items.length > 0">
          <li class="list-item clearfix" v-for="item in items" :key="item.uuid">
            <img :src="item.image" alt="item1" />
            <div class="item-content">
              <span class="item-name">{{ truncateWithEllipses(item.title, productTitleMaxLength) }}</span>
              <span class="item-price">{{ item.price }}</span>
            </div>
            <svg ref="removeItemButton" class="deleteItem" @click="onRemoveItemClick(item)" idth="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          </li>
          <button class="button" @click="onCheckoutClick">Checkout</button>
        </div>
        <div v-else>
          <span class="empty-cart"> You haven't added items to your cart yet.<br/> Go for it! &#128513;</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { PRODUCT_TITLE_DROPDOWN_MAX_LENGTH } from '@/utilities/constants';
import { truncateTextWithEllipses } from '@/utilities/helperFunctions';

/**
  * @module Utils/CartDropdown
  * @desc Product Item component
  * @vue-prop {Array<Object>} [items=[]] items - Items to be listed
  * @vue-data {Number} productTitleMaxLength - Set max length of product title to be shown
  * @vue-event {Object} onRemoveToCart - Emits product object to be removed from cart
*/

export default {
  name: 'CartDropdown',
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      productTitleMaxLength: PRODUCT_TITLE_DROPDOWN_MAX_LENGTH,
    };
  },
  methods: {
    /**
     * Emits a 'onRemoveToCart' event when 'Remove from Cart' cross button is clicked
     * @param {Object} itemSelected - Item to be removed from cart
    */
    onRemoveItemClick(itemSelected) {
      this.$emit('onRemoveToCart', itemSelected);
    },
    /**
     * Truncates given text max length and add ellipses at the end
     * @param {String} text - String to truncate
     * @param {Number} max - Max length for text to be truncated to
     * @return {String}
    */
    truncateWithEllipses(text, max) {
      return truncateTextWithEllipses(text, max);
    },
    /**
     * Handles click on Checkout button (NOT IMPLEMENTED YET)
    */
    onCheckoutClick() {
    },
  },
};
</script>

<style lang="scss" scoped>

@import "@/utilities/variables";

.shopping-cart {
  margin: 20px 0;
  float: right;
  background: white;
  width: 320px;
  position: relative;
  border-radius: 3px;
  padding: 20px;
  text-transform: none;


  .shopping-cart-header {
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 20px;

    .shopping-cart-total {
      float: right;
    }
  }

  .shopping-cart-items {
    padding-top: 20px;

      li {
        margin-bottom: 18px;
      }
    img {
      float: left;
      margin-right: 12px;
      width: 70px;
      height: 70px;
    }

    .item-content {
      height: 70px;
      position:relative;
    }

    .item-name {
      display: block;
      font-size: 16px;
    }

    .item-price {
      color: $main-color;
      margin-right: 8px;
      position:absolute;
      bottom: 0;
    }

    .empty-cart {
      font-size: 14px;
      line-height: 20px;
    }

    .deleteItem {
      cursor: pointer;
      float: right;
      fill: #d11507;
    }
  }

  .list-item {
    display: flex;

  }

  .list-item > div {
    flex: 1; /* grow */
  }

}

.shopping-cart:after {
  bottom: 100%;
  left: 89%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: white;
  border-width: 8px;
  margin-left: -8px;
}

.cart-icon {
  color: #515783;
  font-size: 24px;
  margin-right: 7px;
  float: left;
}

.button {
  width: 100%;
  background: $secondary-color;
  color:white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 25px 0 0 0;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

</style>
