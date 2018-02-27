/**
 * Created by aquispe on 20/02/2018.
 **/
import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search';
import SelectAction from './components/SelectAction';
import Storage from 'vue-local-storage';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path:"*",redirect:'/'},
        {path:'/',name:'search',component:Search},
        {path:'/action',name:'select-action',component:SelectAction,meta: {requiresAuth: true}},
    ]
});

router.beforeEach((to, from, next) => {

    if(to.path == '/search'){
        Storage.remove("data_user");
        console.log("Storage removed!");
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && Storage.get("data_user") == undefined) {
        next('/search');
    } else {
        next();
    }

});

export default router;