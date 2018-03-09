<template>
    <div>
        <button v-if="showAlertUnlockSuccess === undefined || showAlertUnlockSuccess === true && showAlertUnlockSuccess !== false" class="btn btn-outline-success btn-block" @click="unlock()" @dblclick="unlockdbl()">
            <i class="fa fa-unlock fa-fw"></i>
            <span>Desbloquear Cuenta</span>
        </button>
        <button v-if="showAlertUnlockSuccess === false" class="btn btn-outline-dark btn-block"
                @click="unlock()">
            <i class="fa fa-refresh fa-fw"></i>
            <span>Intentar Nuevamente</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "unlock"
    }
</script>

<style scoped>

</style>