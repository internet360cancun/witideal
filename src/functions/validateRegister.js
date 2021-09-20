// const axios = require('axios');

// async function emailExists (email){
//     try {
//        let is= await axios.post('https://us-central1-witideal-b1f99.cloudfunctions.net/emailExists',{'email':email})
//        return is.data
//     } catch (error) {
//         console.log(error)
//     }


// }

export default async function validateRegister(values,inputName){
    let errors = {};
    //const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])(?=.{6,})");
    // const rfcMRegex = new RegExp("^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$");
    // const rfcFRegex = new RegExp("^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
    // "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$")

    switch (inputName) {

        case 'All':

        //nameErrrors
        if (!values.name) {
            errors.name = 'Requerido';
        }

        //lastNameErrrors
        if (!values.lastname) {
            errors.lastname= 'Requerido';
        }

        //phoneErrors
        if (!values.phone.toString()) {
            errors.phone= 'Requerido';
            } else if (!/^[0-9]{10}$/i.test(values.phone)) {
                errors.phone= 'Por favor introduzca un número telefonico válido';
            }

        //emailErrors
        if (!values.email) {
            errors.email = 'Requerido';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'La dirección de correo no es válida';
             } // }else if(emailExists(values.email)){
            // errors.email = 'Ya existe una cuenta registrada con ese correo'
            // }


        //password errors
        if(!values.password){
            errors.password='Requerido'
        }else if(values.password.length<8) {
            errors.password = 'El formato de la contraseña no es válido';
            }

        //confirmationErrors
        if(!values.cpassword){
            errors.cpassword='Requerido'
        }else if(values.cpassword!==values.password) {
            errors.cpassword='Las contraseñas no coinciden';
            }

        return errors;
                
        //federated validation
        case 'Federated':

            //nameErrrors
            if (!values.name) {
                errors.name = 'Requerido';
            }

            //lastNameErrrors
            if (!values.lastname) {
                errors.lastname= 'Requerido';
            }

            //phoneErrors
            if (!values.phone.toString()) {
                errors.phone= 'Requerido';
                } else if (!/^[0-9]{10}$/i.test(values.phone)) {
                    errors.phone= 'El teléfono tiene que tener 10 dígitos';
                }

            //emailErrors
            if (!values.email) {
                errors.email = 'Requerido';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'La dirección de correo no es válida';
                }// }else if(emailExists(values.email)){
                //     errors.email = 'Ya existe una cuenta registrada con ese correo'
                // }
            return errors;

        case 'name':
            if (!values.name) {
                return 'Requerido';
            }
            break;
        case 'lastname':
                if (!values.lastname) {
                    return 'Requerido';
                }
                break;
        case 'phone':
                if (!values.phone.toString()) {
                    return 'Requerido';
                    } else if (!/^[0-9]{10}$/i.test(values.phone)) {
                    return 'El teléfono tiene que tener 10 dígitos';
                    }
                break;

        case 'cpassword':
            if(!values.cpassword){
                return'Requerido'
            }else if(values.cpassword!==values.password) {
                return 'Las contraseñas no coinciden';
                }
            break;

        case 'email':
            if (!values.email) {
                return 'Requerido';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return 'La dirección de correo no es válida';
                }// }else if(await emailExists(values.email)){
                //     return 'Ya existe una cuenta registrada con ese correo'
                //     }
            break;


        case 'password':
        if(!values.password){
            return'Requerido'
        }else if(values.password.length<8) {
            return 'La contraseña tiene que incluir al menos 8 caracteres.';
            }
        else if(values.cpassword===values.password){
            return 'cpassMatch'
        }
        break;


        default:
            return errors
    }

}