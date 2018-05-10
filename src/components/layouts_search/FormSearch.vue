<template>
    <form @submit.prevent="searchChild">
        <div class="row">
            <div class="col-8">
                <input ref="inputSearch" v-model="params.text_search"
                       placeholder="Buscar por username, dni o email"
                       title="buscar por nombre de usuario o dni"
                       type="text"
                       class="form-control"
                       required autofocus/>
            </div>
            <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fa fa-search fa-fw"></i>Buscar
                </button>
            </div>
        </div>
    </form>
</template>

<script>
  export default {
    name: 'form-search',
    props: {
      params: {},
    },
    methods: {
      searchChild() {
        this.$emit('listenSearch', this)
      },
    },
  }
</script>

<style scoped>

</style>