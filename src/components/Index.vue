<template>
    <section>
        <div class="text-center mt-5">
            <img class="img-thumbnail" style="background-color: transparent;border: 0;width: 180px" src="logo.svg">
        </div>
        <div class="col-6 offset-3">
            <div class="card mt-5">
                <div class="card-header mt-auto mb-auto">
                    <my-title/>
                </div>
                <div class="card-body">
                    <alert-notify v-if="Object.keys(dataAlert).length > 0" :data-alert="dataAlert" @eventCloseNotify="dataAlert = {}"/>
                    <form @submit.prevent="search()">
                        <div class="row">
                            <div class="col-sm-12 col-md-9">
                                <input ref="inputSearch" v-model="params.text_search"
                                       placeholder="Dni, Phone, Username"
                                       title="ingrese su dni, celular, usuario"
                                       type="text"
                                       class="form-control"
                                       required/>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search fa-fw"></i>Buscar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <load-modal v-if="showLoadingModal"/>
        <!--<div v-if="loadModal.show" class="modal" id="modalLoad1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-muted text-center">
                                    <i class="fa fa-circle-o-notch fa-spin fa-4x"></i>
                                    <p class="mt-2 mb-0">Procesando Solicitud</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->

    </section>
</template>

<script>
    import SERVICE from "../services/ApiService";
    import MyTitle from "../components/layouts/MyTitle";
    import AlertNotify from "../components/layouts/AlertNotify";
    import LoadModal from "../components/layouts/LoadModal";
    import Util from '../util';

    export default {
        components: {AlertNotify, MyTitle, LoadModal},
        name: "index",
        data: () => ({
            msg: undefined,
            params: {
                text_search: ""
            },
            dataAlert: {},
            showLoadingModal: false,
        }),
        created(){
            SERVICE.dispatch("generateTokenLDAP",{self: this});
        },
        methods: {
            search() {
                this.openLoadModal();
                SERVICE.dispatch("searchText", {self: this});
            },
            //Funcion que muestra la carga por modal
            openLoadModal() {
                Util.openLoadModal(this);
            },
            //Funcion que oculta la carga por modal
            closeLoadModal() {
                Util.closeLoadModal(this);
            },
        }
    }

</script>

<style scoped>

</style>