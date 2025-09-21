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
})
