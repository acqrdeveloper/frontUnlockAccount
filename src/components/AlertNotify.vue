<template>
    <div>
        <template v-if="dataAlert.status === 200">
            <div class="alert alert-success">
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5><i class="fa fa-check fa-fw"></i>Bien</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
        <template v-if="dataAlert.status === 412">
            <div class="alert alert-danger">
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5><i class="fa fa-close fa-fw"></i>Error</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "alert-notify",
        props: {dataAlert: {}},
        data: () => ({}),
        created() {
        },
        methods: {
            close() {
                this.$emit("eventCloseNotify", this);
            }
        }
    }
</script>