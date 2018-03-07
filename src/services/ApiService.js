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
Axios.defaults.headers.common['X-Request-Project'] = 'interbank';//name proyect necesary for api lumen

const ENV = {
    API_LUMEN: "http://service-unlock-reset",//Domain server micro-framework - lumen
    // API_NODE: "http://192.167.99.246:8090/api",//Domain server nodejs
    API_NODE: "http://192.167.99.203:8090/api",//Domain server nodejs
    NAME_PROYECT: "interbank",//Variable global
};
// const HEADER_DB = {headers: {'X-Request-Project': 'interbank'}};
const SERVICE = new Vuex.Store({
    actions: {
        //Funcion generar token para el servicio LDAP
        generateTokenLDAP({commit}, {self}) {
            Axios.get("http://192.167.99.203:8090/authtoken/generate")
                .then((r) => {
                    r.data.token != undefined ? Axios.defaults.headers.common['x-access-token'] = r.data.token : self.dataAlert = {
                        status: 500,
                        data: "Estimado no hay token"
                    };
                })
                .catch((e) => {
                    if (e.response == undefined) {
                        self.dataAlert = {
                            status: 500,
                            data: "Estimado su sesion ha expirado porfavor, actualice su navegador",
                            class: "danger"
                        };
                    } else {
                        self.dataAlert = e.response;
                    }
                })
        },
        //Funcion salir del sistema
        exit({commit}, {self}) {
            Storage.remove("data_user");
            self.$router.replace("/");
            console.log("Storage removed by exit!");
        },

        //SEARCH
        //Funcion buscar
        searchText({commit}, {self}) {
            Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200) {
                        const log = {
                            username: self.params.username,
                            description: "Alguien busco " + self.params.text_search + " con éxito",
                            status: 1
                        };
                        this.dispatch("createLogSearch", {self: {new_params: log, subself: self, temp_data: r}});
                    }
                })
                .catch((e) => {
                    const log = {
                        username: self.params.username,
                        description: "Alguien busco " + self.params.text_search + " sin éxito",
                        message: e.response.data,
                        status: 2
                    };
                    this.dispatch("createLogSearch", {self: {new_params: log, subself: self, temp_data: e}});
                })
        },
        //Funcion traza para buscar
        createLogSearch({commit}, {self}) {
            Axios.post(ENV.API_LUMEN + "/create-log-search", self.new_params)
                .then((r) => {
                    self.subself.closeLoadModal();
                    if (r.status == 200) {
                        //Validar que sea un error de servidor
                        if (typeof self.temp_data.response == 'string') {
                            self.subself.dataAlert = {
                                status: 500,
                                data: "Estimado estamos trabajando en los servidores, favor de reintentar conectarse nuevamente o mas tarde",
                                class: "warning"
                            };
                        }
                        //Validar que sea un objeto
                        if (typeof self.temp_data == 'object') {
                            //Status Error desde la api NODE
                            if (self.temp_data.response != undefined) {
                                if (self.temp_data.response.status === 412) {
                                    self.subself.dataAlert = self.temp_data.response;
                                }
                            }
                            //Status Correcto desde la api NODE
                            if (self.temp_data.status === 200) {
                                self.subself.dataAlert = {};
                                Storage.set("data_user", self.temp_data.data);
                                self.subself.$router.replace("/actions");
                            }
                        }
                    }
                })
                .catch((e) => {
                    self.subself.closeLoadModal();
                    self.subself.dataAlert = e.response;
                })
                .finally(() => {
                    if (self.subself.$refs.inputSearch != undefined) {
                        self.subself.params.text_search = "";
                        self.subself.$refs.inputSearch.focus();
                    }
                })
        },
        //Funcion rebuscar
        researchText({commit}, {self}) {
            Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200) {
                        self.closeLoadModal();
                        self.dataAlert = {};
                        Storage.set("data_user", r.data);
                        self.data = Storage.get("data_user");
                    }
                })
                .catch((e) => {
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                })
                .finally(() => {
                    self.params.text_search = "";
                    self.$refs.inputSearch.focus();
                })
        },

        //UNLOCK
        //Funcion desbloquear cuenta
        unlock({commit}, {self}) {
            Axios.get(ENV.API_NODE + "/unlockresetuser/unlock/" + self.params.username)
                .then((r) => {
                    if (r.status === 200) {
                        const log = {
                            username: self.params.username,
                            description: Log.logUnlockAccountSuccess(self.params.username),
                            status: 1
                        };
                        this.dispatch("createLogUnlock", {self: {newparams: log, subself: self, temp: r}});
                    }
                })
                .catch((e) => {
                    const log = {
                        username: self.params.username,
                        description: Log.logUnlockAccountError(self.params.username),
                        message: e.response.data,
                        status: 2
                    };
                    const msg_error = {status: 412, data: e.response.data};
                    this.dispatch("createLogUnlock", {self: {newparams: log, subself: self, temp: msg_error}});
                })
        },
        //Funcion traza para desbloquear
        createLogUnlock({commit}, {self}) {
            Axios.post(ENV.API_LUMEN + "/create-log-unlock", self.newparams)
                .then((r) => {
                    if (r.status === 200) {
                        Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.subself.params.username)
                            .then((r) => {
                                if (r.status === 200) {
                                    self.subself.closeLoadModal();
                                    self.subself.dataAlert = self.temp;
                                    Storage.set("data_user", r.data);
                                    self.subself.data = Storage.get("data_user");
                                }
                            })
                            .catch((e) => {
                                self.subself.closeLoadModal();
                                self.subself.dataAlert = e.response;
                            })
                            .finally(() => {
                                self.subself.text_search = "";
                                self.subself.$refs.inputSearch.focus();
                            })
                    }
                })
                .catch((e) => {
                    self.subself.closeLoadModal();
                    self.subself.dataAlert = e.response;
                })
        },

        //RESET
        //Funcion resetear contraseña
        reset({commit}, {self}) {
            Axios.post(ENV.API_NODE + "/unlockresetuser/resetpassword",self.params)
                .then((r) => {
                    if (r.status === 200) {
                        const rpta = r;
                        Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.params.username)
                            .then((r) => {
                                if (r.status === 200) {
                                    self.closeLoadModal();
                                    self.dataAlert = rpta;
                                    Storage.set("data_user", r.data);
                                    self.data = Storage.get("data_user");
                                    self.dataReset.showInfo =  false;
                                    self.dataReset.showAccept =  false;
                                    self.dataReset.showResetPwd =  false;
                                }
                            })
                            .catch((e) => {
                                self.closeLoadModal();
                                self.dataAlert = e.response;
                            })
                            .finally(() => {
                                self.params.text_search = "";
                                self.$refs.inputSearch.focus();
                            })
                    }
                })
                .catch((e) => {
                    self.closeLoadModal();
                    self.dataAlert = e.response;
                    console.error(e);
                })
        },
        //Funcion traza para reseteo
        createLogReset({commit}, {self}) {
            Axios.post(ENV.API_LUMEN + "/create-log-reset", self)
                .then((r) => {
                    if (r.status === 200) {
                        return true;
                    }
                })
                .catch((e) => {
                    return false;
                })
        }
    }
});

function paramsToObject(keys, values) {
    let obj = {};
    for (let i = 0; i < values.length; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}

export default SERVICE;