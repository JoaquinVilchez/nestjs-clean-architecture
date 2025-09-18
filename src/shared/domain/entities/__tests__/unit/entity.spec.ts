import { Entity } from '@/shared/domain/entities/entity'

// Test unitario de Entity: verifica que la clase base Entity funcione correctamente
// Beneficio: garantiza que todas las entidades del dominio tengan un comportamiento consistente

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

// Clase de prueba que extiende Entity para poder testearla
class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  // Test 1: Verifica que el constructor inicialice correctamente las propiedades y genere un ID
  it('Should set props and id', () => {
    // 1. Crear datos de prueba
    const props = {
      prop1: 'value1',
      prop2: 10,
    }

    // 2. Crear una nueva entidad (sin pasar ID, debe generarse automáticamente)
    const entity = new StubEntity(props)

    // 3. Verificar que las propiedades se asignaron correctamente
    expect(entity.props).toStrictEqual(props)

    // 4. Verificar que se generó un ID (no sea null)
    expect(entity._id).not.toBeNull()

    // 5. Verificar que el ID generado sea un UUID válido
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  // Test 2: Verifica que se pueda pasar un UUID válido al constructor
  it('Should accept a valid uuid', () => {
    // 1. Crear datos de prueba
    const props = {
      prop1: 'value1',
      prop2: 15,
    }

    // 2. Definir un UUID válido específico
    const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'

    // 3. Crear entidad pasando el UUID específico
    const entity = new StubEntity(props, id)

    // 4. Verificar que el ID sea un UUID válido
    expect(uuidValidate(entity._id)).toBeTruthy()

    // 5. Verificar que el ID sea exactamente el que pasamos
    expect(entity._id).toBe(id)
  })

  // Test 3: Verifica que el método toJSON convierta la entidad a objeto JSON correctamente
  it('Should convert a entity to a JSON object', () => {
    // 1. Crear datos de prueba
    const props = {
      prop1: 'value1',
      prop2: 15,
    }

    // 2. Definir un UUID específico
    const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'

    // 3. Crear entidad con datos y ID específicos
    const entity = new StubEntity(props, id)

    // 4. Verificar que toJSON() retorne un objeto con id y todas las propiedades
    expect(entity.toJSON()).toStrictEqual({
      id, // El ID debe estar en la raíz del objeto
      ...props, // Todas las propiedades deben estar incluidas
    })
  })
})
