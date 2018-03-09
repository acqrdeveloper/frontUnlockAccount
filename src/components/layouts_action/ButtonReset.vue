<template>
    <button class="btn btn-outline-danger btn-block" @click="reset()">
        <i class="fa fa-home fa-fw"></i>
        <span>Reset Contraseña</span>
    </button>
</template>

<script>
    export default {
        name: "button-reset",
        methods:{
            reset(){
                this.$emit("listenReset")
            }
        }
    }
</script>

<style scoped>

</style>