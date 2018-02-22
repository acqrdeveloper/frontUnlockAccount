<template>
    <section>
        <div class="card mt-5">
            <div class="card-header mt-auto mb-auto">
                <div class="text-center">
                    <span class="h2">Bienvenidos al portal de Autoatencion</span>
                </div>
            </div>
            <!--<div class="card-body">-->
            <div id="mybody" :class="true ? 'card-body loading' : 'card-body'">
                <form>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <input placeholder="Dni, Phone, Username" title="ingrese su dni, celular, usuario"
                                       type="text" class="form-control form-control-lg" required>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <!--<button type="submit" class="btn btn-primary btn-lg btn-block">Buscar</button>-->
                                <router-link class="btn btn-primary btn-lg btn-block" :to="'/select-action'"><span>Buscar</span>
                                </router-link>
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
    #mybody {
        /* For the loading indicator to be vertically centered ensure */
        /* the html and body elements take up the full viewport */
        min-height: 100%;
    }

    #mybody.loading {
        /* Replace #333 with the background-color of your choice */
        /* Replace loading.gif with the loading image of your choice */
        /*background: #333 url('loading.gif') no-repeat 50% 50%;*/

        /* Ensures that the transition only runs in one direction */
        -webkit-transition: background-color 0;
        transition: background-color 0;
    }

    #mybody {
        -webkit-transition: opacity 1s ease-in;
        transition: opacity 1s ease-in;
    }

    /*#mybody.loading {*/
        /*!* Make the contents of the body opaque during loading *!*/
        /*opacity: 0;*/

        /*!* Ensures that the transition only runs in one direction *!*/
        /*-webkit-transition: opacity 0;*/
        /*transition: opacity 0;*/
    /*}*/
</style>