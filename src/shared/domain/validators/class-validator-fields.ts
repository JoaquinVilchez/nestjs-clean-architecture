import { validateSync, ValidationError } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = {}
  validatedData: PropsValidated | undefined = undefined

  validate(data: unknown): boolean {
    const errors: ValidationError[] = validateSync(data as object)

    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property

        if (error.constraints) {
          this.errors[field] = Object.values(error.constraints)
        }
      }
      this.validatedData = undefined
    } else {
      this.validatedData = data as PropsValidated
    }

    return !errors.length
  }
}
