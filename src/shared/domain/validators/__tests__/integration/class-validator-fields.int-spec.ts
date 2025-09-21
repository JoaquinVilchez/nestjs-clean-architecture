/**
 * ARCHIVO: class-validator-fields.int-spec.ts
 * UBICACIÓN: /shared/domain/validators/__tests__/integration/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests de integración están en /shared porque prueban la
 * integración compartida entre ClassValidatorFields y class-validator que usan TODOS
 * los validadores del dominio. Al estar en /shared, estos tests validan la integración
 * común una sola vez para toda la aplicación.
 *
 * FUNCIONALIDAD: Tests de integración para ClassValidatorFields que verifican el
 * funcionamiento correcto con class-validator real, incluyendo decoradores y validaciones.
 *
 * BENEFICIO: Garantiza que la integración entre nuestra clase abstracta y las
 * decoraciones de validación funcione correctamente en escenarios reales.
 */

import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields integration test', () => {
  it('Should validate with errors', () => {
    const validator = new StubClassValidatorFields()

    expect(validator.validate(null)).toBeFalsy()

    // Verifica que se capturen todos los errores de validación específicos
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    })
  })

  it('Should validate without errors', () => {
    const validator = new StubClassValidatorFields()

    expect(validator.validate({ name: 'value', price: 10 })).toBeTruthy()

    // Verifica que los datos validados se guarden como instancia de StubRules
    expect(validator.validatedData).toStrictEqual(
      new StubRules({
        name: 'value',
        price: 10,
      }),
    )
  })
})
