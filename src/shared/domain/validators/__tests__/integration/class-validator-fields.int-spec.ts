import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

// Test de integración: verifica que ClassValidatorFields funcione correctamente con class-validator real
// Beneficio: garantiza que la integración entre nuestra clase abstracta y las decoraciones de validación funcione en producción

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
  // Caso 1: Valida que cuando los datos son inválidos, se capturen TODOS los errores de validación
  it('Should validate with errors', () => {
    // 1. Crear una instancia del validador
    const validator = new StubClassValidatorFields()

    // 2. Intentar validar datos nulos (inválidos) y verificar que retorne false
    expect(validator.validate(null)).toBeFalsy()

    // 3. Verificar que se hayan capturado todos los errores de validación específicos
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty', // Error por @IsNotEmpty()
        'name must be a string', // Error por @IsString()
        'name must be shorter than or equal to 255 characters', // Error por @MaxLength(255)
      ],
      price: [
        'price should not be empty', // Error por @IsNotEmpty()
        'price must be a number conforming to the specified constraints', // Error por @IsNumber()
      ],
    })
  })

  // Caso 2: Valida que cuando los datos son válidos, se retorne true y se guarden los datos transformados
  it('Should validate without errors', () => {
    // 1. Crear una instancia del validador
    const validator = new StubClassValidatorFields()

    // 2. Validar datos válidos y verificar que retorne true
    expect(validator.validate({ name: 'value', price: 10 })).toBeTruthy()

    // 3. Verificar que los datos validados se hayan guardado correctamente como instancia de StubRules
    expect(validator.validatedData).toStrictEqual(
      new StubRules({
        name: 'value',
        price: 10,
      }),
    )
  })
})
