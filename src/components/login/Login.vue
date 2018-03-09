<template>
    <div>
        <logo-sapia/>
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">Iniciar Sesion</div>
            <div class="card-body">
                <form @submit.prevent="login()">
                    <div class="form-group">
                        <label>Nombre Usuario</label>
                        <div class="input-group mb-1">
                            <input name="email" class="form-control" type="text" placeholder="Ingrese nombre usuario"
                                   title="Registrar" value="">
                            <div class="input-group-append">
                                <span class="input-group-text">@sapia.com.pe</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input name="password" class="form-control mb-1" type="password"
                               placeholder="Ingrese contraseña">
                    </div>
                    <div class="mt-5">
                        <button type="submit" class="btn btn-primary btn-block">Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import LogoSapia from './../layouts/LogoSapia';

    export default {
        name: "login",
        components: {LogoSapia},
        methods:{
            login(){
                this.$router.replace("/admin-search")
            }
        }
    }
</script>

<style scoped>

</style>