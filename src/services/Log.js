/**
 * Created by aquispe on 5/03/2018.
 **/

const Log = {
    //Funcion traza usuario confirma desbloqueo
    logUnlockAccountSuccess(user) {
        return user + " desbloqueó su cuenta con éxito";
    },
    logUnlockAccountError(user) {
        return user + " no pudo desbloquear su cuenta";
    },
    //Funcion traza usuario acepta recibir codigo de seguridad
    logReceivedCode(user) {
        return user + " aceptó recibir codigo de seguridad";
    },
    //Funcion traza usuario envia codigo de seguridad recibido por el movil
    logAcceptCode(user, obj) {
        return user + " envió codigo de seguridad " + obj.code_security;
    },
    //Funcion traza usuario confirma reseteo
    logResetPwd(user) {
        return user + " reseteó su contraseña con éxito";
    }
};
export default Log;