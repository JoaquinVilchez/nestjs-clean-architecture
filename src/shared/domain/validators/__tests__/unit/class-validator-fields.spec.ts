/**
 * ARCHIVO: class-validator-fields.spec.ts
 * UBICACIÓN: /shared/domain/validators/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests están en /shared porque prueban la funcionalidad compartida
 * de ClassValidatorFields que usan TODOS los validadores del dominio. Al estar en /shared,
 * estos tests se ejecutan una sola vez para validar la lógica común de validación.
 *
 * FUNCIONALIDAD: Tests unitarios para ClassValidatorFields que verifican el comportamiento
 * correcto de la validación, manejo de errores y almacenamiento de datos validados.
 *
 * BENEFICIO: Garantiza que la lógica de validación funcione correctamente y que se
 * manejen apropiadamente tanto los casos de éxito como los de error.
 */

import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields unit test', () => {
  it('Should initialize errors and validatedData with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toBeUndefined()
  })

  it('Should validate with errors', () => {
    // Mock de class-validator para simular errores
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'Test error' } },
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ field: ['Test error'] })
  })

  it('Should validate without errors', () => {
    // Mock de class-validator para simular validación exitosa
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toStrictEqual({})
  })
})
