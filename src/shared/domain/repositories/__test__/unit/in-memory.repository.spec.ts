/**
 * ARCHIVO: in-memory.repository.spec.ts
 * UBICACIÓN: /shared/domain/repositories/__test__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests están en /shared porque prueban la funcionalidad compartida
 * de InMemoryRepository que usan TODOS los repositorios en memoria del dominio. Al estar
 * en /shared, estos tests se ejecutan una sola vez para validar la funcionalidad común
 * de CRUD en memoria en toda la aplicación.
 *
 * FUNCIONALIDAD: Tests unitarios para InMemoryRepository que verifican el comportamiento
 * correcto de todas las operaciones CRUD (insert, findById, findAll, update, delete)
 * incluyendo casos de éxito y manejo de errores.
 *
 * BENEFICIO: Garantiza que la funcionalidad base de repositorios en memoria funcione
 * correctamente y que se manejen apropiadamente los casos de entidad no encontrada.
 */

import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

// Entidad stub para testing que extiende Entity base
type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

// Repositorio stub que extiende InMemoryRepository para testing
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  // Prueba inserción de nueva entidad en el repositorio
  it('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  // Prueba error cuando se busca entidad que no existe
  it('should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  // Prueba búsqueda exitosa de entidad por ID
  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  // Prueba retorno de todas las entidades del repositorio
  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  // Prueba error al intentar actualizar entidad que no existe
  it('should throw error when trying to update non-existent entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  // Prueba actualización exitosa de entidad existente
  it('should update an entity successfully', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const entityUpdated = new StubEntity(
      {
        name: 'test name updated',
        price: 100,
      },
      entity._id,
    )
    await sut.update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  // Prueba error al intentar eliminar entidad que no existe
  it('should throw error when trying to delete non-existent entity', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  // Prueba eliminación exitosa de entidad existente
  it('should delete an entity successfully', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity.id)
    expect(sut.items).toHaveLength(0)
  })
})
