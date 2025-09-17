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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const errors: ValidationError[] = validateSync(data as object)

    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const field = error.property
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.constraints) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
