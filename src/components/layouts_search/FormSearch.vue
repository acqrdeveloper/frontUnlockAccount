<template>
    <form @submit.prevent="searchChild">
        <div class="row">
            <!--<div class="col-3">-->
            <!--<select name="" id="" class="form-control">-->
            <!--<option value="1" selected>Usuario</option>-->
            <!--<option value="2">Administrador</option>-->
            <!--</select>-->
            <!--</div>-->
            <div class="col-7">
                <input ref="inputSearch" v-model="params.text_search" placeholder="Buscar por username, dni o email"
                       title="buscar por nombre de usuario o dni" type="text" class="form-control"
                       required autofocus/>
            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary btn-block">
                            <i class="fa fa-search fa-fw"></i>Buscar
                        </button>
                    </div>
                    <div class="col-6 m-auto">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="xy">
                            <label class="form-check-label" for="xy">Administrador</label>
                        </div>
                    </div>
                </div>
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
      searchChild () {
        this.$emit('listenSearch', this)
      },
    },
  }
</script>

<style scoped>

</style>