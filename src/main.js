import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import "bootstrap";
// import 'font-awesome/css/font-awesome.css';
// require('font-awesome/css/font-awesome.css');

Vue.config.productionTip = false;

new Vue({
    router,
    render: (tpl) => tpl(App),
}).$mount('#app');

// new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>'
// });

