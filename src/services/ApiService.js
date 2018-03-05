/**
 * Created by aquispe on 23/02/2018.
 **/

import Vue from 'vue';
import Axios from 'axios';
import * as Vuex from 'vuex';
import Storage from 'vue-local-storage';
import Log from './Log';

Vue.use(Vuex, Storage);
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ENV = {
    API_UNLOCK_RESET_DB: "http://service-unlock-reset",//local API para logs del desbloqueo y reseteo.
    API: "http://192.167.99.246:8090/api",//Prod
    NAME_PROYECT: "interbank",//Prod
    API_RESET: "192.167.99.246:8090/api/unlockresetuser/resetpassword/"
};

const KEYS = ['username', 'attempts', 'description', 'status'];

const SERVICE = new Vuex.Store({
    actions: {
        //Funcion buscar
        searchText({commit}, {self}) {
            Axios.get(ENV.API + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200) {
                        self.closeLoadModal();
                        self.dataAlert = {};
                        Storage.set("data_user", r.data);
                        self.$router.replace("/action");
                    }
                })
                .catch((e) => {
                    // self.showLoadingModal = false;
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                    self.params.text_search = "";
                    self.$refs.input_search.focus();
                })
        },
        //Funcion rebuscar
        researchText({commit}, {self}) {
            Axios.get(ENV.API + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200) {
                        self.closeLoadModal();
                        self.dataAlert = {};
                        Storage.set("data_user", r.data);
                        self.data = Storage.get("data_user");
                        self.params.text_search = "";
                        self.$refs.input_search.focus();
                    }
                })
                .catch((e) => {
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                    self.params.text_search = "";
                    self.$refs.input_search.focus();
                })
        },
        //Funcion salir del sistema
        exit({commit}, {self}) {
            Storage.remove("data_user");
            self.$router.replace("/");
        },
        //Funcion desbloquear cuenta
        unlock({commit}, {self}) {
            Axios.get(ENV.API + "/unlockresetuser/unlock/" + self.params.username)
                .then((r) => {
                    if (r.status === 200) {
                        const rpta = r;
                        const params_log = paramsToObject(KEYS,[self.params.username,1,Log.logUnlockAccount(self.params.username),1]);
                        this.dispatch("createLogUnlock", {self: params_log});
                        Axios.get(ENV.API + "/unlockresetuser/search/" + self.params.username)
                            .then((r) => {
                                if (r.status === 200) {
                                    self.closeLoadModal();
                                    self.dataAlert = rpta;
                                    Storage.set("data_user", r.data);
                                    self.data = Storage.get("data_user");
                                    self.params.text_search = "";
                                    self.$refs.input_search.focus();
                                }
                            })
                            .catch((e) => {
                                self.closeLoadModal();
                                self.dataAlert = e.response;
                                self.params.text_search = "";
                                self.$refs.input_search.focus();
                            })
                    }
                })
                .catch((e) => {
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                    console.error(e);
                })
        },
        //Funcion traza para desbloquear
        createLogUnlock({commit}, {self}) {
            Axios.post(ENV.API_UNLOCK_RESET_DB + "/create-log-unlock", self)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                        return true;
                    }
                })
                .catch((e) => {
                    console.error(e.response);
                    return false;
                })
        },
        //Funcion traza para reseteo
        createLogReset({commit}, {self}) {
            Axios.post(ENV.API_UNLOCK_RESET_DB + "/create-log-reset", self)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r);
                        return true;
                    }
                })
                .catch((e) => {
                    console.error(e.response);
                    return false;
                })
        },
        //Funcion resetear contraseña
        reset({commit}, {self}) {
            Axios.post(ENV.API + "/unlockresetuser/resetpassword/" + self.params.username)
                .then((r) => {
                    if (r.status === 200) {
                        const rpta = r;
                        Axios.get(ENV.API + "/unlockresetuser/search/" + self.params.username)
                            .then((r) => {
                                if (r.status === 200) {
                                    self.closeLoadModal();
                                    self.dataAlert = rpta;
                                    Storage.set("data_user", r.data);
                                    self.data = Storage.get("data_user");
                                    self.params.text_search = "";
                                    self.$refs.input_search.focus();


                                }
                            })
                            .catch((e) => {
                                self.closeLoadModal();
                                self.dataAlert = e.response;
                                self.params.text_search = "";
                                self.$refs.input_search.focus();
                            })
                    }
                })
                .catch((e) => {
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                    console.error(e);
                })
        }
    }
});

function paramsToObject(keys,values) {
    let obj = {};
    for (let i = 0; i < values.length; i++) {
        obj[keys[i]] = values[i];
    }
    // return JSON.stringify(obj);
    return obj;
}

export default SERVICE;