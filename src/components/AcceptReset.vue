<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="alert alert-secondary">
                <h5>Atencion</h5>
                <span>Ingrese el codigo de 6 digitos que hemos enviado al numero movil <b>9*******73</b>.</span><a title="click para volver a enviar sms a tu numero movil del Active Directory" class="btn btn-link" href @click.prevent="reSend()"><i class="fa fa-link fa-fw"></i>Reenviar sms</a>
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
                            <span>Si</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn btn-success btn-block" @click="btnYesSecutity()">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Si</span>
                        </button>
                    </template>
                </div>
                <div class="col-2">
                    <button class="btn btn-danger btn-block" @click="btnNotSecutity()">
                        <i class="fa fa-close fa-fw"></i>
                        <span>No</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "accept-reset",
        props: {
            dataReset:{}
        },
        data:()=>({
            inputSecurity:""
        }),
        methods:{
            //Funcion que envia por POST el codigo de seguridad
            btnYesSecutity(){
                this.dataReset.showAccept = false;
                this.dataReset.showResetPwd = true;
            },
            //Funcion que cancela enviar por POST el codigo de seguridad
            btnNotSecutity(){
                this.dataReset.showAccept = false;
                this.dataReset.showInfo = false;
            }
        }
    }
</script>

<style scoped>

</style>