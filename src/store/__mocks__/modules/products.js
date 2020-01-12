import Vue from 'vue';
import Vuex from 'vuex';
import mockedProducts from './mockedProducts.json';

Vue.use(Vuex);

const getDefaultState = () => (
  {
    products: [],
    productsIsLoading: false,
    productsError: '',
  }
);

const state = getDefaultState();

const getters = {
  allProducts: state => state.products,
  allProductsStatus: jest.fn().mockReturnValue({ error: '', isLoading: false }),
  allProductsInCart: state => state.products.filter(product => (product ? product.isAddedToCart === true : null)),
  allProductsInWishlist: state => state.products.filter(product => (product ? product.isAddedToWishlist === true : null)),
};

const actions = {
  fetchProducts: jest.fn().mockImplementation(({ commit }, productGlobalIndex) => {
    commit('SET_PRODUCTS_SUCCESS', { products: mockedProducts, productGlobalIndex });
  }),
  addProductToCart: jest.fn().mockImplementation(({ commit }, product) => commit('ADD_PRODUCT_TO_CART', product)),
  removeProductFromCart: jest.fn().mockImplementation(({ commit }, product) => commit('REMOVE_PRODUCT_FROM_CART', product)),
  addProductToWishlist: jest.fn().mockImplementation(({ commit }, product) => commit('ADD_PRODUCT_TO_WISHLIST', product)),
  removeProductFromWishlist: jest.fn().mockImplementation(({ commit }, product) => commit('REMOVE_PRODUCT_FROM_WISHLIST', product)),
  resetState: ({ commit }) => commit('RESET_STATE'),
};

const mutations = {
  SET_PRODUCTS_SUCCESS: jest.fn().mockImplementation((state, { products, productGlobalIndex }) => {
    const formattedProducts = products.map(product => ({ ...product, isAddedToCart: false, isAddedToWishlist: false }));
    const tempArray = state.products;

    for (let i = 0; i < formattedProducts.length; i += 1) {
      tempArray[productGlobalIndex + i] = formattedProducts[i];
    }
    state.products = [...tempArray];
    state.productsIsLoading = false;
    state.productsError = '';
  }),
  SET_PRODUCTS_PENDING: jest.fn(),
  SET_PRODUCTS_ERROR: jest.fn(),
  ADD_PRODUCT_TO_CART: jest.fn().mockImplementation((state, selectedProduct) => {
    const productToAdd = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToCart = true;
    }
  }),
  REMOVE_PRODUCT_FROM_CART: jest.fn().mockImplementation((state, selectedProduct) => {
    const productToRemove = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToCart = false;
    }
  }),
  ADD_PRODUCT_TO_WISHLIST: jest.fn().mockImplementation((state, selectedProduct) => {
    const productToAdd = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToWishlist = true;
    }
  }),
  REMOVE_PRODUCT_FROM_WISHLIST: jest.fn().mockImplementation((state, selectedProduct) => {
    const productToRemove = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToWishlist = false;
    }
  }),
  RESET_STATE: state => Object.assign(state, getDefaultState()),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
