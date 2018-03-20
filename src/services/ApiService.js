/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Axios from 'axios'
import * as Vuex from 'vuex'
import Storage from 'vue-local-storage'
import Util from './../util'
import env from './../env'

Vue.use(Vuex, Storage)
Axios.defaults.headers.common['X-Request-Project'] = env.name_proyect
Axios.defaults.headers.common['x-access-token'] = Storage.get('data_token_nodejs')
Axios.defaults.headers.common['X-Access-Token-Lvl'] = Storage.get('data_token_lvl')

const SERVICE = new Vuex.Store({
	actions: {
		// TOKENS - generar token para el servicio LDAP y Laravel
		generateTokenLDAP ({commit}, {self}) {
			Axios.get(env.api_ldap + '/authtoken/generate')
				.then(r => {
					Storage.set('data_token_nodejs', r.data.token)
					if (r.data.token != undefined) {
						Axios.defaults.headers.common['x-access-token'] = Storage.get('data_token_nodejs')
					} else {
						delete Axios.defaults.headers.common['x-access-token']
						self.dataAlert = {
							status: 500,
							data: 'Ocurrio un problema, actualice su navegador',
							class: 'danger'
						}
					}
				})
				.catch(e => {
					if (e.response == undefined) {
						self.dataAlert = {
							status: 500,
							data: 'Ocurrio un problema, actualice su navegador',
							class: 'danger'
						}
					} else {
						self.dataAlert = e.response
					}
				})
		},

		generateTokenLaravel () {
			Axios.get(env.api_log + '/generate-token')
				.then(r => {
					Storage.set('data_token_lvl', r.data.token)
					if (r.data.token != undefined) Axios.defaults.headers.common['X-Access-Token-Lvl'] = Storage.get('data_token_lvl')
					else delete Axios.defaults.headers.common['X-Access-Token-Lvl']
				})
				.catch(e => {
					if (e.response == undefined) console.log(['Laravel => Estimado usuario su sesion ha terminado, actualice su navegador'])
					else console.log(['Laravel => ' + e.response])
				})
		},

		searchText ({commit}, {self}) {
			Util.openLoadModal(self)
			Axios.get(env.api_ldap + '/api/unlockresetuser/search/' + self.params.text_search)
				.then(r => {
					if (r.status === 200) {
						Util.closeLoadModal(self)
						self.dataAlert = {}
						Storage.set('data_user', r.data)
						self.$router.replace('/actions')
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					self.dataAlert = e.response
				})
				.finally(() => {
					self.new_params = {
						username: self.params.username,
						description: 'Alguien busco ' + self.params.text_search + ' con éxito',
						status: 1
					}
					this.dispatch('createLogSearch', {self: self})
					if (self.$route.path == '/') {
						if (self.$children[2].$refs.inputSearch != undefined) {
							self.params.text_search = ''
							self.$children[2].$refs.inputSearch.focus()
						}
					} else {
						if (self.$children[1].$refs.inputSearch != undefined) {
							self.params.text_search = ''
							self.$children[1].$refs.inputSearch.focus()
						}
					}
				})
		},

		createLogSearch ({commit}, {self}) {
			Axios.post(env.api_log + '/create-log-search', self.new_params)
				.then(r => {
					if (r.status == 200) {
						console.log(r.statusText)
					}
				})
				.catch(e => {
					console.error(e.response.statusText)
				})
		},

		researchText ({commit}, {self}) {
			Util.openLoadModal(self)
			Axios.get(env.api_ldap + '/api/unlockresetuser/search/' + self.params.text_search)
				.then(r => {
					if (r.status === 200) {
						Util.closeLoadModal(self)
						self.dataAlert = {}
						Storage.set('data_user', r.data)
						self.data = Storage.get('data_user')
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					self.dataAlert = e.response
				})
				.finally(() => {
					self.params.text_search = ''
					self.$children[3].$refs.inputSearch.focus()
				})
		},

		unlock ({commit}, {self}) {
			Axios.get(env.api_ldap + '/api/unlockresetuser/unlock/' + self.params.username)
				.then(r => {
					if (r.status === 200) {
						const log = {
							username: self.params.username,
							description: self.params.username + ' desbloqueó su cuenta con éxito',
							status: 1
						}
						this.dispatch('createLogUnlock', {self: {newparams: log, subself: self, temp: r}})
					}
				})
				.catch(e => {
					const log = {
						username: self.params.username,
						description: self.params.username + ' no pudo desbloquear su cuenta',
						message: e.response.data,
						status: 2
					}
					const msg_error = {status: 412, data: e.response.data}
					this.dispatch('createLogUnlock', {self: {newparams: log, subself: self, temp: msg_error}})
				})
		},

		createLogUnlock ({commit}, {self}) {
			Util.openLoadModal(self)
			Axios.post(env.api_log + '/create-log-unlock', self.newparams)
				.then(r => {
					if (r.status === 200) {
						Axios.get(env.api_ldap + '/api/unlockresetuser/search/' + self.subself.params.username)
							.then(r => {
								if (r.status === 200) {
									Util.closeLoadModal(self)
									self.subself.dataAlert = self.temp
									Storage.set('data_user', r.data)
									self.subself.data = Storage.get('data_user')
								}
							})
							.catch(e => {
								Util.closeLoadModal(self)
								self.subself.dataAlert = e.response
							})
							.finally(() => {
								self.subself.text_search = ''
								self.subself.$refs.inputSearch.focus()
							})
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					self.subself.dataAlert = e.response
				})
		},

		reset ({commit}, {self}) {
			Util.openLoadModal(self)
			Axios.post(env.api_ldap + '/api/unlockresetuser/resetpassword', self.params)
				.then(r => {
					if (r.status === 200) {
						Axios.get(env.api_ldap + '/api/unlockresetuser/search/' + self.params.username)
							.then((rpta) => {
								if (rpta.status === 200) {
									Util.closeLoadModal(self)
									self.dataAlert = r
									Storage.set('data_user', rpta.data)
									self.data = Storage.get('data_user')
									self.dataReset.showInfo = false
									self.dataReset.showAccept = false
									self.dataReset.showResetPwd = false
								}
							})
							.catch(e => {
								Util.closeLoadModal(self)
								self.dataAlert = e.response
							})
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					self.dataAlert = e.response
					console.error(e)
				})
				.finally(() => {
					self.new_params = {
						username: self.params.username,
						description: self.params.username + ' reseteo su contraseña',
						status: 1
					}
					this.dispatch('createLogReset', {self: self})
				})
		},

		createLogReset ({commit}, {self}) {
			Axios.post(env.api_log + '/create-log-reset', self.new_params)
				.then(r => {
					if (r.status === 200) console.log(r.statusText)
				})
				.catch(e => console.log(e.response.statusText))
		},

		acceptReceivedCode ({commit}, {self}) {
			Util.openLoadModal(self)
			const new_params = {nameApp: 'frontend', phone: '51' + Storage.get('data_user').phone_number}
			Axios.post(env.api_sms + '/sms/f2a/pin', new_params)
				.then(r => {
					if (r.status === 200) {
						Util.closeLoadModal(self)
						self.dataAlert = {}
						Storage.set('data_api_sms', r.data)
						self.dataReset.showInfo = false
						self.dataReset.showAccept = true
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					console.error(e)
					self.dataAlert = e.response
				})
		},

		sendReceivedCode ({commit}, {self}) {
			Util.openLoadModal(self)
			const new_params = {pinId: Storage.get('data_api_sms').pinId, pin: self.params.pin}
			Axios.post(env.api_sms + '/sms/f2a/verify', new_params)
				.then(r => {
					if (r.status === 200) {
						Util.closeLoadModal(self)
						self.dataAlert = {}
						self.dataReset.showAccept = false
						self.dataReset.showResetPwd = true
					}
				})
				.catch(e => {
					Util.closeLoadModal(self)
					console.error(e)
					self.dataAlert = e.response
				})
				.finally(() => {
					self.params.pin = ''
					self.$children[1].$refs.inputPin.focus()
				})
		},

		exit ({commit}, {self}) {
			delete Axios.defaults.headers.common['x-access-token']
			delete Axios.defaults.headers.common['X-Access-Token-Lvl']
			Storage.remove('data_user')
			Storage.remove('data_token_nodejs')
			Storage.remove('data_token_lvl')
			self.$router.replace('/')
			console.log('All storage removed')
		},
	}
})

export default SERVICE