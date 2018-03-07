/**
 * Created by aquispe on 28/02/2018.
 **/

import $ from 'jquery';
const Util = {
    //Funcion que muestra la carga por modal
    openLoadModal(self){
        self.showLoadingModal = true;
        $(document).ready(() => {
            $('#modalLoad').modal({show: true, backdrop: 'static', keyboard: false});
        });
    },
    //Funcion que oculta la carga por modal
    closeLoadModal(self){
        $('#modalLoad').modal('hide');
        self.showLoadingModal = false;
    },
};

export default Util;