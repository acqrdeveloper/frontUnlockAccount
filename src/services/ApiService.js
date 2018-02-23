/**
 * Created by aquispe on 23/02/2018.
 **/

import Vue from 'vue';
import Axios from 'axios';
import * as Vuex from 'vuex';
import Storage from 'vue-local-storage'

Vue.use(Vuex,Storage);
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ENV = {
    API: "http://service-unlock-reset"
};
const SERVICE = new Vuex.Store({
    actions: {
        search({commit}, {self}) {
            Axios.post(ENV.API + "/search",self.params)
                .then((r) => {
                    if(r.status === 200){
                        self.msg = undefined;
                        Storage.set("data_user",r.data.data);
                        self.$router.replace("/select-action");
                    }
                })
                .catch((e)=>{
                    console.error(e);
                    self.msg = e.response.data.msg;
                })
        },
        load({commit}, {self}) {
            Axios.post(ENV.API + "/search",{text_search:Storage.get("data_user").dni})
                .then((r) => {
                    if(r.status === 200){
                        self.msg = undefined;
                        Storage.set("data_user",r.data.data);
                        self.$router.replace("/select-action");
                    }
                })
                .catch((e)=>{
                    console.error(e);
                    self.msg = e.response.data.msg;
                })
        },
        exit({commit}, {self}){
            Storage.remove("data_user");
            console.log("storage removed successfully!");
            self.$router.replace("/search");
        }
    }
});
export default SERVICE;