import Vue from 'vue'
import App from './App.vue'
import './index.scss'
import { VueMasonryPlugin } from 'vue-masonry';

Vue.config.productionTip = false
Vue.use(VueMasonryPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
