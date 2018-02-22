import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import "bootstrap";

Vue.config.productionTip = false;

new Vue({
    router,
    render: (tpl) => tpl(App),
}).$mount('#app');