import $ from 'jquery'

export default {
  //Funcion que muestra la carga por modal
  openLoadModal(self) {
    self.showLoadingModal = true
    $(document).ready(() => {
      $('#modalLoad').modal({show: true, backdrop: 'static', keyboard: false})
    })
  },
  //Funcion que oculta la carga por modal
  closeLoadModal(self) {
    $('#modalLoad').modal('hide')
    self.showLoadingModal = false
  },
}