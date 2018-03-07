/**
 * Created by aquispe on 20/02/2018.
 **/
import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index';
import Actions from './components/action/Actions';
import Storage from 'vue-local-storage';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: "*", redirect: '/'},
        {path: '/', name: 'index', component: Index},
        {path: '/actions', name: 'actions', component: Actions, meta: {requiresAuth: true}},
    ]
});

router.beforeEach((to, from, next) => {

    if (to.path === '/') {
        Storage.remove("data_user");
        console.log("Storage removed by route!");
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && Storage.get("data_user") === undefined) {
        next('/');
    } else {
        next();
    }

});

export default router;