/* eslint-disable no-unused-vars */
import Vue       from 'vue'
import Axios     from 'axios'
import * as Vuex from 'vuex'
import Storage   from 'vue-local-storage'
import Util      from './../util'
import Env       from './../env'

Vue.use(Vuex)

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Axios.defaults.headers.common['X-Request-Project'] = 'interbank'
Axios.defaults.headers.common['X-Access-Token'] = Storage.get('data_token')

export default new Vuex.Store({
  actions: {
    generateTokenLaravel() {
      Axios.get(Env.API_LARAVEL + '/generate-token').then(r => {
        Storage.set('data_token', r.data.token)
        if (r.data.token != undefined) {
          Axios.defaults.headers.common['X-Access-Token'] = Storage.get('data_token')
        } else {
          delete Axios.defaults.headers.common['X-Access-Token']
        }
      }).catch((e) => {
        if (e.response == undefined) {
          console.log(['Laravel => Estimado usuario su sesion ha terminado, actualice su navegador'])
        } else {
          console.log(['Laravel => ' + e.response])
        }
      })
    },

    validateReset({commit}, {self}) {
      Util.openLoadModal(self)
      Axios.get(Env.API_LARAVEL + '/active-directory/validate-reset').
      then((r) => {
        if (r.status === 200) {
          Util.closeLoadModal(self)
          self.dataAlert = {}
          if (r.data) self.validatePhone()
        }
      }).
      catch((e) => {
        Util.closeLoadModal(self)
        self.dataAlert = e.response
      })
    },

    searchText({commit}, {self}) {
      Util.openLoadModal(self)
      self.new_params = {}
      Axios.get(Env.API_LARAVEL + '/active-directory/search',
        {params: self.params}).then(r => {
        if (r.status === 200) {
          Util.closeLoadModal(self)
          self.dataAlert = {}
          Storage.set('data_user', r.data)
          self.$router.replace('/actions')
          self.new_params = {
            description: 'Alguien buscó ' + self.params.text_search,
            status: 1,
          }
        }
      }).catch(e => {
        Util.closeLoadModal(self)
        self.dataAlert = e.response
        self.new_params = {
          description: 'Alguien buscó ' + self.params.text_search,
          message: e.response.data,
          status: 0,
        }
      }).finally(() => {
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
    createLogSearch({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-log-search', self.new_params).
      then(r => {
        if (r.status == 200) {
          console.log(r.statusText)
        }
      }).
      catch(e => {
        console.log(e.response.statusText)
      })
    },
    researchText({commit}, {self}) {
      Util.openLoadModal(self)
      Axios.get(Env.API_LARAVEL + '/active-directory/search',
        {params: self.params}).then(r => {
        if (r.status === 200) {
          Util.closeLoadModal(self)
          self.dataAlert = {}
          Storage.set('data_user', r.data)
          self.data = Storage.get('data_user')
          self.new_params = {
            description: 'Alguien buscó ' + self.params.text_search,
            status: 1,
          }
        }
      }).catch(e => {
        Util.closeLoadModal(self)
        self.dataAlert = e.response
        self.new_params = {
          description: 'Alguien buscó ' + self.params.text_search,
          message: e.response.data,
          status: 0,
        }
      }).finally(() => {
        this.dispatch('createLogSearch', {self: self})
        self.params.text_search = ''
        console.log(self.$children)
        self.$children[3].$refs.inputSearch.focus()
      })
    },

    unlock({commit}, {self}) {
      Util.openLoadModal(self)
      self.new_params = {}
      Axios.get(Env.API_LARAVEL + '/active-directory/unlock',
        {params: self.params}).then(r => {
        if (r.status === 200) {
          let msg = r
          self.params.text_search = self.params.username
          Axios.get(Env.API_LARAVEL + '/active-directory/search',
            {params: self.params}).then(r => {
            if (r.status === 200) {
              Util.closeLoadModal(self)
              self.dataAlert = msg
              Storage.set('data_user', r.data)
              self.data = Storage.get('data_user')
            }
          }).catch((e) => {
            Util.closeLoadModal(self)
            self.dataAlert = e.response
          })
          self.new_params = {
            username: self.params.username,
            description: self.params.username + ' realizó la accion de desbloquear su cuenta',
            status: 1,
          }
        }
      }).catch(e => {
        Util.closeLoadModal(self)
        self.dataAlert = e.response
        self.new_params = {
          username: self.params.username,
          description: self.params.username + ' realizó la accion de desbloquear su cuenta',
          message: e.response.data,
          status: 0,
        }
      }).finally(() => {
        this.dispatch('createLogUnlock', {self: self})
        self.params.text_search = ''
      })
    },
    createLogUnlock({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-log-unlock', self.new_params).
      then(r => {
        if (r.status === 200) console.log(r.statusText)
      }).
      catch((e) => {
        console.log(e.response.statusText)
      })

    },

    reset({commit}, {self}) {
      Util.openLoadModal(self)
      self.new_params = {}
      Axios.post(Env.API_LARAVEL + '/unlockresetuser/resetpassword',
        self.params).
      then(r => {
        if (r.status === 200) {
          Axios.get(Env.API_LARAVEL + '/unlockresetuser/search/' +
            self.params.username).then((rpta) => {
            if (rpta.status === 200) {
              Util.closeLoadModal(self)
              self.dataAlert = r
              Storage.set('data_user', rpta.data)
              self.data = Storage.get('data_user')
              self.dataReset.showInfo = false
              self.dataReset.showAccept = false
              self.dataReset.showResetPwd = false
            }
          }).catch(e => {
            Util.closeLoadModal(self)
            self.dataAlert = e.response
          })
          self.new_params = {
            username: self.params.username,
            description: self.params.username + ' realizó la acción de resetear su contraseña',
            status: 1,
          }
        }
      }).
      catch(e => {
        Util.closeLoadModal(self)
        self.dataAlert = e.response
        self.new_params = {
          username: self.params.username,
          description: self.params.username +
          ' realizó la acción de resetear su contraseña',
          message: e.response.data,
          status: 0,
        }
      }).
      finally(() => {
        this.dispatch('createLogReset', {self: self})
      })
    },
    createLogReset({commit}, {self}) {
      Axios.post(Env.API_LARAVEL + '/create-log-reset', self.new_params).
      then(r => {
        if (r.status === 200) console.log(r.statusText)
      }).
      catch(e => {
        console.log(e.response.statusText)
      })
    },

    acceptReceivedCode({commit}, {self}) {
      Util.openLoadModal(self)
      const new_params = {
        nameApp: 'ApiCorporacionSapia',
        phone: '51' + Storage.get('data_user').phone_number,
      }
      Axios.post(Env.api_sms + '/sms/f2a/pin', new_params).then(r => {
        if (r.status === 200) {
          Util.closeLoadModal(self)
          self.dataAlert = {}
          Storage.set('data_api_sms', r.data)
          self.dataReset.showInfo = false
          self.dataReset.showAccept = true
        }
      }).catch(e => {
        Util.closeLoadModal(self)
        console.log(e)
        self.dataAlert = e.response
      })
    },
    sendReceivedCode({commit}, {self}) {
      Util.openLoadModal(self)
      const new_params = {
        pinId: Storage.get('data_api_sms').pinId,
        pin: self.params.pin,
      }
      Axios.post(Env.api_sms + '/sms/f2a/verify', new_params).then(r => {
        if (r.status === 200) {
          Util.closeLoadModal(self)
          self.dataAlert = {}
          self.dataReset.showAccept = false
          self.dataReset.showResetPwd = true
        }
      }).catch(e => {
        Util.closeLoadModal(self)
        console.error(e.response)
        self.dataAlert = e.response
      }).finally(() => {
        self.params.pin = ''
        self.$children[1].$refs.inputPin.focus()
      })
    },

    exit({commit}, {self}) {
      delete Axios.defaults.headers.common['X-Access-Token']
      Storage.remove('data_token')
      Storage.remove('data_user')
      self.$router.replace('/')
    },
  },
})