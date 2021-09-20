import {useState} from 'react';

function useFormValidation(initialState,validate){
    const [Values, setValues] = useState(initialState)
    const [Errors, setErrors] = useState({})

    function handleChange(event){
        if(event.target.name==='notify' || event.target.name==='termsNconditions'){
            setValues({...Values,
                [event.target.name]:event.target.checked,
                }) 
        }
        else if(event.target.value==='true'){
            setValues({...Values,
                [event.target.name]:false,
                })
        }else if(event.target.value==='false'){
            setValues({...Values,
                [event.target.name]:true,
                })
        }else{
        setValues({...Values,
        [event.target.name]:event.target.value,
        })
    }
    }

    async function handleBlur(e){
        var name = e.target.name;
        var valRes = await validate(Values,e.target.name);
        if (valRes !== undefined && valRes !=='cpassMatch' & Object.keys(valRes).length>0){
         setErrors({...Errors, [name]:valRes} );
        }else{
            if (valRes==='cpassMatch'){
                delete Errors['cpassword']
            }
            if(Errors[name]){
                delete Errors[name];
            }
            setErrors({...Errors});
        }
    }


    return {handleChange, handleBlur, Errors,Values, setErrors, setValues}
}

export default useFormValidation