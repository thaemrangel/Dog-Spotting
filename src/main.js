import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'; 
import VueResource from 'vue-resource';
import CardCachorro from './components/CardCachorro.vue'

Vue.config.productionTip = false 
Vue.use(VueResource)

// Retirar isso aqui depois
Vue.component('card-cachorro', CardCachorro)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
