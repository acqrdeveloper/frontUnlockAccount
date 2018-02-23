<template>
    <section>
        <div class="card mt-5">
            <div class="card-header mt-auto mb-auto">
                <div class="text-center">
                    <span class="h2">Bienvenidos al portal de Autoatencion</span>
                </div>
            </div>
            <div class="card-body">
                <div v-if="msg !== undefined" class="alert alert-danger">
                    <h5>Error</h5>
                    <span>{{msg}}</span>
                </div>
                <form @submit.prevent="search()">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <input v-model="params.text_search" placeholder="Dni, Phone, Username" title="ingrese su dni, celular, usuario" type="text" class="form-control form-control-lg" required>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block">Buscar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import SERVICE from "../services/ApiService";
    export default {
        name: "search",
        data:()=>({
            msg:undefined,
           params:{
               text_search:""
           }
        }),
        methods:{
            search(){
                SERVICE.dispatch("search",{self:this});
            }
        }
    }
</script>

<style scoped>

</style>