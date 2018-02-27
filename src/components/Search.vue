<template>
    <section>
        <div class="text-center mt-5">
            <img class="img-thumbnail" style="background-color: transparent;border: 0;width: 180px" src="logo.svg" alt="">
        </div>
        <div class="col-6 offset-3">
            <div class="card mt-5">
                <div class="card-header mt-auto mb-auto">
                    <my-title/>
                </div>
                <div class="card-body">
                    <alert-notify :data-alert="dataAlert"/>
                    <form @submit.prevent="search()">
                        <div class="row">
                            <div class="col-sm-12 col-md-9">
                                <input ref="input_search" v-model="params.text_search" placeholder="Dni, Phone, Username" title="ingrese su dni, celular, usuario" type="text" class="form-control" required/>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <button type="submit" class="btn btn-primary btn-block"><i
                                        class="fa fa-search fa-fw"></i>Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showLoadingModal" class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
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
        </div>
    </section>
</template>

<script>
    import SERVICE from "../services/ApiService";
    import MyTitle from "../components/MyTitle";
    import AlertNotify from "../components/AlertNotify";

    export default {
        components: {AlertNotify, MyTitle},
        name: "search",
        data: () => ({
            msg: undefined,
            params: {
                text_search: ""
            },
            dataAlert:{},
            showLoadingModal: false,
        }),
        methods: {
            search() {
                this.openLoadModal();
                SERVICE.dispatch("searchText", {self: this});
            },
            //Funcion que muestra la carga por modal
            openLoadModal(){
                this.showLoadingModal = true;
                $(document).ready(() => {
                    $('#exampleModalCenter').modal({show: true, backdrop: 'static', keyboard: false});
                });
            },
            //Funcion que oculta la carga por modal
            closeLoadModal(){
                $('#exampleModalCenter').modal('hide');
                this.showLoadingModal = false;
            },
        }
    }

</script>

<style scoped>

</style>