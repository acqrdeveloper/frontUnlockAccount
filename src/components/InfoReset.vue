<template>
        <div class="row mt-3">
            <div class="col-12">
                <div class="alert alert-secondary">
                    <h5>Advertencia</h5>
                    <span>Para proceder a resetear su contraseña, como medida de seguridad, procederemos a enviar un sms al numero movil <b>9*******73</b>, que se encuentra en el Active Directory.</span>
                    <div v-if="arrayPhones.length >= 2" class="mt-2">
                        <span class="ml-3">Por favor seleccione el numero movil, en el que desea recibir el codigo de seguridad:</span>
                        <div class="ml-3" v-for="opt in arrayPhones">
                            <div class="form-check">
                                <input v-model="phone_number_checked" title type="radio" class="form-check-input" :id="'opt'+opt" name="opt_number" :value="opt" />
                                <label class="form-check-label" :for="'opt'+opt">{{opt}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <template v-if="arrayPhones.length >= 2">
                            <!--<p>{{phone_number_checked.target.value}}</p>-->
                            <!--<button :disabled="opt === phone_number_checked.target.value" class="btn btn-primary btn-block" @click="btnYes()">-->
                                <!--<span>Si</span>-->
                            <!--</button>-->
                            <button class="btn btn-primary btn-block" @click="btnYes()">
                                <span>Si</span>
                            </button>
                        </template>
                        <template v-if="arrayPhones.length === 1">
                            <button class="btn btn-primary btn-block" @click="btnYes()">
                                <span>Si</span>
                            </button>
                        </template>

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
            dataReset:{},
            arrayPhones:[]
        },
        data:()=>({
            phone_number_checked:""
        }),
        created(){
          // this.$refs.optnumber.attr("checked");
          console.log(this.$refs.phone_number_checked);
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