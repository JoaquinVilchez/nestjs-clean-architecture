/**
 * ARCHIVO: class-validator-fields.ts
 * UBICACIÓN: /shared/domain/validators/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Esta clase abstracta está en /shared/domain porque es la base
 * para TODOS los validadores del dominio en cualquier módulo. Al estar en /shared,
 * evita duplicar la lógica de integración con class-validator en cada módulo y
 * garantiza consistencia en el comportamiento de validación en toda la aplicación.
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
