<template>
        <div class="row mt-3">
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
</template>

<script>
    export default {
        name: "info-reset",
        props: {
            dataReset:{}
        },
        methods:{
            //Funcion que cancela el envio del codigo de seguridad
            btnNot(){
                this.dataReset.showInfo = false;
            },
            //funcion que acepta obtener el codigo de seguridad por mensaje
            btnYes(){
                this.dataReset.showInfo = false;
                this.dataReset.showAccept = true;
            }
        }
    }
</script>

<style scoped>

</style>