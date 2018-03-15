<template>
        <button class="btn btn-outline-success btn-block" @click="unlock()">
            <i class="fa fa-unlock fa-fw"></i>
            <span>Desbloquear Cuenta</span>
        </button>
</template>

<script>
export default {
	name: "button-unlock",
	methods:{
		unlock(){
			this.$emit("listenUnlock")
		}
	}
}
</script>

<style scoped>

</style>