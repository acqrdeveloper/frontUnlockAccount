<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="alert alert-secondary">
                <p>Para el reseteo, porfavor tome en cuenta lo siguiente:</p>
                <ul>
                    <li>Debe contener una letra en mayusculas.</li>
                    <li>Debe contener al menos un numero.</li>
                    <li>Ambas contraseñas deben coincidir para habilitar el boton reset.</li>
                </ul>
            </div>
        </div>
        <div class="col-5">
            <label>Nueva Contraseña</label>
            <div class="form-group">
                <input v-model="params.password" type="password" class="form-control" @keyup="validateConfirmPwd()" placeholder="contraseña"/>
            </div>
        </div>
        <div class="col-5">
            <label>Confirmar Contraseña</label>
            <div class="form-group">
                <input v-model="password_confirm" type="password" class="form-control" @keyup="validateConfirmPwd()" placeholder="confirmar contraseña"/>
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
</template>

<script>
    export default {
        name: "pwd-reset",
        props: {
            dataReset:{},
            dataAlert:{},
            params:{},
        },
        data:() => ({
            password_confirm:"",
            // params:{
            //     username :"",
            //     password:"",
            // },
        }),
        methods: {
            //Funcion que confirma la validacion de contraseñas
            validateConfirmPwd() {
                return (this.params.password !== "" && this.password_confirm !== "") ? (this.params.password === this.password_confirm) ? false : true : true
            },
            //Funcion que envia por POST las contraseña nueva confirmada
            resetPwd(){
                //Ejecutar con modal carga
                this.$emit("eventResetPwd",[this.params]);
            },
        }
    }
</script>

<style scoped>

</style>