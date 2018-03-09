<template>
    <section>
        <div class="card mt-5">
            <div class="card-header mt-auto mb-auto">
                <my-title/>
            </div>
            <div class="card-body">
                <!--Alertas-->
                <div class="row">
                    <div class="col-12">
                        <alert-notify v-if="Object.keys(dataAlert).length > 0" :data-alert="dataAlert" @eventCloseNotify="dataAlert = {}"/>
                    </div>
                </div>
                <!--Informacion inicial-->
                <div class="row">
                    <div class="col-4">
                        <div class="img-thumbnail text-center">
                            <img src="http://www.moweble.com/console/wp-content/themes/MagMan/timthumb.php?src=http://www.moweble.com/console/wp-content/uploads/2015/08/marry.jpg&w=720&h=&zc=1&q=80" alt="" width="260"/>
                        </div>
                    </div>
                    <div class="col-8">
                        <!--Informacion del usuario-->
                        <table class="table mb-0">
                            <tr>
                                <th width="25%">Nombres Completos</th>
                                <td width="75%">{{data.name_complet == undefined ? 'load...' : data.name_complet}}</td>
                            </tr>
                        </table>
                        <table class="table">
                            <tr>
                                <th>Tiempo Bloq</th>
                                <td>{{data.lockoutTime == undefined ? 'load...' : data.lockoutTime}}</td>
                                <th>Cantidad Bloqs</th>
                                <td>{{data.countLocked == undefined ? 'load...' : data.countLocked}}</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td>{{data.area_work == undefined ? 'load...' : data.area_work}}</td>
                                <th>Ultima Sesion</th>
                                <td>{{data.lastLogon == undefined ? 'load...' : data.lastLogon}}</td>
                            </tr>
                        </table>
                        <!--Acciones del negocio-->
                        <div v-if="dataReset.showInfo === false && dataReset.showAccept === false && dataReset.showResetPwd === false " class="row">
                            <div v-if="isAdmin" class="col-6">
                                <button-unlock @listenUnlock="unlock()"/>
                            </div>
                            <div :class="isAdmin ? 'col-6' : 'col-12'">
                                <button-reset @listenReset="reset()"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Vista pasos para el reseteo-->
                <info-reset v-if="dataReset.showInfo" :data-reset="dataReset, arrayPhones"/>
                <!--Vista enviar codigo de seguridad-->
                <accept-reset v-if="dataReset.showAccept" :data-reset="dataReset"/>
                <!--Vista reseteo de contraseña-->
                <pwd-reset v-if="dataReset.showResetPwd" :data-reset="dataReset, params" @eventResetPwd="resetPwd()"/>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-6">
                        <label>
                            <input type="checkbox" class="checkbox" v-model="isAdmin">
                            Administrador
                        </label>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-9">
                                <form-search v-if="isAdmin"  :params="params" @listenSearch="search()"/>
                            </div>
                            <div class="col-3">
                                <button class="btn btn-primary btn-block" @click="exit()">
                                    <i class="fa fa-sign-out fa-fw"></i>
                                    <span>Salir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <load-modal v-if="showLoadingModal"/>
    </section>
</template>

<script>
    import Storage from 'vue-local-storage'
    import SERVICE from "../../services/ApiService";
    import MyTitle from "../../components/layouts/MyTitle";
    import AlertNotify from "../../components/layouts/AlertNotify";
    import InfoReset from "../../components/layouts_reset/InfoReset";
    import AcceptReset from "../../components/layouts_reset/AcceptReset";
    import PwdReset from "../../components/layouts_reset/PwdReset";
    import LoadModal from "../../components/layouts/LoadModal";
    import Util from '../../util';
    import FormSearch from "../layouts_search/FormSearch";
    import ButtonReset from "../layouts_action/ButtonReset";
    import ButtonUnlock from "../layouts_action/ButtonUnlock";

    export default {
        name: "actions",
        components: {ButtonUnlock, ButtonReset, FormSearch, AlertNotify, MyTitle, InfoReset, AcceptReset, PwdReset, LoadModal},
        data: () => ({
            isAdmin: false,
            showAlertUnlockSuccess: undefined,
            showAlertResetSuccess: undefined,
            showReset: undefined,
            showResetAccept: undefined,
            showResetPwd: undefined,
            showUnlockOption: false,
            countClicked: 0,
            dataClicked: [],
            inputSecurity: "",
            showLoadingModal: false,
            password_confirm: "",
            params: {
                username: "",
                password: "",
                text_search: ""
            },
            data: [],
            dataAlert: {},
            dataReset: {
                showInfo: false,
                showAccept: false,
                showResetPwd: false,
            },
            arrayPhones:[],
        }),
        created() {
            this.load();
        },
        methods: {
            //Funcion para resetear desde event
            resetPwd() {
                this.openLoadModal();
                this.params.username = this.data.username;
                // this.params.password = obj.password;
                SERVICE.dispatch("reset", {self: this});
            },
            //Funcion para buscar texto
            search() {
                //Ocultar elementos activos
                this.dataReset.showInfo = false;
                this.dataReset.showAccept = false;
                this.dataReset.showResetPwd = false;
                this.openLoadModal();
                this.params.username = this.data.username;
                SERVICE.dispatch("researchText", {self: this});
            },
            //Funcion para remover la cache y salir del modulo de autogestion
            exit() {
                SERVICE.dispatch("exit", {self: this});
            },
            //Funcion que carga la informacion
            load() {
                this.openLoadModal();
                this.data = Storage.get("data_user");
                if (Object.keys(this.data).length > 0) {
                    this.closeLoadModal();
                }
            },
            //Funcion que muestra la carga por modal
            openLoadModal() {
                Util.openLoadModal(this);
            },
            //Funcion que oculta la carga por modal
            closeLoadModal() {
                Util.closeLoadModal(this);
            },
            //Funcion que envia por POST el desbloqueo de la cuenta
            unlock() {
                this.openLoadModal();
                this.params.username = this.data.username;
                SERVICE.dispatch("unlock", {self: this});
            },
            //Funcion que simula un error
            unlockdbl() {
                this.dataClicked.push(this);
                if (this.dataClicked.length >= 3) this.showUnlockOption = true;
                this.showAlertUnlockSuccess = false;
            },
            //Funcion que muestra la informacion de pasos para resetear una contraseña
            reset() {
                this.validatePhone()
            },
            //Funcion para reenviar codigo de seguridad
            reSend() {
                //ejecutar con modal carga
                this.openLoadModal();
                setTimeout(() => {
                    this.closeLoadModal();
                    this.showReset = undefined;
                    this.showResetAccept = true;
                    this.inputSecurity = "";
                }, 5000)
            },
            //Funcion valida si tiene telefono en el AD para tomar una accion
            validatePhone() {
                if (Storage.get("data_user").phone_number !== undefined) {
                    this.arrayPhones = ["9******93","9******32","9******54"];
                    // this.arrayPhones = ["997397243"];
                    // let arrPhone = Storage.get("data_user").phone_number;
                        this.dataAlert = {};
                        this.dataReset.showInfo = true;
                } else {
                    this.dataAlert = {
                        status: 412,
                        data: "Usted no cuenta con un numero disponible, porfavor comuniquese a mesa de ayuda al 405-7877."
                    };
                }
            }
        }
    }

</script>

<style scoped>
    .card-body {
        background-color: transparent !important;
    }
</style>