export function errorParser (error) {
    console.log('error', error)
    //Auth 100X
    //Storage 200X
    //Firestore 300X
    //Openpay 400X
    console.log('error.code', error.code)
    console.log('error.error_code', error.error_code)
    if (error.error_code!==undefined || error.code!==undefined) {
        let parsedErr={},
            code = error.error_code===undefined?error.code.toString().toLowerCase():error.error_code.toString().toLowerCase()
        console.log('code', code)
        switch (code) {
            case 'auth/popup-closed-by-user':
                //parsedErr={error_code:1000,description:'La ventana emergente fue cerrada'}
                parsedErr={error_code:'backdoor',description:'backdoor'}
                break;
            
            case 'auth/app-deleted' :
                parsedErr={error_code:1001,description:'La aplicación fue elimidada'}
                break;
            case 'auth/app-not-authorized' :
            parsedErr={error_code:1002,description:'Aplicación no autorizada para autenticar con FiBa'}
            break;
            case 'auth/argument-error' :
            parsedErr={error_code:1003,description:'El método fue invocado con argumentos no válidos'}
            break;
            case 'auth/invalid-api-key' :
            parsedErr={error_code:1004,description:'El API Key no es válido'}
            break;
            case 'auth/invalid-user-token' :
            parsedErr={error_code:1005,description:'El token de usuario no es válido'}
            break;
            case 'auth/invalid-tenant-id' :
            parsedErr={error_code:1006,description:'Identificador de inquilino no válido'}
            break;
            case 'auth/network-request-failed' :
            parsedErr={error_code:1007,description:'Error de Red'}
            break;
            case 'auth/operation-not-allowed' :
            parsedErr={error_code:1008,description:'El método de autenticación no esta habilitado'}
            break;
            case 'auth/requires-recent-login' :
            parsedErr={error_code:1009,description:'Se requiere volver a iniciar sesión'}
            break;
            case 'auth/too-many-requests' :
            parsedErr={error_code:1010,description:'Bloqueo por actividad sospechosa, intente iniciar sesión más tarde'}
            break;
            case 'auth/unauthorized-domain' :
            parsedErr={error_code:1011,description:'Dominio no autorizado'}
            break;
            case 'auth/user-disabled' :
            parsedErr={error_code:1012,description:'Usuario deshabilitado'}
            break;
            case 'auth/user-token-expired' :
            parsedErr={error_code:1013,description:'El token de usuario expiró'}
            break;
            case 'auth/web-storage-unsupported' :
            parsedErr={error_code:1014,description:'El almacenamiento web esta deshabilidado o no es soportado'}
            break;
            case 'auth/account-exists-with-different-credential' :
            parsedErr={error_code:1015,description:'EL correo se encuentra registrado en otro método de acceso'}
            break;
            case 'auth/credential-already-in-use' :
            parsedErr={error_code:1016,description:'Credenciales en uso'}
            break;
            case 'auth/email-already-in-use' :
            parsedErr={error_code:1017,description:'El email ya esta en uso'}
            break;
            case 'auth/wrong-password' :
            parsedErr={error_code:1018,description:'La contraseña es incorrecta'}
            break;
            case 'auth/user-not-found' :
            parsedErr={error_code:1019,description:'El usuario no existe'}
            break;
            case 'auth/invalid-verification-code' :
            parsedErr={error_code:1020,description:'Codigo de verificación no válido'}
            break;
            case 'auth/provider-already-linked' :
            parsedErr={error_code:1021,description:'La cuenta que se intenta ligar al proveedor de autenticación ya está ligada'}
            break;
            case 'auth/captcha-check-failed' :
            parsedErr={error_code:1022,description:'Verificación captcha fallida'}
            break;
            case 'auth/invalid-phone-number' :
            parsedErr={error_code:1023,description:'Número telefónico no válido'}
            break;
            case 'auth/missing-phone-number' :
            parsedErr={error_code:1024,description:'Número telefónico vacío'}
            break;
            case 'auth/missing-verification-code' :
            parsedErr={error_code:1025,description:'Número de verificación vacío'}
            break;
            case 'storage/unknown' :
            parsedErr={error_code:2000,description:'Oops algo salió mal '}
            break;
            case 'storage/object-not-found' :
            parsedErr={error_code:2001,description:'No se encontró objeto en esa referencia'}
            break;
            case 'storage/bucket-not-found' :
            parsedErr={error_code:2002,description:'Bucket no encontrado'}
            break;
            case 'storage/project-not-found' :
            parsedErr={error_code:2003,description:'No se encontró proyecto'}
            break;
            case 'storage/quota-exceeded' :
            parsedErr={error_code:2004,description:'La cuota se ha exedido'}
            break;
            case 'storage/unauthenticated' :
            parsedErr={error_code:2005,description:'Usuario no autenticado'}
            break;
            case 'storage/unauthorized' :
            parsedErr={error_code:2006,description:'Usuario no autorizado'}
            break;
            case 'storage/retry-limit-exceeded' :
            parsedErr={error_code:2007,description:'Límite de reintentos excedido'}
            break;
            case 'storage/invalid-checksum' :
            parsedErr={error_code:2008,description:'El archivo no cumplió con los requisitos, intente subirlo de nuevo'}
            break;
            case 'storage/canceled' :
            parsedErr={error_code:2009,description:'Operación cancelada por el usuario'}
            break;
            case 'storage/invalid-event-name' :
            parsedErr={error_code:2010,description:'El nombre de evento no es válido'}
            break;
            case 'storage/invalid-url' :
            parsedErr={error_code:2011,description:'La url provista para obtener la referencia no es válida'}
            break;
            case 'storage/invalid-argument' :
            parsedErr={error_code:2012,description:'Formato de archivo no válido para la carga'}
            break;
            case 'storage/no-default-bucket' :
            parsedErr={error_code:2013,description:'No hay bucket predeterminado'}
            break;
            case 'storage/cannot-slice-blob' :
            parsedErr={error_code:2014,description:'El archivo no se pudo subir, probablemente fue modificado'}
            break;
            case 'storage/server-file-wrong-size' :
            parsedErr={error_code:2015,description:'El peso del archivo no cuadra con el servidor, intente nuevamente'}
            break;
            case 'cancelled' :
            parsedErr={error_code:3000,description:'Operación cancelada'}
            break;
            case 'unknown' :
            parsedErr={error_code:3001,description:'Error desconocido o de dominio diferente'}
            break;
            case 'invalid-argument' :
            parsedErr={error_code:3002,description:'Se envió un argumento no válido'}
            break;
            case 'deadline-exceeded' :
            parsedErr={error_code:3003,description:'La respuesta superó el límite de espera'}
            break;
            case 'not-found' :
            parsedErr={error_code:3004,description:'No se encontró el documento'}
            break;
            case 'already-exists' :
            parsedErr={error_code:3005,description:'El documento ya existe'}
            break;
            case 'permission-denied' :
            parsedErr={error_code:3006,description:'Permiso denegado'}
            break;
            case 'resource-exhausted' :
            parsedErr={error_code:3007,description:'El recurso esta agotado'}
            break;
            case 'failed-precondition' :
            parsedErr={error_code:3008,description:'No se cumplió con las condiciones previas necesarias'}
            break;
            case 'aborted' :
            parsedErr={error_code:3009,description:'Operación abortada'}
            break;
            case 'out-of-range' :
            parsedErr={error_code:3010,description:'Operación fuera de rango válido'}
            break;
            case 'unimplemented' :
            parsedErr={error_code:3011,description:'Operación no habilitada'}
            break;
            case 'internal' :
            parsedErr={error_code:3012,description:'Error interno del servidor'}
            break;
            case 'unavailable' :
            parsedErr={error_code:3013,description:'Operación no disponible'}
            break;
            case 'data-loss' :
            parsedErr={error_code:3014,description:'Peridad de datos / Datos corruptos'}
            break;
            case 'unauthenticated' :
            parsedErr={error_code:3015,description:'Se requiere autenticación'}
            break;

            case '1000':
            parsedErr={error_code:4000,description:'Ocurrió un error interno en el servidor de Openpay'}
            break;
        case '1001':
            parsedErr={error_code:4001,description:'Alguno de los campos no es correcto'}
            break;

        case '1002':
            parsedErr={error_code:4002,description:'La llamada no esta autenticada o la autenticació es incorrecta'}
            break;

        case '1003':
            parsedErr={error_code:4003,description:'La operación no se pudo completar por que el valor de uno o más de los parametros no es correcto.'}
            break;

        case '1004':
            parsedErr={error_code:4004,description:'Un servicio necesario para el procesamiento de la transacción no se encuentra disponible.'}
            break;

        case '1005':
            parsedErr={error_code:4005,description:'Uno de los recursos requeridos no existe.'}
            break;
        case '1006':
            parsedErr={error_code:4006,description:'Ya existe una transacción con el mismo ID de orden'}
            break;
        case '1007':
            parsedErr={error_code:4007,description:'La transferencia de fondos entre una cuenta de banco o tarjeta y la cuenta de Openpay no fue aceptada.'}
            break;
        case '1008':
            parsedErr={error_code:4008,description:'Una de las cuentas requeridas en la petición se encuentra desactivada.'}
            break;
        case '1009':
            parsedErr={error_code:4009,description:'El cuerpo de la petición es demasiado grande.'}
            break;
        case '1010':
            parsedErr={error_code:4010,description:'Se esta utilizando la llave pública para hacer una llamada que requiere la llave privada, o bien, se esta usando la llave privada desde JavaScript.'}
            break;
        case '1011':
            parsedErr={error_code:4011,description:'Se solicita un recurso que esta marcado como eliminado.'}
            break;
        case '1012':
            parsedErr={error_code:4012,description:'El monto transacción esta fuera de los limites permitidos.'}
            break;
        case '1013':
            parsedErr={error_code:4013,description:'La operación no esta permitida para el recurso.'}
            break;
        case '1014':
            parsedErr={error_code:4014,description:'La cuenta esta inactiva.'}
            break;
        case '1016':
            parsedErr={error_code:4015,description:'El mail del comercio ya ha sido procesada.'}
            break;
        case '1017':
            parsedErr={error_code:4016,description:'El gateway no se encuentra disponible en ese momento.'}
            break;
        case '1018':
            parsedErr={error_code:4017,description:'El número de intentos de cargo es mayor al permitido.'}
            break;
        case '1020':
            parsedErr={error_code:4018,description:'El número de dígitos decimales es inválido para esta moneda'}
            break;

        case '2001':
            parsedErr={error_code:4019,description:'La cuenta de banco con esta CLABE ya se encuentra registrada en el cliente.'}
            break;
        case '2002':
            parsedErr={error_code:4020,description:'La tarjeta con este número ya se encuentra registrada en el cliente.'}
            break;
        case '2003':
            parsedErr={error_code:4021,description:'El cliente con este identificador externo (External ID) ya existe.'}
            break;
        case '2004':
            parsedErr={error_code:4022,description:'El dígito verificador del número de tarjeta es inválido de acuerdo al algoritmo Luhn.'}
            break;
        case '2005':
            parsedErr={error_code:4023,description:'La fecha de expiración de la tarjeta es anterior a la fecha actual.'}
            break;
        case '2006':
            parsedErr={error_code:4024,description:'El código de seguridad de la tarjeta (CVV2) no fue proporcionado.'}
            break;
        case '2007':
            parsedErr={error_code:4025,description:'El número de tarjeta es de prueba, solamente puede usarse en Sandbox.'}
            break;
        case '2008':
            parsedErr={error_code:4026,description:'La tarjeta no es valida para puntos Santander.'}
            break;
        case '2009':
            parsedErr={error_code:4027,description:'El código de seguridad de la tarjeta (CVV2) es inválido.'}
            break;
        case '2010':
            parsedErr={error_code:4028,description:'Autenticación 3D Secure fallida.'}
            break;
        case '2011':
            parsedErr={error_code:4029,description:'Tipo de tarjeta no soportada'}
            break;





        case '3001':
            parsedErr={error_code:4030,description:'La tarjeta fue declinada'}
            break;

        case '3002':
            parsedErr={error_code:4031,description:'La tarjeta ha expirado'}
            break;

        case '3003':
            parsedErr={error_code:4032,description:'La tarjeta no tiene fondos suficientes'}
            break;

        case '3004':
            parsedErr={error_code:4033,description:'La tarjeta ha sido identificada como una tarjeta robada'}
            break;

        case '3005':
            parsedErr={error_code:4034,description:'La tarjeta ha sido identificada como una tarjeta fraudulenta'}
            break;

        case '3006':
            parsedErr={error_code:4035,description:'La operación no esta permitida para este cliente o esta transacción.'}
            break;

        case '3008':
            parsedErr={error_code:4036,description:'La tarjeta no es soportada en transacciones en linea.'}
            break;

        case '3009':
            parsedErr={error_code:4037,description:'La tarjeta fue reportada como perdida.'}
            break;

        case '3010':
            parsedErr={error_code:4038,description:'El banco ha restringido la tarjeta'}
            break;

        case '3011':
            parsedErr={error_code:4039,description:'El banco ha solicitado que la tarjeta sea retenida. Contacte al banco'}
            break;

        case '3012':
            parsedErr={error_code:4040,description:'Se requiere solicitar al banco autorización para realizar este pago'}
            break;


            default:
                parsedErr={error_code:9999,description:'Oops algo salió mal'}
                break;
        }
        return parsedErr
    } else if(error.description!==undefined){
        switch (error.description) {
        
            default:
                break;
        }
    }else{
        return {error_code:9000,description:'Oops algo salió mal'}
    }
    
}