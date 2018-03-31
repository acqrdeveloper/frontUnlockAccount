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
                            <img class="p-3" :src="getImgUrl('logo.svg')" alt="image" width="225"/>
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
                                <td>{{data.lockout_time == undefined ? 'load...' : data.lockout_time}}</td>
                                <th>Cantidad Bloqs</th>
                                <td>{{data.count_locked == undefined ? 'load...' : data.count_locked}}</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td>{{data.area_work == undefined ? 'load...' : data.area_work}}</td>
                                <th>Ultima Sesion</th>
                                <td>{{data.last_logon == undefined ? 'load...' : data.last_logon}}</td>
                            </tr>
                        </table>
                        <!--Acciones del negocio-->
                        <div v-if="dataReset.showInfo === false && dataReset.showAccept === false && dataReset.showResetPwd === false " class="row">
                            <div class="col-12">
                                <button-reset @listenReset="reset()"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Vista pasos para el reseteo-->
                <info-reset v-if="dataReset.showInfo" :data-reset="dataReset" @eventAcceptReceivedCode="acceptReceivedCode()" @eventCancelInfoReset="cancelInfoReset()"/>
                <!--Vista enviar codigo de seguridad-->
                <accept-reset v-if="dataReset.showAccept" :data-reset="dataReset, params" @eventSendReceivedCode="sendReceivedCode()" @eventCancelAcceptReset="cancelAcceptReset()" />
                <!--Vista reseteo de contraseña-->
                <pwd-reset v-if="dataReset.showResetPwd" :data-reset="dataReset, params" @eventResetPwd="resetPwd()" @eventResetGeneratePwd="resetGeneratePwd()" @eventCancelResetPwd="cancelResetPwd()" />
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-6"><!--if exist adminitrator--></div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-9"></div>
                            <div class="col-3">
                                <button class="btn btn-secondary btn-block" @click="exit()">
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
import SERVICE from "../../services/ApiService"
import Util from '../../util'
import MyTitle from "../../components/layouts/MyTitle"
import AlertNotify from "../../components/layouts/AlertNotify"
import InfoReset from "../../components/layouts_reset/InfoReset"
import AcceptReset from "../../components/layouts_reset/AcceptReset"
import PwdReset from "../../components/layouts_reset/PwdReset"
import LoadModal from "../../components/layouts/LoadModal"
import FormSearch from "../layouts_search/FormSearch"
import ButtonReset from "../layouts_action/ButtonReset"
import ButtonUnlock from "../layouts_action/ButtonUnlock"

export default {
	name: "actions",
	components: {
		ButtonUnlock,
		ButtonReset,
		FormSearch,
		AlertNotify,
		MyTitle,
		InfoReset,
		AcceptReset,
		PwdReset,
		LoadModal
	},
	data: () => ({
		showLoadingModal: false,
		params: {
			username: "",
			password: "",
			text_search: "",
			pin:"",
		},
		data: [],
		dataAlert: {},
		dataReset: {
			showInfo: false,
			showAccept: false,
			showResetPwd: false,
		},
	}),
	created() {
		this.load()
	},
	methods: {
        //Funciones ejecutadas desde su componente
		cancelInfoReset() {
			this.dataReset.showInfo = false
			this.dataAlert = {}
		},
		cancelAcceptReset(){
			this.dataReset.showAccept = false
			this.dataReset.showInfo = false
			this.dataAlert = {}
		},
		cancelResetPwd(){
			this.dataReset.showInfo = false
			this.dataReset.showAccept = false
			this.dataReset.showResetPwd = false
			this.dataAlert = {}
		},
		sendReceivedCode(){
			SERVICE.dispatch("sendReceivedCode", {self: this})
		},
		acceptReceivedCode(){
			SERVICE.dispatch("acceptReceivedCode", {self: this})
		},
		//Funcion que autogenerar contraseña y resetear
		resetGeneratePwd(){
			alert("generate Pwd")
		},
		//Funcion resetear contraseña
		resetPwd() {
			this.params.username = this.data.username
			SERVICE.dispatch("reset", {self: this})
		},
		//Funcion para buscar texto
		search() {
			//Ocultar elementos activos
			this.dataReset.showInfo = false
			this.dataReset.showAccept = false
			this.dataReset.showResetPwd = false
          Util.openLoadModal(this)
			this.params.username = this.data.username
			SERVICE.dispatch("researchText", {self: this})
		},
		//Funcion para remover la cache y salir del modulo de autogestion
		exit() {
			SERVICE.dispatch("exit", {self: this})
		},
		//Funcion que carga la informacion
		load() {
          Util.openLoadModal(this)
			this.data = Storage.get("data_user")
			if (Object.keys(this.data).length > 0) {
              Util.closeLoadModal(this)
			}
		},
		//Funcion que envia por POST el desbloqueo de la cuenta
		unlock() {
          Util.openLoadModal(this)
			this.params.username = this.data.username
			SERVICE.dispatch("unlock", {self: this})
		},
		//Funcion que muestra la informacion de pasos para resetear una contraseña
		reset() {
			this.validatePhone()
		},
		//Funcion valida si tiene telefono en el AD para tomar una accion
		validatePhone() {
			if (Storage.get("data_user").phone_number !== undefined) {
				this.dataAlert = {}
				this.dataReset.showInfo = true
			} else {
				this.dataAlert = {
					status: 412,
					data: "Usted no cuenta con un numero disponible, porfavor comuniquese a mesa de ayuda al 215-4530 opcion 444."
				}
			}
		},
		//Funcion para cargar imagen
		getImgUrl(img) {
			return require('@/assets/vendor/img/' + img)
		},
	}
}

</script>

<style scoped>
    .card-body {
        background-color: transparent !important;
    }
</style>