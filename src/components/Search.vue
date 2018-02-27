<template>
    <section>
        <div class="text-center mt-5">
            <img class="img-thumbnail" style="background-color: transparent;border: 0;width: 180px" src="logo.svg" alt="">
        </div>
        <div class="col-6 offset-3">
            <div class="card mt-5">
                <div class="card-header mt-auto mb-auto">
                    <my-title/>
                </div>
                <div class="card-body">
                    <alert-notify :data-alert="dataAlert"/>
                    <form @submit.prevent="search()">
                        <div class="row">
                            <div class="col-sm-12 col-md-9">
                                <input ref="input_search" v-model="params.text_search" placeholder="Dni, Phone, Username" title="ingrese su dni, celular, usuario" type="text" class="form-control" required/>
                            </div>
                            <div class="col-sm-12 col-md-3">
                                <button type="submit" class="btn btn-primary btn-block"><i
                                        class="fa fa-search fa-fw"></i>Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SERVICE from "../services/ApiService";
    import MyTitle from "../components/MyTitle";
    import AlertNotify from "../components/AlertNotify";

    export default {
        components: {AlertNotify, MyTitle},
        name: "search",
        data: () => ({
            msg: undefined,
            params: {
                text_search: ""
            },
            dataAlert:{}
        }),
        methods: {
            search() {
                SERVICE.dispatch("searchText", {self: this});
            }
        }
    }

</script>

<style scoped>

</style>