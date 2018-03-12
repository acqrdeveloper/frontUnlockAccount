<template>
        <div class="row mt-3">
            <div class="col-12">
                <div class="alert alert-secondary">
                    <h5>Paso #1</h5>
                    <span>Como medida de seguridad, procederemos a enviar un sms al numero movil <b>9*******73</b> que tenemos registrado en el Active Directory.</span>
                </div>
                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-primary btn-block" @click="btnYes()">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Aceptar</span>
                        </button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary btn-block" @click="btnNot()">
                            <i class="fa fa-close fa-fw"></i>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "info-reset",
        props: {
            dataReset:{},
        },
        data:()=>({
            phone_number_checked:""
        }),
        methods:{
            //Funcion que cancela el envio del codigo de seguridad
            btnNot(){
                this.dataReset.showInfo = false;
            },
            //funcion que acepta obtener el codigo de seguridad por mensaje
            btnYes(){
                this.dataReset.showInfo = false;
                this.dataReset.showAccept = true;
                this.$emit('eventAcceptReceivedCode')
            }
        }
    }
</script>

<style scoped>

</style>