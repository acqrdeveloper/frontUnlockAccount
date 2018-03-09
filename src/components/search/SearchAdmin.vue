<template>
    <div>
        <div class="col-12">
            <div class="card mt-5">
                <div class="card-header mt-auto mb-auto">
                    <my-title/>
                </div>
                <div class="card-body mb-0 pb-0">
                    <alert-notify v-if="Object.keys(dataAlert).length > 0" :data-alert="dataAlert" @eventCloseNotify="dataAlert = {}"/>
                    <div class="row">
                        <div hidden class="col-3">
                            <select class="form-control">
                                <option value="1">Claro Corporativo</option>
                                <option value="1">Interbank</option>
                                <option value="1">Sapia</option>
                                <option value="1">Entel</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <form-search :params="params" @listenSearch="search()"/>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Ultima Actualizacion</th>
                            <th>Accion</th>
                            <th>Ip</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="n in 5">
                            <td>aquisper</td>
                            <td>2018-03-09 10:06:43</td>
                            <td>
                                <span v-if="n%2 == 0">busqueda</span>
                                <span v-else>reseteo</span>
                            </td>
                            <td>192.168.99.259</td>
                            <td>
                                <i v-if="n%2 == 0" class="fa fa-check text-success"></i>
                                <i v-else class="fa fa-close text-danger"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <load-modal v-if="showLoadingModal"/>
    </div>
</template>

<script>
    import SERVICE from "../../services/ApiService";
    import Util from '../../util';
    import MyTitle from "../../components/layouts/MyTitle";
    import AlertNotify from "../../components/layouts/AlertNotify";
    import FormSearch from "../layouts_search/FormSearch";
    import LogoSapia from "../layouts/LogoSapia";
    import LoadModal from "../../components/layouts/LoadModal";

    export default{
        name: "search-admin",
        components: {LogoSapia, FormSearch, AlertNotify, MyTitle, LoadModal},
        data: () => ({
            msg: undefined,
            params: {
                text_search: ""
            },
            dataAlert: {},
            showLoadingModal: false,
            component_form_search:FormSearch,
        }),
        created() {
            SERVICE.dispatch("generateTokenLDAP", {self: this});
        },
        methods: {
            search() {
                SERVICE.dispatch("searchText", {self: this});
            },
        }
    }
</script>

<style scoped>

</style>