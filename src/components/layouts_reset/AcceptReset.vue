<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="alert alert-secondary">
                <h5>Paso #2</h5>
                <span>Ingrese el codigo de 5 digitos que hemos enviado al numero movil <b>{{storage.get('data_user').phone_number}}</b>.</span><a
                    title="click para volver a enviar sms a tu numero movil del Active Directory" class="btn btn-link"
                    href @click.prevent="reSend()"><i class="fa fa-link fa-fw"></i>Reenviar sms</a>
                <ul>
                    <li>Debe ingresar el codigo de seguridad para habilitar el boton <b>"Aceptar"</b></li>
                </ul>
            </div>
            <div class="row">
                <div class="col-8">
                    <div class="form-group">
                        <input ref="inputPin" v-model="params.pin" type="text" class="form-control" placeholder="Ingrese su codigo de seguridad de 5 digitos" autofocus maxlength="5"/>
                    </div>
                </div>
                <div class="col-2">
                    <template v-if="params.pin.charAt(4) === '' ">
                        <button disabled class="btn btn-primary btn-block">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Aceptar</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn btn-primary btn-block" @click="btnYesSecutity()">
                            <i class="fa fa-check fa-fw"></i>
                            <span>Aceptar</span>
                        </button>
                    </template>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary btn-block" @click="btnNotSecutity()">
                        <i class="fa fa-close fa-fw"></i>
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Storage from 'vue-local-storage'

  export default {
    name: 'accept-reset',
    props: {
      dataReset: {},
      params: {},
    },
    data: () => ({
      storage: Storage,
    }),
    methods: {
      //Funcion que envia por POST el codigo de seguridad
      btnYesSecutity() {
        this.$emit('eventSendReceivedCode')
      },
      //Funcion que cancela enviar por POST el codigo de seguridad
      btnNotSecutity() {
        this.$emit('eventCancelAcceptReset')
      },
    },
  }


</script>

<style scoped>

</style>