// import axios from 'axios';

const getDefaultState = () => (
  {
    products: [
      {
        uuid: '95aca17a-45cd-84cd-4517-a199dbd8524b',
        title: 'A really beautiful image of a random topic',
        description: 'You can see here something that is really nice, unexpected, you probably do not know if it is for sale or not but you want to buy it. See the price, it is not too bad.',
        price: {
          currency: 'EUR',
          originalValue: 45,
          originalPrice: '€ 85.00 ',
          discountValue: 45,
          discountPrice: '€ 45,00 ',
        },
        cover_image_url: 'https://i.picsum.photos/id/154/200/200.jpg',
        isAddedToCart: false,
        isAddedToWishlist: false,
      },
    ],
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
