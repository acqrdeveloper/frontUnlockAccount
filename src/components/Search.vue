<template>
    <section>
        <div class="card mt-5">
                <div class="card-header mt-auto mb-auto">
                    <div class="text-center">
                        <span class="h2">Bienvenidos al portal de Autoatencion</span>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group">
                                    <input placeholder="Dni, Phone, Username" title="ingrese su dni, celular, usuario" type="text" class="form-control form-control-lg" required>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group">
                                    <!--<button type="submit" class="btn btn-primary btn-lg btn-block">Buscar</button>-->
                                    <router-link class="btn btn-primary btn-lg btn-block" :to="'/select-action'"><span>Buscar</span></router-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </section>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style scoped>

</style>