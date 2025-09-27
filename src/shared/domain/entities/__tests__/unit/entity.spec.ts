/**
 * ARCHIVO: entity.spec.ts
 * UBICACIÓN: /shared/domain/entities/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests están en /shared porque prueban la funcionalidad compartida
 * de la clase base Entity. Al estar en /shared, estos tests se ejecutan una sola vez para
 * validar la funcionalidad común que usan todas las entidades de la aplicación.
 *
 * FUNCIONALIDAD: Tests unitarios para la clase base Entity que verifican el comportamiento
 * correcto de la generación de ID, asignación de propiedades y serialización JSON.
 *
 * BENEFICIO: Garantiza que todas las entidades del dominio tengan un comportamiento
 * consistente y que la funcionalidad base funcione correctamente.
 */

import { Entity } from '@/shared/domain/entities/entity'

type StubProps = {
  prop1: string
  prop2: number
}

// Función auxiliar para validar que un string sea un UUID válido
function uuidValidate(uuid: string) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return regex.test(uuid)
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  describe('Constructor', () => {
    it('Should set props and id', () => {
      const props = {
        prop1: 'value1',
        prop2: 10,
      }

      const entity = new StubEntity(props)

      expect(entity.props).toStrictEqual(props)
      expect(entity._id).not.toBeNull()
      // Verifica que el ID generado sea un UUID válido
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should accept a valid uuid', () => {
      const props = {
        prop1: 'value1',
        prop2: 15,
      }

      const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
      const entity = new StubEntity(props, id)

      expect(uuidValidate(entity._id)).toBeTruthy()
      expect(entity._id).toBe(id)
    })

    it('Should generate different UUIDs for different instances', () => {
      const props = {
        prop1: 'value1',
        prop2: 10,
      }

      const entity1 = new StubEntity(props)
      const entity2 = new StubEntity(props)

      expect(entity1._id).not.toBe(entity2._id)
      expect(uuidValidate(entity1._id)).toBeTruthy()
      expect(uuidValidate(entity2._id)).toBeTruthy()
    })

    it('Should handle empty props object', () => {
      const props = {} as StubProps
      const entity = new StubEntity(props)

      expect(entity.props).toStrictEqual({})
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should handle props with null values', () => {
      const props = {
        prop1: null as any,
        prop2: null as any,
      }

      const entity = new StubEntity(props)

      expect(entity.props).toStrictEqual(props)
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should handle props with undefined values', () => {
      const props = {
        prop1: undefined as any,
        prop2: undefined as any,
      }

      const entity = new StubEntity(props)

      expect(entity.props).toStrictEqual(props)
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })
  })

  describe('ID Management', () => {
    it('Should maintain ID consistency', () => {
      const props = { prop1: 'value1', prop2: 10 }
      const entity = new StubEntity(props)
      const originalId = entity._id

      // El ID no debe cambiar después de la creación
      expect(entity._id).toBe(originalId)
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should accept various valid UUID formats', () => {
      const props = { prop1: 'value1', prop2: 10 }
      const validUuids = [
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        '00000000-0000-0000-0000-000000000000',
        'ffffffff-ffff-ffff-ffff-ffffffffffff',
        '12345678-1234-1234-1234-123456789abc',
      ]

      validUuids.forEach(uuid => {
        const entity = new StubEntity(props, uuid)
        expect(entity._id).toBe(uuid)
        expect(uuidValidate(entity._id)).toBeTruthy()
      })
    })
  })

  describe('toJSON method', () => {
    it('Should convert a entity to a JSON object', () => {
      const props = {
        prop1: 'value1',
        prop2: 15,
      }

      const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
      const entity = new StubEntity(props, id)

      expect(entity.toJSON()).toStrictEqual({
        id,
        ...props,
      })
    })

    it('Should include all props in JSON output', () => {
      const props = {
        prop1: 'test',
        prop2: 42,
      }

      const entity = new StubEntity(props)
      const json = entity.toJSON()

      expect(json.id).toBe(entity._id)
      expect(json.prop1).toBe(props.prop1)
      expect(json.prop2).toBe(props.prop2)
    })

    it('Should return consistent JSON for same entity', () => {
      const props = { prop1: 'value1', prop2: 10 }
      const entity = new StubEntity(props)

      const json1 = entity.toJSON()
      const json2 = entity.toJSON()

      expect(json1).toStrictEqual(json2)
    })

    it('Should handle complex nested objects in props', () => {
      const props = {
        prop1: 'value1',
        prop2: 42,
      }

      const entity = new StubEntity(props)
      const json = entity.toJSON()

      expect(json.id).toBe(entity._id)
      expect(json.prop1).toBe(props.prop1)
      expect(json.prop2).toBe(props.prop2)
    })
  })

  describe('Edge Cases', () => {
    it('Should handle very long string values', () => {
      const longString = 'a'.repeat(10000)
      const props = {
        prop1: longString,
        prop2: 10,
      }

      const entity = new StubEntity(props)

      expect(entity.props.prop1).toBe(longString)
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should handle special characters in props', () => {
      const props = {
        prop1: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        prop2: 10,
      }

      const entity = new StubEntity(props)

      expect(entity.props.prop1).toBe(props.prop1)
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })

    it('Should handle numeric edge cases', () => {
      const props = {
        prop1: 'value1',
        prop2: Number.MAX_SAFE_INTEGER,
      }

      const entity = new StubEntity(props)

      expect(entity.props.prop2).toBe(Number.MAX_SAFE_INTEGER)
      expect(entity._id).not.toBeNull()
      expect(uuidValidate(entity._id)).toBeTruthy()
    })
  })
})
