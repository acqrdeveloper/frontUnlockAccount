<template>
    <form @submit.prevent="searchChild()">
        <div class="row">
            <div class="col-sm-12 col-md-9">
                <input ref="inputSearch" v-model="params.text_search" placeholder="Buscar por nombre de usuario o dni"
                       title="buscar por nombre de usuario o dni" type="text" class="form-control"
                       required autofocus/>
            </div>
            <div class="col-sm-12 col-md-3">
                <button type="submit" class="btn btn-primary btn-block"><i
                        class="fa fa-search fa-fw"></i>Buscar
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "form-search",
        props: {
            params: {},
        },
        methods: {
            searchChild() {
                this.$emit('listenSearch',this);
            }
        }
    }
</script>

<style scoped>

</style>