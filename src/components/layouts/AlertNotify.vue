<template>
    <div>
        <template v-if="dataAlert.status === 200">
            <div class="alert alert-success">
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5>Mensaje</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
        <template v-if="dataAlert.status !== 200">
            <div :class=" dataAlert.class != undefined ? 'alert alert-' + dataAlert.class : 'alert alert-danger' ">
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" class="mb-auto mt-auto">&times;</span>
                </button>
                <h5>Mensaje</h5>
                <span>{{dataAlert.data}}</span>
            </div>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'alert-notify',
    props: {dataAlert: {}},
    methods: {
      close () {
        this.$emit('eventCloseNotify', this)
      }
    }
  }
</script>