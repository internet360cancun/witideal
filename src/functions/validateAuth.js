export default function validateAuth(values,inputName){
    let errors = {};

    switch (inputName) {
        case 'email':
            if (!values.email) {
                return 'Requerido';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return 'La dirección de correo no es válida';
                }
        break;
            
        case 'password':
            //password errors
       
        if(!values.password){
            return'Requerido'
        }else if(values.password.length<8) {
            return 'La contraseña debe contener al menos 8 caracteres';
            }
        break;

        case 'All':
        //emailErrors
        if (!values.email) {
            errors.email = 'Requerido';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'La dirección de correo no es válida';
            }

         //password errors
         if(!values.password){
             errors.password='Requerido'
         }else if(values.password.length<8) {
             errors.password = 'La contraseña debe contener al menos 8 caracteres';
             }
        return errors;

        default:
            return errors
    }
    
}