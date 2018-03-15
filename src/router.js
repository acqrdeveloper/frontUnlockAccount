import Vue from 'vue'
import Router from 'vue-router'
import Storage from 'vue-local-storage'

import Actions from './components/action/Actions'
import Search from './components/search/Search'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{path: "*", redirect: '/'},
		{path: '/', name: 'search', component: Search},
		{path: '/actions', name: 'actions', component: Actions, meta: {requiresAuth: true}},
	]
})

router.beforeEach((to, from, next) => {

	if (to.path === '/') {
		Storage.remove("data_user")
		console.log("Storage removed by route!")
	}

	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	if (requiresAuth && Storage.get("data_user") === undefined) next('/')
	else next()

})

export default router