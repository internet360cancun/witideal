export const cardError = errorCode => {
    switch (errorCode) {

        case 1000:
            return 'Ocurrió un error interno en el servidor de Openpay';
            break;
        case 1001:
            return 'Alguno de los campos no es correcto';
            break;

        case 1002:
            return 'La llamada no está autenticada o la autenticación es incorrecta';
            break;

        case 1003:
            return 'La operación no se pudo completar por que el valor de uno o más de los parámetros no es correcto.'
            break;

        case 1004:
            return 'Un servicio necesario para el procesamiento de la transacción no se encuentra disponible.'
            break;

        case 1005:
            return 'Uno de los recursos requeridos no existe.'
            break;
        case 1006:
            return 'Ya existe una transacción con el mismo ID de orden'
            break;
        case 1007:
            return 'La transferencia de fondos entre una cuenta de banco o tarjeta y la cuenta de Openpay no fue aceptada.'
            break;
        case 1008:
            return 'Una de las cuentas requeridas en la petición se encuentra desactivada.'
            break;
        case 1009:
            return 'El cuerpo de la petición es demasiado grande.'
            break;
        case 1010:
            return 'Se esta utilizando la llave pública para hacer una llamada que requiere la llave privada, o bien, se esta usando la llave privada desde JavaScript.'
            break;
        case 1011:
            return 'Se solicita un recurso que esta marcado como eliminado.'
            break;
        case 1012:
            return 'El monto transacción esta fuera de los limites permitidos.'
            break;
        case 1013:
            return 'La operación no esta permitida para el recurso.'
            break;
        case 1014:
            return 'La cuenta esta inactiva.'
            break;
        case 1016:
            return 'El mail del comercio ya ha sido procesada.'
            break;
        case 1017:
            return 'El gateway no se encuentra disponible en ese momento.'
            break;
        case 1018:
            return 'El número de intentos de cargo es mayor al permitido.'
            break;
        case 1020:
            return 'El número de dígitos decimales es inválido para esta moneda'
            break;

        case 2001:
            return 'La cuenta de banco con esta CLABE ya se encuentra registrada en el cliente.'
            break;
        case 2002:
            return 'La tarjeta con este número ya se encuentra registrada en el cliente.'
            break;
        case 2003:
            return 'El cliente con este identificador externo (External ID) ya existe.'
            break;
        case 2004:
            return 'El dígito verificador del número de tarjeta es inválido de acuerdo al algoritmo Luhn.'
            break;
        case 2005:
            return 'La fecha de expiración de la tarjeta es anterior a la fecha actual.'
            break;
        case 2006:
            return 'El código de seguridad de la tarjeta (CVV2) no fue proporcionado.'
            break;
        case 2007:
            return 'El número de tarjeta es de prueba, solamente puede usarse en Sandbox.'
            break;
        case 2008:
            return 'La tarjeta no es valida para puntos Santander.'
            break;
        case 2009:
            return 'El código de seguridad de la tarjeta (CVV2) es inválido.'
            break;
        case 2010:
            return 'Autenticación 3D Secure fallida.'
            break;
        case 2011:
            return 'Tipo de tarjeta no soportada'
            break;





        case 3001:
            return 'La tarjeta fue declinada';
            break;

        case 3002:
            return 'La tarjeta ha expirado';
            break;

        case 3003:
            return 'La tarjeta no tiene fondos suficientes';
            break;

        case 3004:
            return 'La tarjeta ha sido identificada como una tarjeta robada';
            break;

        case 3005:
            return 'La tarjeta ha sido identificada como una tarjeta fraudulenta';
            break;

        case 3006:
            return 'La operación no esta permitida para este cliente o esta transacción.';
            break;

        case 3008:
            return 'La tarjeta no es soportada en transacciones en linea.';
            break;

        case 3009:
            return 'La tarjeta fue reportada como perdida.';
            break;

        case 3010:
            return 'El banco ha restringido la tarjeta';
            break;

        case 3011:
            return 'El banco ha solicitado que la tarjeta sea retenida. Contacte al banco';
            break;

        case 3012:
            return 'Se requiere solicitar al banco autorización para realizar este pago';
            break;


        default:
            break;
    }
}