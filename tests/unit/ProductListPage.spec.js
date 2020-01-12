import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import createStoreMocks from '@/store/__mocks__';
import ProductPage from '@/views/ProductListPage.vue';
import Header from '@/components/Header/Header.vue';
import { FAKE_WAIT_TIME_MS, PRODUCTS_PER_PAGE } from '@/utilities/constants';
import { parseNumber } from '@/utilities/helperFunctions';

// Tell Jest to use the mock implementation of the store.
jest.mock('@/store');
jest.useFakeTimers();

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('ProductPage', () => {
  let storeMocks;
  let wrapper;
  let headerWrapper;
  beforeEach(() => {
    // Create a fresh store and wrapper instance for every test case.

    storeMocks = createStoreMocks();
    const router = new VueRouter();

    const options = {
      store: storeMocks.store,
      localVue,
      router,
    };

    headerWrapper = mount(Header, options);
    wrapper = mount(ProductPage, options);

    jest.useFakeTimers();
    // Wait for fake loader to finish
    setTimeout(() => { }, FAKE_WAIT_TIME_MS);
    jest.runAllTimers();
  });

  afterEach(() => {
    wrapper.destroy();
    headerWrapper.destroy();
    storeMocks.store.dispatch('resetState');
  });

  test('It should fetch items.', () => {
    expect(storeMocks.modules.products.actions.fetchProducts).toHaveBeenCalled();
  });

  test('It should have loaded list.', () => {
    const uList = wrapper.find('ul.product-list');
    expect(uList.isVisible()).toBe(true);
  });

  test(`It should have list with ${PRODUCTS_PER_PAGE} items`, () => {
    const itemList = wrapper.findAll('li.product-list__item');
    expect(itemList.length).toBe(PRODUCTS_PER_PAGE);
  });

  test('It should update cart number after "Add to Cart" button on item is clicked', () => {
    const cartComponent = headerWrapper.find('div.header-cart__count span.cart__item-counter');
    const cartCounterBeforeAddingItem = Number(cartComponent.text());
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    const cartCounterAfterAddingItem = Number(cartComponent.text());
    expect(cartCounterAfterAddingItem).toBe(cartCounterBeforeAddingItem + 1);
  });

  test('It should change "Add to Cart" button text to "In Cart" on item after it is clicked', () => {
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    const buttonToAddTextAfterClicking = addProductButton.text();
    expect(buttonToAddTextAfterClicking).toBe('In Cart');
  });

  test('It should update current price on cart after "Add to Cart" button on item is clicked', () => {
    const cartPriceComponent = headerWrapper.find('div.header-cart__price');
    const productPriceUsed = parseNumber(wrapper.find('span.product__price--discounted').text());
    const priceBeforeAddingItem = parseNumber(cartPriceComponent.text());
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    const priceAfterAddingItem = parseNumber(cartPriceComponent.text());
    expect(priceAfterAddingItem).toBe(priceBeforeAddingItem + productPriceUsed);
  });

  test('It should add item to the cart when its "Add to Cart" button is clicked.', () => {
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    expect(storeMocks.modules.products.actions.addProductToCart).toBeCalled();
  });

  test('It should update Wishlist counter after Add to Wishlist star button it is clicked', async () => {
    const wishlistComponent = headerWrapper.find('div.header-cart__wishlist-count span.wishlist__item-counter');
    const wishlistCounterBeforeAddingItem = Number(wishlistComponent.text());
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductToWishlistButton = product.findAll('button.product__wishlist-button');
    addProductToWishlistButton.trigger('click');
    const wishlistCounterAfterAddingItem = Number(wishlistComponent.text());
    expect(wishlistCounterAfterAddingItem).toBe(wishlistCounterBeforeAddingItem + 1);
  });

  test('It should add item to the wishlist when its "Add to Wishlist" star button is clicked.', () => {
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductToWishlistButton = product.findAll('button.product__wishlist-button');
    addProductToWishlistButton.trigger('click');
    expect(storeMocks.modules.products.actions.addProductToCart).toBeCalled();
  });

  test('It should show a loading spinner before items list when new page is clicked.', () => {
    const allPages = wrapper.findAll('li.pagination-custom__description');
    const pageToGoContainer = allPages.filter(i => !i.classes().includes('pagination-custom__description--current') && !i.classes().includes('nonClickable')).at(0);
    const pageToGo = pageToGoContainer.find('span');
    pageToGo.trigger('click');
    jest.useFakeTimers();
    setTimeout(() => {
      const spinner = wrapper.find('div.spinner-base');
      expect(spinner.isVisible()).toBe(true);
    }, Math.round(Math.random() * (FAKE_WAIT_TIME_MS - 1)));
    jest.runAllTimers();
  });

  test(`It should have list with ${PRODUCTS_PER_PAGE} items when new page is clicked.`, () => {
    const allPages = wrapper.findAll('li.pagination-custom__description');
    const pageToGoContainer = allPages.filter(i => !i.classes().includes('pagination-custom__description--current') && !i.classes().includes('nonClickable')).at(0);
    const pageToGo = pageToGoContainer.find('span');
    pageToGo.trigger('click');
    jest.useFakeTimers();
    setTimeout(() => {
      const itemList = wrapper.findAll('li.product-list__item');
      expect(itemList.length).toBe(PRODUCTS_PER_PAGE);
    }, FAKE_WAIT_TIME_MS);
    jest.runAllTimers();
  });

  test('It should show cart dropdown when dropdown cart icon is clicked', () => {
    const cartIcon = headerWrapper.find('#cart-icon');
    cartIcon.trigger('click');
    const cartDropdown = headerWrapper.find('div.dropdown-container');
    expect(cartDropdown.isVisible()).toBe(true);
  });

  test('It should show product on cart dropdown when product is added to cart', () => {
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    const productTitle = product.find('h1.product__title').text().replace('...', '');
    const cartIcon = headerWrapper.find('#cart-icon');
    cartIcon.trigger('click');
    const cartDropdownProductList = headerWrapper.findAll('li.list-item');
    const cartDropdownProductListFiltered = cartDropdownProductList.filter(prod => productTitle.includes(prod.find('span.item-name').text().replace('...', '')));
    expect(cartDropdownProductListFiltered.length).toBe(1);
  });

  test('It should remove product from cart dropdown when remove product on dropdown is clicked', () => {
    const allProductsOnPage = wrapper.findAll('li.product-list__item');
    const product = allProductsOnPage.at(0);
    const addProductButton = product.find('button.product__add-to-cart');
    addProductButton.trigger('click');
    const productTitle = product.find('h1.product__title').text().replace('...', '');
    const cartIcon = headerWrapper.find('#cart-icon');
    cartIcon.trigger('click');
    const cartDropdownProductListBefore = headerWrapper.findAll('li.list-item');
    const cartDropdownProductListBeforeFiltered = cartDropdownProductListBefore.filter(prod => productTitle.includes(prod.find('span.item-name').text().replace('...', '')));
    const cartDropdownProduct = cartDropdownProductListBeforeFiltered.at(0);
    const removeProductFromDropdown = cartDropdownProduct.find('svg.deleteItem');
    removeProductFromDropdown.trigger('click');
    jest.useFakeTimers();
    setTimeout(() => {
      const cartDropdownProductListAfter = headerWrapper.findAll('li.list-item');
      const cartDropdownProductListAfterFiltered = cartDropdownProductListAfter.filter(prod => productTitle.includes(prod.find('span.item-name').text()));
      expect(cartDropdownProductListAfterFiltered.length).toBe(0);
    }, 20); // Because of ugly workaround on Header, for of custom directive
    jest.runAllTimers();
  });
});


/*

  Products picked on page are always the first one (at position 0).
  This is for testing purposes and better readability. We could pick =>  Math.round(Math.random() * (PRODUCTS_PER_PAGE - 1)) position instead
  which will give us a random number between 0 and 5 (currently PRODUCTS_PER_PAGE = 6).

*/
