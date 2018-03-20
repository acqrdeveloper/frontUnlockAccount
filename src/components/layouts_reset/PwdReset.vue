<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="alert alert-secondary">
                <h5>Paso Final</h5>
                <p>Para resetear su contraseña, porfavor tome en cuenta lo siguiente:</p>
                <template v-if="typeof dataRulesPwd.rules == 'object' ">
                    <div v-for="(objRule, key) in dataRulesPwd.rules" :key='key'>
                        <li class="text-danger ml-4">{{objRule}}</li>
                    </div>
                </template>
                <template v-else>
                    <li class="text-success ml-4">{{dataRulesPwd.rules}}</li>
                </template>
                <p></p>
            </div>
        </div>
        <div class="col-4">
            <label>Contraseña</label>
            <div class="form-group">
                <input v-model="params.password" type="password" class="form-control"
                       @keyup="pwdValidator(params.password)" placeholder="contraseña"/>
            </div>
        </div>
        <div class="col-4">
            <label>Confirmar Contraseña</label>
            <div class="form-group">
                <input v-model="password_confirm" type="password" class="form-control"
                       @keyup="pwdValidator(params.password)" placeholder="confirmar contraseña"/>
            </div>
        </div>
        <div class="col-4">
            <div class="row">
                <div class="col-8">
                    <label class="text-white">.</label>
                    <br>
                    <template v-if="!dataRulesPwd.status">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button :disabled="!dataRulesPwd.status" type="button" class="btn btn-success">
                                <i class="fa fa-check-square-o fa-fw"></i>
                                <span>Resetear</span>
                            </button>
                            <button :disabled="!dataRulesPwd.status" type="button" class="btn btn-info">
                                <i class="fa fa-undo fa-fw"></i>
                                <span>Auto-Generar</span>
                            </button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button @click="resetPwd()" title="Confirmar reseteo de contraseña"
                                    :disabled="!dataRulesPwd.status" type="button" class="btn btn-success">
                                <i class="fa fa-check-square-o fa-fw"></i>
                                <span>Resetear</span>
                            </button>
                            <button @click="resetGeneratePwd()" title="Obtener y resetear una contraseña autogenerada"
                                    :disabled="!dataRulesPwd.status" type="button" class="btn btn-info">
                                <i class="fa fa-undo fa-fw"></i>
                                <span>Auto-Generar</span>
                            </button>
                        </div>
                    </template>
                </div>
                <div class="col-4">
                    <label class="text-white">.</label>
                    <button class="btn btn-danger btn-block" @click="clickCancel()"><i class="fa fa-close fa-fw"></i>Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import PasswordValidator from 'password-validator'

  export default {
    name: 'pwd-reset',
    props: {
      dataReset: {},
      dataAlert: {},
      params: {},
    },
    data: () => ({
      password_confirm: '',
      dataRulesPwd: {},
    }),
    created () {
      this.dataRulesPwd = this.pwdValidator(this.params.password)
    },
    methods: {
      //Funcion reglas para la libreria Pwd
      getRulesPwd () {
        return {
          min: 7,
          max: 15,
          digits: true,
          letters: true,
          notSpaces: true,
          uppercase: true,
          lowercase: true,
        }
      },
      //Funcion usar libreria
      pwdValidator (password) {

        const schema = new PasswordValidator()
        const validate = this.getRulesPwd()

        schema.is().min(validate.min)                                                  // Tamaño Minimo 8
        schema.is().max(validate.max)                                                    // Tamaño Maximo 15
        if (validate.digits) schema.has().digits()                        // Debe tener al menos un digito
        if (validate.letters) schema.has().letters()                    // Debe tener al menus una letra
        if (validate.notSpaces) schema.has().not().spaces()   // No debe tener espacios en blanco
        if (validate.uppercase) schema.has().uppercase()            // Debe tener al menos una letra en Mayusculas
        if (validate.lowercase) schema.has().lowercase()            // Debe Tener al menos una letra en Minusculas

        let restrictions = {}
        restrictions.status = schema.validate(password, {})
        let rules = []

        if (!restrictions.status) {
          const validationAnalysis = schema.validate(password, {list: true})
          validationAnalysis.forEach(element => {
            if (element === 'min') rules.push('Debe tener minimo ' + validate.min + ' caracteres')
            if (element === 'max') rules.push('Debe tener maximo ' + validate.max + ' caracteres')
            if (element === 'digits') rules.push('Debe tener al menos un numero')
            if (element === 'letters') rules.push('Debe tener al menus una letra')
            if (element === 'spaces') rules.push('No debe tener espacios en blanco')
            if (element === 'uppercase') rules.push('Debe tener al menos una letra en Mayusculas')
            if (element === 'lowercase') rules.push('Debe Tener al menos una letra en Minusculas')
          })
          if (this.validateConfirmPwd()) {
            rules.push('Las contraseñas deben ser iguales, confirme su contraseña')
          }
          restrictions.rules = rules
        } else {
          if (this.validateConfirmPwd()) {
            rules.push('Las contraseñas deben ser iguales, confirme su contraseña')
            restrictions.rules = rules
            restrictions.status = false
          } else {
            restrictions.rules = 'Su contraseña es óptima'
            restrictions.status = true
          }
        }
        return this.dataRulesPwd = restrictions
      },
      //Funcion que confirma la validacion de contraseñas
      validateConfirmPwd () {
        return (this.params.password !== '' && this.password_confirm !== '') ? (this.params.password ===
          this.password_confirm) ? false : true : true
      },
      //Funcion que envia por POST las contraseña nueva confirmada (evento master en padre)
      resetPwd () {
        //Ejecutar con modal carga
        this.$emit('eventResetPwd', [this.params])
      },
      //Funcion que autogenera la contraseña (evento master en padre)
      resetGeneratePwd () {
//Ejecutar con modal carga
        this.$emit('eventResetGeneratePwd', [this.params])
      },
      //Funcion click cancelar del hijo al padre
      clickCancel () {
        this.$emit('eventCancelResetPwd', [this.params])
      },
    },
  }
</script>

<style scoped>

</style>