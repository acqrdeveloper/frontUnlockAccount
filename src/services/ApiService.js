/**
 * Created by aquispe on 23/02/2018.
 **/

import Vue from 'vue';
import Axios from 'axios';
import * as Vuex from 'vuex';
import Storage from 'vue-local-storage';
import Log from './Log';
import Util from './../util';
import ENV from './../env';

Vue.use(Vuex, Storage);
Axios.defaults.headers.common['X-Request-Project'] = ENV.NAME_PROYECT;//name proyect necesary for api lumen
Axios.defaults.headers.common['x-access-token'] = Storage.get("data_token_nodejs");
Axios.defaults.headers.common['X-Access-Token-Lvl'] = Storage.get("data_token_lvl");

const SERVICE = new Vuex.Store({
    actions: {
        //TOKENS
        //Funcion generar token para el servicio LDAP y Laravel
        generateTokenLDAP({commit}, {self}) {
            Axios.get(ENV.API_TOKEN_NODE)
                .then((r) => {
                    Storage.set("data_token_nodejs", r.data.token);
                    if (r.data.token != undefined) {
                        Axios.defaults.headers.common['x-access-token'] = Storage.get("data_token_nodejs");
                    } else {
                        delete Axios.defaults.headers.common['x-access-token'];
                        self.dataAlert = {
                            status: 500,
                            data: "Estimado usuario su sesion ha terminado, actualice su navegador",
                            class: "danger"
                        };
                    }
                })
                .catch((e) => {
                    if (e.response == undefined) {
                        self.dataAlert = {
                            status: 500,
                            data: "Estimado usuario su sesion ha terminado, actualice su navegador",
                            class: "danger"
                        };
                    } else {
                        self.dataAlert = e.response;
                    }
                })
        },
        generateTokenLaravel({commit}, {self}) {
            Axios.get(ENV.API_TOKEN_LARAVEL)
                .then((r) => {
                    Storage.set("data_token_lvl", r.data.token);
                    if (r.data.token != undefined) {
                        Axios.defaults.headers.common['X-Access-Token-Lvl'] = Storage.get("data_token_lvl");
                    } else {
                        delete Axios.defaults.headers.common['X-Access-Token-Lvl'];
                        console.log(["Laravel => Estimado usuario su sesion ha terminado, actualice su navegador"]);
                    }
                })
                .catch((e) => {
                    console.log(e.response);
                    if (e.response == undefined) {
                        console.log(["Laravel => Estimado usuario su sesion ha terminado, actualice su navegador"]);
                    } else {
                        console.log(["Laravel => " + e.response]);
                    }
                })
        },
        //SEARCH
        //Funcion buscar
        searchText({commit}, {self}) {
            Util.openLoadModal(self);
            Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200) {
                        Util.closeLoadModal(self);
                        self.dataAlert = {};
                        Storage.set("data_user", r.data);
                        self.$router.replace("/actions");
                    }
                })
                .catch((e) => {
                    Util.closeLoadModal(self);
                    self.dataAlert = e.response;
                })
                .finally(() => {
                    self.new_params = {
                        username: self.params.username,
                        description: "Alguien busco " + self.params.text_search + " con éxito",
                        status: 1
                    };
                    this.dispatch("createLogSearch", {self: self});
                    if (self.$route.path == '/') {
                        if (self.$children[2].$refs.inputSearch != undefined) {
                            self.params.text_search = "";
                            self.$children[2].$refs.inputSearch.focus();
                        }
                    } else {//path == '/admin-search'
                        if (self.$children[1].$refs.inputSearch != undefined) {
                            self.params.text_search = "";
                            self.$children[1].$refs.inputSearch.focus();
                        }
                    }
                });
        },
        //Funcion traza para buscar
        createLogSearch({commit}, {self}) {
            Axios.post(ENV.API_LARAVEL + "/create-log-search", self.new_params)
                .then((r) => {
                    if (r.status == 200) {
                        console.log(r.statusText);
                    }
                })
                .catch((e) => {
                    console.error(e.response.statusText);
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
                    self.$children[3].$refs.inputSearch.focus();
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
            Axios.post(ENV.API_LARAVEL + "/create-log-unlock", self.newparams)
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
            Util.openLoadModal(self);
            Axios.post(ENV.API_NODE + "/unlockresetuser/resetpassword", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        Axios.get(ENV.API_NODE + "/unlockresetuser/search/" + self.params.username)
                            .then((rpta) => {
                                if (rpta.status === 200) {
                                    Util.closeLoadModal(self);
                                    self.dataAlert = r;
                                    Storage.set("data_user", rpta.data);
                                    self.data = Storage.get("data_user");
                                    self.dataReset.showInfo = false;
                                    self.dataReset.showAccept = false;
                                    self.dataReset.showResetPwd = false;
                                }
                            })
                            .catch((e) => {
                                Util.closeLoadModal(self);
                                self.dataAlert = e.response;
                            })
                    }
                })
                .catch((e) => {
                    Util.closeLoadModal(self);
                    self.dataAlert = e.response;
                    console.error(e);
                })
                .finally(() => {
                    self.new_params = {
                        username: self.params.username,
                        description: self.params.username + " reseteo su contraseña",
                        status: 1
                    };
                    this.dispatch("createLogReset", {self: self})
                })
        },
        //Funcion traza para reseteo
        createLogReset({commit}, {self}) {
            Axios.post(ENV.API_LARAVEL + "/create-log-reset", self.new_params)
                .then((r) => {
                    if (r.status === 200) {
                        console.log(r.statusText);
                    }
                })
                .catch((e) => {
                    console.log(e.response.statusText);
                })
        },
        acceptReceivedCode({commit}, {self}) {
            Util.openLoadModal(self);
            const new_params = {nameApp: "frontend", phone: "51" + Storage.get("data_user").phone_number};
            Axios.post("http://192.167.99.246:8087/sms/f2a/pin", new_params)
                .then((r) => {
                    if (r.status === 200) {
                        Util.closeLoadModal(self);
                        self.dataAlert = {};
                        Storage.set("data_api_sms", r.data);
                        self.dataReset.showInfo = false;
                        self.dataReset.showAccept = true;
                    }
                })
                .catch((e) => {
                    Util.closeLoadModal(self);
                    console.error(e);
                    self.dataAlert = e.response;
                })
        },
        sendReceivedCode({commit}, {self}) {
            Util.openLoadModal(self);
            const new_params = {pinId: Storage.get("data_api_sms").pinId, pin: self.params.pin};
            Axios.post("http://192.167.99.246:8087/sms/f2a/verify", new_params)
                .then((r) => {
                    if (r.status === 200) {
                        Util.closeLoadModal(self);
                        self.dataAlert = {};
                        self.dataReset.showAccept = false;
                        self.dataReset.showResetPwd = true;
                    }
                })
                .catch((e) => {
                    Util.closeLoadModal(self);
                    console.error(e);
                    self.dataAlert = e.response;
                })
                .finally(()=>{
                    self.params.pin = "";
                    self.$children[1].$refs.inputPin.focus();
                })
        },
        //Funcion salir
        exit({commit}, {self}) {
            delete Axios.defaults.headers.common['x-access-token'];
            delete Axios.defaults.headers.common['X-Access-Token-Lvl'];
            Storage.remove("data_user");
            Storage.remove("data_token_nodejs");
            Storage.remove("data_token_lvl");
            self.$router.replace("/");
            console.log("All storage removed");
        },
    }
});

export default SERVICE;