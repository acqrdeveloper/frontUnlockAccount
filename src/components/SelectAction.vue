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
                        <div v-if="showUnlockSuccess === true" class="alert alert-success">
                            <h5><i class="fa fa-check fa-fw"></i>Bien</h5>
                            <span>Estimado se ha procedido a desbloquear su cuenta de red con exito</span>
                        </div>
                        <div v-if="showUnlockSuccess === false" class="alert alert-danger">
                            <h5><i class="fa fa-exclamation-triangle fa-fw"></i>Error</h5>
                            <span>Estimado lo sentimos hemos tenido un problema. Para proceder a desbloquear su cuenta de red intentelo nuevamente.</span><br>
                            <h5 v-if="showUnlockOption" class="text-dark small">Si el problema persiste, comunicate al
                                215-5400 opcion #3.</h5>
                        </div>
                        <div v-if="showReset === true" class="alert alert-info">
                            <h5>Nota</h5>
                            <span>Para proceder a resetear su contraseña, como medida de seguridad, le hemos enviado un codigo de seguridad por sms al numero movil <b>9*******73</b></span>
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
                                <th scope="row" width="25%">Name Complete</th>
                                <td width="75%">Alex Christian Quispe Roque</td>
                            </tr>
                            <tr>
                                <th scope="row">Cargo</th>
                                <td>Analista Programador</td>
                            </tr>
                            <tr>
                                <th scope="row">Date Contract</th>
                                <td>2018/01/02</td>
                            </tr>
                        </table>
                        <div v-if="showReset === undefined" class="row">
                            <div class="col-6">
                                <button v-if="showUnlockSuccess === undefined||true && showUnlockSuccess !== false"
                                        class="btn btn-outline-success btn-block" @click="unlock()"
                                        @dblclick="unlockdbl()">
                                    <i class="fa fa-unlock fa-fw"></i>
                                    <span>Unlock Account</span>
                                </button>
                                <button v-if="showUnlockSuccess === false" class="btn btn-outline-dark btn-block"
                                        @click="unlock()">
                                    <i class="fa fa-refresh fa-fw"></i>
                                    <span>Intentalo Nuevamente</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-danger btn-block" @click="reset()">
                                    <i class="fa fa-home fa-fw"></i>
                                    <span>Reset Password</span>
                                </button>
                            </div>
                        </div>
                        <div v-if="showReset === true" class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <input v-model="inputSecurity" type="text" class="form-control"
                                           placeholder="Ingrese su codigo de seguridad de 6 digitos" autofocus
                                           maxlength="6">
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
                                    <button class="btn btn-success btn-block" @click="btnYes()">
                                        <i class="fa fa-check fa-fw"></i>
                                        <span>Yes</span>
                                    </button>
                                </template>

                            </div>
                            <div class="col-2">
                                <button class="btn btn-danger btn-block" @click="btnNot()">
                                    <i class="fa fa-close fa-fw"></i>
                                    <span>No</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="offset-6 col-6">
                        <div class="row">
                            <div class="col-9">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Dni, Username, Phone"
                                           aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-search fa-fw"></i>Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="text-right">
                                    <router-link class="btn btn-primary" :to="'/search'"><i
                                            class="fa fa-close fa-fw"></i>Close
                                    </router-link>
                                </div>
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
            showUnlockSuccess: undefined,
            showReset: undefined,
            showUnlockOption: false,
            countClicked: 0,
            dataClicked: [],
            inputSecurity: "",
            showLoadingModal: false,
        }),
        created() {
        },
        methods: {
            actionModal() {
                    if (this.showLoadingModal) {
                        $(document).ready(() => {
                            $('#exampleModalCenter').modal('show');
                        });
                    } else {
                        $(document).ready(() => {
                            // console.log('aqui');
                            $('#exampleModalCenter').modal('toggle');
                            // console.log($('#exampleModalCenter').modal('hide'));
                            // $('#exampleModalCenter').modal();
                        });
                    }
            },
            unlock() {
                this.showLoadingModal = true;
                this.showUnlockSuccess = true;
                this.actionModal();
                setTimeout(() => {
                    this.showLoadingModal = false;
                    this.actionModal();
                }, 5000)
            },
            unlockdbl() {
                this.dataClicked.push(this);
                if (this.dataClicked.length >= 3) this.showUnlockOption = true;
                this.showUnlockSuccess = false;
            },
            reset() {
                this.showUnlockSuccess = undefined;
                this.showUnlockOption = false;
                this.dataClicked = [];
                this.showReset = true;
            },
            btnYes() {
                this.showReset = undefined;
                this.inputSecurity = "";
            },
            btnNot() {
                this.showReset = undefined;
            }
        }
    }

</script>

<style scoped>

</style>