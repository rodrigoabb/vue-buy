// import axios from 'axios';

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
  fetchProducts({ commit }) {
    commit('SET_PRODUCTS_PENDING');
    // Some API call to retrieve products, then will either commit SET_PRODUCTS_SUCCESS or SET_PRODUCTS_ERROR
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
};

const mutations = {
  SET_PRODUCTS_SUCCESS: (state, { products }) => {
    state.products = [products];
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
    const productToAdd = state.products.find(product => product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToCart = true;
    }
  },
  REMOVE_PRODUCT_FROM_CART: (state, selectedProduct) => {
    const productToRemove = state.products.find(product => product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToCart = false;
    }
  },
  ADD_PRODUCT_TO_WISHLIST: (state, selectedProduct) => {
    const productToAdd = state.products.find(product => product.uuid === selectedProduct.uuid);
    if (productToAdd) {
      productToAdd.isAddedToWishlist = true;
    }
  },
  REMOVE_PRODUCT_FROM_WISHLIST: (state, selectedProduct) => {
    const productToRemove = state.products.find(product => product.uuid === selectedProduct.uuid);
    if (productToRemove) {
      productToRemove.isAddedToWishlist = false;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
