import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import CardCachorro from './components/CardCachorro.vue'

Vue.config.productionTip = false
Vue.component('card-cachorro', CardCachorro)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
