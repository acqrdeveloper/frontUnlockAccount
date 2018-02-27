/**
 * Created by aquispe on 23/02/2018.
 **/

import Vue from 'vue';
import Axios from 'axios';
import * as Vuex from 'vuex';
import Storage from 'vue-local-storage';

Vue.use(Vuex,Storage);
// Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ENV = {
    APISMS: "http://service-unlock-reset",//local PARA API of messages restfull
    API: "http://192.167.99.246:8090/api"//Prod
};

const SERVICE = new Vuex.Store({
    actions: {
        searchText({commit}, {self}) {
            Axios.get(ENV.API + "/unlockresetuser/search/" + self.params.text_search)
                .then((r) => {
                    if (r.status === 200){
                        self.dataAlert = {};
                        Storage.set("data_user", r.data);
                        self.$router.replace("/select-action");
                    }
                })
                .catch((e) => {
                    self.dataAlert = e.response;
                    self.params.text_search = "";
                    self.$refs.input_search.focus();
                })
        },
        exit({commit}, {self}) {
            Storage.remove("data_user");
            console.log("storage removed successfully!");
            self.$router.replace("/search");
        },
        unlock({commit}, {self}) {
            Axios.post(ENV.API + "/unlockresetuser/unlock", self.params)
                .then((r) => {
                    if (r.status === 200) {
                        self.msg = undefined;
                        Storage.set("data_user", r.data.data);
                        self.$router.replace("/select-action");
                    }
                })
                .catch((e) => {
                    console.error(e);
                    self.msg = e.response.data.msg;
                })
        }
    }
});

export default SERVICE;