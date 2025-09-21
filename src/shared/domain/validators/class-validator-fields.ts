/**
 * ARCHIVO: class-validator-fields.ts
 *
 * FUNCIONALIDAD: Clase abstracta que implementa la validación usando class-validator.
 * Proporciona una interfaz consistente para validar datos y manejar errores de validación.
 *
 * BENEFICIO: Centraliza la lógica de validación con class-validator, proporciona
 * una interfaz consistente y facilita el manejo de errores de validación.
 */

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
      // Procesa cada error y agrupa por campo
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
