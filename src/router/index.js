import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductListPage from '@/views/ProductListPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'productListPage',
    component: ProductListPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
