import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform'; //carrega para que a diretiva sejacarregada e qualquer lugar
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

// registrando o módulo/plugin no global view object
Vue.use(VueResource); //o global view Object-->
Vue.http.options.root = "http://localhost:3000"

Vue.use(VueRouter);

// criar um roteador com base na rota  com o auxilo do VueRouter assim sendo usado pela aplicação
const router = new VueRouter({
  routes: routes,
  mode: 'history' /* faz com que some a # do endereço no servidor, para isso funcionar o servidor hospedado tem que ter essa opção
        no caso do vuecli já tem */
})

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
})

new Vue({
  el: '#app',
  // router: router, ou o de baixo
  router, /*Quando a propriedade tem o mesmo nome do objeto que vai receber, pode colocar somente o nome da propriedade*/
  render: h => h(App)
})
