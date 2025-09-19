import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

// Clase de prueba que extiende ClassValidatorFields
class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields unit test', () => {
  // Verifica que al crear la clase, los errores y datos validados estén vacíos
  it('Should initialize errors and validatedData with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toBeUndefined()
  })

  // Verifica que cuando hay errores de validación, el método validate retorna false
  it('Should validate with errors', () => {
    // Simula que class-validator encuentra errores
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'Test error' } },
    ])
    const sut = new StubClassValidatorFields()

    // Valida que retorne false y guarde los errores
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ field: ['Test error'] })
  })

  // Verifica que cuando no hay errores, el método validate retorna true
  it('Should validate without errors', () => {
    // Simula que class-validator no encuentra errores
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    // Valida que retorne true y guarde los datos
    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toStrictEqual({})
  })
})
