<template>
    <div class="modal" id="modalLoad" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-muted text-center">
                                <i class="fa fa-circle-o-notch fa-spin fa-4x"></i>
                                <p class="mt-2 mb-0">Procesando Solicitud</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "load-modal",
}
</script>

<style scoped>

</style>