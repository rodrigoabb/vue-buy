// import axios from 'axios';
import mockedProducts from './mockedProducts.json';
import { PRODUCTS_PER_PAGE } from '@/utilities/constants';

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
  allProductsStatus: state => ({ error: state.productsError, isLoading: state.productsIsLoading }),
  allProductsInCart: state => state.products.filter(product => (product ? product.isAddedToCart === true : null)),
  allProductsInWishlist: state => state.products.filter(product => (product ? product.isAddedToWishlist === true : null)),
};

const actions = {
  fetchProducts({ commit }, productGlobalIndex) {
    commit('SET_PRODUCTS_PENDING');
    // Some API call to retrieve products, then will either commit SET_PRODUCTS_SUCCESS or SET_PRODUCTS_ERROR
    // For now, we're just going to use mocked data and fake return time
    const delayMS = Math.round((Math.random() * (1100 - 400) + 400));
    return new Promise(() => {
      setTimeout(() => {
        const productsForThisPage = mockedProducts.slice(productGlobalIndex, productGlobalIndex + PRODUCTS_PER_PAGE);
        commit('SET_PRODUCTS_SUCCESS', { products: productsForThisPage, productGlobalIndex });
      }, delayMS);
    });
  },
  addProductToCart({ commit }, product) {
    commit('ADD_PRODUCT_TO_CART', product);
  },
  removeProductFromCart({ commit }, product) {
    commit('REMOVE_PRODUCT_FROM_CART', product);
  },
  addProductToWishlist({ commit }, product) {
    commit('ADD_PRODUCT_TO_WISHLIST', product);
  },
  removeProductFromWishlist({ commit }, product) {
    commit('REMOVE_PRODUCT_FROM_WISHLIST', product);
  },
  resetState: ({ commit }) => commit('RESET_STATE'),
};

const mutations = {
  SET_PRODUCTS_SUCCESS: (state, { products, productGlobalIndex }) => {
    const formattedProducts = products.map(product => (
      {
        ...product,
        isAddedToCart: false,
        isAddedToWishlist: false,
      }
    ));
    const tempArray = state.products;
    for (let i = 0; i < formattedProducts.length; i += 1) {
      tempArray[productGlobalIndex + i] = formattedProducts[i];
    }
    state.products = [...tempArray];
    state.productsIsLoading = false;
    state.productsError = '';
  },
  SET_PRODUCTS_PENDING: (state) => {
    state.productsIsLoading = true;
    state.productsError = '';
  },
  SET_PRODUCTS_ERROR: (state, error) => {
    state.productsIsLoading = false;
    state.productsError = error;
  },
  ADD_PRODUCT_TO_CART: (state, selectedProduct) => {
    const productToAdd = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToCart = true;
    }
  },
  REMOVE_PRODUCT_FROM_CART: (state, selectedProduct) => {
    const productToRemove = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToCart = false;
    }
  },
  ADD_PRODUCT_TO_WISHLIST: (state, selectedProduct) => {
    const productToAdd = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToWishlist = true;
    }
  },
  REMOVE_PRODUCT_FROM_WISHLIST: (state, selectedProduct) => {
    const productToRemove = state.products.find(product => product && product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToWishlist = false;
    }
  },
  RESET_STATE: state => Object.assign(state, getDefaultState()),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
