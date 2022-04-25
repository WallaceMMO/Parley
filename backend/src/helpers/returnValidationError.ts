import {ValidationError} from 'class-validator'

export function returnValidateErrorString(error: ValidationError) {
    console.log(error.constraints)
    if(error.constraints.isNotEmpty) {
        return error.constraints.isNotEmpty as string
    } else if(error.constraints.isEmail) {
        return error.constraints.isEmail as string
    } else if(error.constraints.minLength) {
        return error.constraints.minLength as string
    } else if(error.constraints.isDate) {
        return error.constraints.isDate as string
    }
}