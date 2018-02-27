<template>
    <div v-if="Object.keys(dataAlert).length > 0">
        <template v-if="dataAlert.status === 200">
            <div  class="alert alert-success">
                <h5><i class="fa fa-check fa-fw"></i>Bien</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
        <template v-if="dataAlert.status === 412">
            <div class="alert alert-danger">
                <h5><i class="fa fa-close fa-fw"></i>Error</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "alert-notify",
        props: ['dataAlert'],
        data: () => ({
            obj:this.dataAlert
        }),
        created() {}
    }
</script>