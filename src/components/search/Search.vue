<template>
    <div>
        <logo-sapia/>
        <div class="col-6 offset-3">
            <div class="card">
                <div class="card-header mt-auto mb-auto">
                    <my-title/>
                </div>
                <div class="card-body">
                    <alert-notify v-if="Object.keys(dataAlert).length > 0" :data-alert="dataAlert" @eventCloseNotify="dataAlert = {}"/>
                    <form-search :params="params" @listenSearch="search()"/>
                </div>
            </div>
        </div>
        <load-modal v-if="showLoadingModal"/>
    </div>
</template>

<script>
    import SERVICE from "../../services/ApiService";
    import LogoSapia from './../layouts/LogoSapia';
    import MyTitle from "../../components/layouts/MyTitle";
    import AlertNotify from "../../components/layouts/AlertNotify";
    import LoadModal from "../../components/layouts/LoadModal";
    import FormSearch from "../layouts_search/FormSearch";

    export default {
        name: "search",
        components: {FormSearch, AlertNotify, MyTitle, LoadModal,LogoSapia},
        data: () => ({
            msg: undefined,
            params: {
                text_search: ""
            },
            dataAlert: {},
            showLoadingModal: false,
        }),
        created() {
            SERVICE.dispatch("generateTokenLDAP", {self: this});
            SERVICE.dispatch("generateTokenLaravel", {self: this});
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