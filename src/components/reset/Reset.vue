<template>
    <div>
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
                            <div class="col-6">
                               <unlock/>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-danger btn-block" @click="reset()">
                                    <i class="fa fa-home fa-fw"></i>
                                    <span>Reset Contraseña</span>
                                </button>
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
                    <div class="offset-6 col-6">
                        <div class="row">
                            <div hidden class="col-9">
                                <form @submit.prevent="search()">
                                    <div class="input-group">
                                        <input ref="inputSearch" type="text" v-model="params.text_search"
                                               class="form-control" placeholder="Dni, Username, Phone"
                                               aria-describedby="basic-addon2" required>
                                        <div class="input-group-append">
                                            <button class="btn btn-primary btn-block" type="submit">
                                                <i class="fa fa-search fa-fw"></i>
                                                <span>Buscar</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
    </div>
</template>

<script>
import MyTitle from "../../components/layouts/MyTitle"
import AlertNotify from "../../components/layouts/AlertNotify"
import InfoReset from "../../components/layouts_reset/InfoReset"
import AcceptReset from "../../components/layouts_reset/AcceptReset"
import PwdReset from "../../components/layouts_reset/PwdReset"
import LoadModal from "../../components/layouts/LoadModal"
import Unlock from "../unlock/Unlock"
export default {
	name: "reset",
	components: {Unlock, AlertNotify, MyTitle, InfoReset, AcceptReset, PwdReset, LoadModal},
}
</script>

<style scoped>

</style>