<template>
    <section>
        <div class="card mt-5">
            <div class="card-header mt-auto mb-auto">
                <div class="text-center">
                    <span class="h2">Bienvenidos al portal de Autoatencion</span>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div v-if="showAlertUnlockSuccess === true" class="alert alert-success">
                            <h5><i class="fa fa-check fa-fw"></i>Bien</h5>
                            <span>Estimado se ha procedido a desbloquear su cuenta de red con exito.</span>
                        </div>
                        <div v-if="showAlertUnlockSuccess === false" class="alert alert-warning">
                            <h5><i class="fa fa-exclamation-triangle fa-fw"></i>Error</h5>
                            <span>Estimado lo sentimos hemos tenido un problema. Para proceder a desbloquear su cuenta de red intentelo nuevamente.</span><br>
                            <h5 v-if="showUnlockOption" class="text-dark small">Si el problema persiste, comunicate al 215-5400 opcion #3.</h5>
                        </div>
                        <div v-if="showAlertResetSuccess === true" class="alert alert-success">
                            <h5><i class="fa fa-check fa-fw"></i>Bien</h5>
                            <span>Estimado su password se reseteó con exito.</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="img-thumbnail text-center">
                            <img src="http://www.moweble.com/console/wp-content/themes/MagMan/timthumb.php?src=http://www.moweble.com/console/wp-content/uploads/2015/08/marry.jpg&w=720&h=&zc=1&q=80"
                                 alt="" width="260">
                        </div>
                    </div>
                    <div class="col-8">
                        <table class="table">
                            <tr>
                                <th width="25%">Nombres Completos</th>
                                <td width="75%">Alex Christian Quispe Roque</td>
                            </tr>
                            <tr>
                                <th>Cargo</th>
                                <td>Analista Programador</td>
                            </tr>
                            <tr>
                                <th>Fecha Contrato</th>
                                <td>2018/01/02</td>
                            </tr>
                        </table>
                        <div v-if="showReset === undefined && showResetAccept === undefined && showResetPwd === undefined " class="row">
                            <div class="col-6">
                                <button v-if="showAlertUnlockSuccess === undefined||true && showAlertUnlockSuccess !== false" class="btn btn-outline-success btn-block" @click="unlock()" @dblclick="unlockdbl()">
                                    <i class="fa fa-unlock fa-fw"></i>
                                    <span>Desbloquear Cuenta</span>
                                </button>
                                <button v-if="showAlertUnlockSuccess === false" class="btn btn-outline-dark btn-block" @click="unlock()">
                                    <i class="fa fa-refresh fa-fw"></i>
                                    <span>Intentar Nuevamente</span>
                                </button>
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
                <br v-if="showReset === true || showResetAccept === true || showResetPwd === true ">
                <div class="row" v-if="showReset === true">
                    <div class="col-12">
                        <div class="alert alert-secondary">
                            <h5>Advertencia</h5>
                            <span>Para proceder a resetear su contraseña, como medida de seguridad, procederemos a enviar un sms al numero movil <b>9*******73</b>, que se encuentra en el Active Directory.</span>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-primary btn-block" @click="btnYes()">
                                    <span>Si</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary btn-block" @click="btnNot()">
                                    <span>No</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="showResetAccept === true">
                    <div class="col-12">
                        <div class="alert alert-secondary">
                            <h5>Atencion</h5>
                            <span>Ingrese el codigo de 6 digitos que hemos enviado al numero movil <b>9*******73</b>.</span><a title="click para volver a enviar sms a tu numero movil del Active Directory" class="btn btn-link" href=""><i class="fa fa-link fa-fw"></i>Reenviar sms</a>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <input v-model="inputSecurity" type="text" class="form-control" placeholder="Ingrese su codigo de seguridad de 6 digitos" autofocus maxlength="6" />
                                </div>
                            </div>
                            <div class="col-2">
                                <template v-if="inputSecurity.charAt(5) === '' ">
                                    <button disabled class="btn btn-success btn-block">
                                        <i class="fa fa-check fa-fw"></i>
                                        <span>Yes</span>
                                    </button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-success btn-block" @click="btnYesReset()">
                                        <i class="fa fa-check fa-fw"></i>
                                        <span>Yes</span>
                                    </button>
                                </template>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger btn-block" @click="btnNotReset()">
                                    <i class="fa fa-close fa-fw"></i>
                                    <span>No</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="showResetPwd === true">
                    <div class="col-12">
                        <div class="alert alert-secondary">
                            <p>Para el reseteo, porfavor tome en cuenta lo siguiente:</p>
                            <ul>
                                <li>Debe contener una letra en mayusculas.</li>
                                <li>Debe contener al menos un numero.</li>
                                <li>Ambas contraseñas deben coincidir para habilitar el boton.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-5">
                        <label>Nueva Contraseña</label>
                        <div class="form-group">
                            <input v-model="params.password" type="password" class="form-control" @keyup="validateConfirmPwd()"/>
                        </div>
                    </div>
                    <div class="col-5">
                        <label>Confirmar Contraseña</label>
                        <div class="form-group">
                            <input v-model="password_confirm" type="password" class="form-control" @keyup="validateConfirmPwd()"/>
                        </div>
                    </div>
                    <div class="col-2">
                        <label class="text-white">.</label>
                        <template v-if="validateConfirmPwd()">
                            <button :disabled="validateConfirmPwd()" class="btn btn-success btn-block"><i class="fa fa-recycle fa-fw"></i>Reset</button>
                        </template>
                        <template v-else>
                            <button :disabled="validateConfirmPwd()" class="btn btn-success btn-block" @click="resetPwd()"><i class="fa fa-recycle fa-fw"></i>Reset</button>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="offset-6 col-6">
                        <div class="row">
                            <div class="col-9">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Dni, Username, Phone" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button">
                                            <i class="fa fa-search fa-fw"></i>
                                            <span>Buscar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <router-link class="btn btn-primary btn-block" :to="'/search'">
                                    <i class="fa fa-sign-out fa-fw"></i>
                                    <span>Salir</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<template v-if="showLoadingModal" >-->
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
        <!--</template>-->
    </section>
</template>

<script>
    import $ from 'jquery';

    export default {
        name: "select-action",
        data: () => ({
            showAlertUnlockSuccess: undefined,
            showAlertResetSuccess: undefined,
            showReset: undefined,
            showResetAccept: undefined,
            showResetPwd:undefined,
            showUnlockOption: false,
            countClicked: 0,
            dataClicked: [],
            inputSecurity: "",
            showLoadingModal: false,
            password_confirm:"",
            params:{
                password:""
            }
        }),
        created() {
        },
        methods: {
            openLoadModal(){
                this.showLoadingModal = true;
                $(document).ready(() => {
                    $('#exampleModalCenter').modal({show: true, backdrop: 'static', keyboard: false});
                });
            },
            closeLoadModal(){
                $('#exampleModalCenter').modal('hide');
                this.showLoadingModal = false;
            },
            unlock() {
                this.showAlertUnlockSuccess = undefined;
                this.showAlertResetSuccess = undefined;
                //ejecutar con modal carga
                this.openLoadModal();
                setTimeout(() => {
                    this.closeLoadModal();
                    this.showAlertUnlockSuccess = true;
                }, 2000)
            },
            unlockdbl() {
                this.dataClicked.push(this);
                if (this.dataClicked.length >= 3) this.showUnlockOption = true;
                this.showAlertUnlockSuccess = false;
            },
            reset() {
                //cerrar alertas activas
                this.showAlertUnlockSuccess = undefined;
                //ejecutar con modal carga
                this.openLoadModal();
                setTimeout(() => {
                    this.closeLoadModal();
                    this.showUnlockOption = false;
                    this.dataClicked = [];
                    this.showReset = true;
                }, 2000)
            },
            btnYes() {
                this.showReset = undefined;
                this.showResetAccept = true;
                this.inputSecurity = "";
            },
            btnYesReset() {
                //ejecutar con modal carga
                this.openLoadModal();
                setTimeout(() => {
                    this.closeLoadModal();
                    this.showReset = undefined ;
                    this.showResetAccept = undefined ;
                    this.showResetPwd = true;
                }, 2000)
            },
            btnNot() {
                this.showReset = undefined;
                this.showResetAccept = undefined;
            },
            btnNotReset() {
                this.showReset = undefined;
                this.showResetAccept = undefined;
            },
            resetPwd(){
                //ejecutar con modal carga
                this.openLoadModal();
                setTimeout(() => {
                    this.closeLoadModal();
                    this.showReset = undefined ;
                    this.showResetAccept = undefined ;
                    this.showResetPwd = undefined;
                    this.showAlertUnlockSuccess = undefined;
                    this.showAlertResetSuccess = true;
                }, 2000)
            },
            validateConfirmPwd() {
                return (this.params.password !== "" && this.password_confirm !== "") ? (this.params.password === this.password_confirm) ? false : true : true
            }
        }
    }

</script>

<style scoped>

</style>