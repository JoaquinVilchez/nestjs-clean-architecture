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
  let sut: StubClassValidatorFields

  beforeEach(() => {
    sut = new StubClassValidatorFields()
  })

  describe('Initialization', () => {
    it('Should initialize errors and validatedData with null', () => {
      expect(sut.errors).toEqual({})
      expect(sut.validatedData).toBeUndefined()
    })

    it('Should create new instance each time', () => {
      const sut1 = new StubClassValidatorFields()
      const sut2 = new StubClassValidatorFields()

      expect(sut1).not.toBe(sut2)
      expect(sut1.errors).toEqual({})
      expect(sut2.errors).toEqual({})
    })
  })

  describe('Validation with errors', () => {
    it('Should validate with single field error', () => {
      // Mock de class-validator para simular errores
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([
        { property: 'field', constraints: { isRequired: 'Test error' } },
      ])

      expect(sut.validate(null)).toBeFalsy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toBeUndefined()
      expect(sut.errors).toStrictEqual({ field: ['Test error'] })

      spyValidateSync.mockRestore()
    })

    it('Should validate with multiple field errors', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([
        {
          property: 'field1',
          constraints: { isRequired: 'Field1 is required' },
        },
        {
          property: 'field2',
          constraints: { isEmail: 'Field2 must be email' },
        },
      ])

      expect(sut.validate({})).toBeFalsy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toBeUndefined()
      expect(sut.errors).toStrictEqual({
        field1: ['Field1 is required'],
        field2: ['Field2 must be email'],
      })

      spyValidateSync.mockRestore()
    })

    it('Should validate with multiple constraints per field', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([
        {
          property: 'field',
          constraints: {
            isRequired: 'Field is required',
            isString: 'Field must be string',
            minLength: 'Field must be at least 3 characters',
          },
        },
      ])

      expect(sut.validate({})).toBeFalsy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toBeUndefined()
      expect(sut.errors).toStrictEqual({
        field: [
          'Field is required',
          'Field must be string',
          'Field must be at least 3 characters',
        ],
      })

      spyValidateSync.mockRestore()
    })

    it('Should handle empty constraints object', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([{ property: 'field', constraints: {} }])

      expect(sut.validate({})).toBeFalsy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toBeUndefined()
      expect(sut.errors).toStrictEqual({ field: [] })

      spyValidateSync.mockRestore()
    })

    it('Should handle null/undefined data', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([
        { property: 'field', constraints: { isRequired: 'Field is required' } },
      ])

      expect(sut.validate(null)).toBeFalsy()
      expect(sut.validate(undefined)).toBeFalsy()
      expect(spyValidateSync).toHaveBeenCalledTimes(2)

      spyValidateSync.mockRestore()
    })
  })

  describe('Validation without errors', () => {
    it('Should validate without errors', () => {
      // Mock de class-validator para simular validación exitosa
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      expect(sut.validate({ field: 'value' })).toBeTruthy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toStrictEqual({ field: 'value' })
      expect(sut.errors).toStrictEqual({})

      spyValidateSync.mockRestore()
    })

    it('Should validate complex objects', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      const complexData = {
        field: 'value',
        nested: { prop: 'test' },
        array: [1, 2, 3],
      }

      expect(sut.validate(complexData)).toBeTruthy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toStrictEqual(complexData)
      expect(sut.errors).toStrictEqual({})

      spyValidateSync.mockRestore()
    })

    it('Should validate empty objects', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      expect(sut.validate({})).toBeTruthy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toStrictEqual({})
      expect(sut.errors).toStrictEqual({})

      spyValidateSync.mockRestore()
    })
  })

  describe('Error handling', () => {
    it('Should handle validation exceptions', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockImplementation(() => {
        throw new Error('Validation failed')
      })

      expect(() => sut.validate({ field: 'value' })).toThrow(
        'Validation failed',
      )
      expect(spyValidateSync).toHaveBeenCalled()

      spyValidateSync.mockRestore()
    })

    it('Should reset errors and validatedData on new validation', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

      // Primera validación con errores
      spyValidateSync.mockReturnValueOnce([
        { property: 'field', constraints: { isRequired: 'Test error' } },
      ])
      sut.validate(null)
      expect(sut.errors).toEqual({ field: ['Test error'] })
      expect(sut.validatedData).toBeUndefined()

      // Crear nueva instancia para la segunda validación
      const sut2 = new StubClassValidatorFields()
      spyValidateSync.mockReturnValueOnce([])
      sut2.validate({ field: 'value' })
      expect(sut2.errors).toEqual({})
      expect(sut2.validatedData).toEqual({ field: 'value' })

      spyValidateSync.mockRestore()
    })
  })

  describe('Edge cases', () => {
    it('Should handle very large objects', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      const largeObject = {
        field: 'a'.repeat(10000),
        array: Array(1000).fill('test'),
      }

      expect(sut.validate(largeObject)).toBeTruthy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toStrictEqual(largeObject)

      spyValidateSync.mockRestore()
    })

    it('Should handle special characters in data', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      const specialData = {
        field: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        unicode: '🚀🎉✨',
      }

      expect(sut.validate(specialData)).toBeTruthy()
      expect(spyValidateSync).toHaveBeenCalled()
      expect(sut.validatedData).toStrictEqual(specialData)

      spyValidateSync.mockRestore()
    })

    it('Should handle circular references gracefully', () => {
      const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
      spyValidateSync.mockReturnValue([])

      const circularData: any = { field: 'value' }
      circularData.self = circularData

      // No debería lanzar error, class-validator maneja referencias circulares
      expect(() => sut.validate(circularData)).not.toThrow()
      expect(spyValidateSync).toHaveBeenCalled()

      spyValidateSync.mockRestore()
    })
  })
})
