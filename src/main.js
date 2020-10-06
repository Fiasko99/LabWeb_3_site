import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueRosource from 'vue-resource'
import Main from './components/main.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueRosource);

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
