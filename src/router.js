/**
 * Created by aquispe on 20/02/2018.
 **/
import Vue from 'vue';
import Router from 'vue-router';
import Actions from './components/action/Actions';
import Storage from 'vue-local-storage';


import Login from './components/login/Login';
import Search from './components/search/Search';
import SearchAdmin from './components/search/SearchAdmin';
import Reset from './components/reset/Reset';
import ResetAdmin from './components/reset/ResetAdmin';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path: "*", redirect: '/'},
        {path: '/actions', name: 'actions', component: Actions, meta: {requiresAuth: true}},
        //Reestructuracion del proyecto
        {path: '/', name: 'search', component: Search},
        {path: '/login', name: 'login', component: Login},
        {path: '/admin-search', name: 'search-admin', component: SearchAdmin},
        {path: '/reset', name: 'reset', component: Reset},
        {path: '/admin-reset', name: 'reset-admin', component: ResetAdmin},
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