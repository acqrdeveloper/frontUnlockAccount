<template>
    <button title="click para inciar los pasos del reseteo de contraseña." class="btn btn-outline-danger btn-block" @click="reset()">
        <i class="fa fa-recycle fa-fw"></i>
        <span>Resetear Contraseña</span>
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