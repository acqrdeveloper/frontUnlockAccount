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
                        <div hidden class="alert alert-danger">
                            <h4><i class="fa fa-exclamation-triangle fa-fw"></i>Error</h4>
                            <strong>Estimado lo sentimos hemos tenido un problema, para proceder a desbloquear tu cuenta de red intentalo nuevamente</strong><br>
                            <small v-if="false">Si el problema persiste, comunicate al 215-5400 opcion #3</small>
                        </div>
                        <div hidden class="alert alert-success">
                            <h4><i class="fa fa-check fa-fw"></i>Bien</h4>
                            <strong>Estimado se ha procedido a desbloquear tu cuenta de red con exito</strong>
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
                        <div hidden class="row">
                            <div class="col-6">
                                <button class="btn btn-success btn-block">
                                    <i class="fa fa-unlock"></i>
                                    <span>Unlock Computer</span>
                                </button>
                                <button hidden class="btn btn-info btn-block">
                                    <i class="fa fa-unlock"></i>
                                    <span>Intentalo Nuevamente</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-block">
                                    <i class="fa fa-home"></i>
                                    <span>Reset Password</span>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="alert alert-info">
                                    <span>Para proceder a resetear su contraseña, como medida de seguridad, le hemos enviado un sms al numero movil <b>9*******73</b></span>
                                </div>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-success btn-block">
                                    <i class="fa fa-check"></i>
                                    <span>Yes</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-dark btn-block">
                                    <i class="fa fa-close"></i>
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
                                    <input type="text" class="form-control" placeholder="Dni, Username, Phone" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-search fa-fw"></i>Buscar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="text-right">
                                    <router-link class="btn btn-danger" :to="'/search'"><i class="fa fa-close fa-fw"></i>Finalizar</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "select-action"
    }
</script>

<style scoped>

</style>