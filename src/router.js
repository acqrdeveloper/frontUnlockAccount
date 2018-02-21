/**
 * Created by aquispe on 20/02/2018.
 **/
import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search';
import SelectAction from './components/SelectAction';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {path:'/search',name:'search',component:Search},
        {path:'/select-action',name:'select-action',component:SelectAction}
    ]
});

export default router;