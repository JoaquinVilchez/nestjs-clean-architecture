/**
 * ARCHIVO: user-in-memory.repository.spec.ts
 * UBICACIÓN: /users/infrastructure/database/in-memory/repositories/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests del repositorio de usuarios están en /users/infrastructure
 * porque prueban la funcionalidad específica del repositorio de usuarios en memoria.
 * Al estar en /infrastructure, estos tests validan la implementación técnica del
 * repositorio de usuarios sin depender de la lógica de negocio del dominio.
 *
 * FUNCIONALIDAD: Tests unitarios para UserInMemoryRepository que verifican el
 * comportamiento correcto de los métodos específicos de usuarios como findByEmail
 * y emailExists, incluyendo casos de éxito y manejo de errores.
 *
 * BENEFICIO: Garantiza que la implementación del repositorio de usuarios funcione
 * correctamente y que se manejen apropiadamente todos los casos de búsqueda y validación.
 */

import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserInMemoryRepository } from '../../user-in-memory.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/use-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('UserInMemoryRepository', () => {
  let sut: UserInMemoryRepository

  // Configuración del repositorio antes de cada test
  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('User not found with email a@a.com'),
    )
  })

  // Prueba que findByEmail lance error cuando no encuentra el usuario
  it('Should find a entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findByEmail(entity.props.email)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when email already exists - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExists(entity.props.email)).rejects.toThrow(
      new ConflictError('Email address already used'),
    )
  })

  it('Should not throw error when email does not exist - emailExists method', async () => {
    await expect(sut.emailExists('a@a.com')).resolves.toBeUndefined()
  })

  it('Should not filter items when filter object is null', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const itemsFiltered = await sut['applyFilter'](result, null as any)

    // Verifica que cuando el filtro es null, devuelve todos los items sin filtrar
    expect(itemsFiltered).toStrictEqual(result)
    expect(itemsFiltered).toHaveLength(1)
  })

  it('Should filter name field using filter param', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'test1' })),
      new UserEntity(UserDataBuilder({ name: 'test2' })),
      new UserEntity(UserDataBuilder({ name: 'test3' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente

    const itemsFiltered = await sut['applyFilter'](result, 'test2')

    // Verifica que filtra correctamente por nombre
    expect(itemsFiltered).toStrictEqual([items[1]])
    expect(itemsFiltered).toHaveLength(1)
  })

  it('Should sort by createdAt desc when sort param is null', async () => {
    const items = [
      new UserEntity(
        UserDataBuilder({ name: 'test1', createdAt: new Date(2025, 1, 1) }),
      ),
      new UserEntity(
        UserDataBuilder({ name: 'test2', createdAt: new Date(2025, 1, 2) }),
      ),
      new UserEntity(
        UserDataBuilder({ name: 'test3', createdAt: new Date(2025, 1, 3) }),
      ),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applySort para probar directamente

    const itemsSorted = sut['applySort'](result, null, null)

    // Cuando sort es null, debería ordenar por createdAt desc (más reciente primero)
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]])
    expect(itemsSorted).toHaveLength(3)
  })

  it('Should sort by name when sort param is provided', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'test1' })),
      new UserEntity(UserDataBuilder({ name: 'test2' })),
      new UserEntity(UserDataBuilder({ name: 'test3' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applySort para probar directamente

    // Orden ascendente por nombre: test1, test2, test3
    let itemsSorted = sut['applySort'](result, 'name', 'asc')
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]])

    // Orden descendente por nombre: test3, test2, test1
    itemsSorted = sut['applySort'](result, 'name', 'desc')
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]])
    expect(itemsSorted).toHaveLength(3)
  })

  it('Should filter by email field using filter param', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ email: 'test1@example.com' })),
      new UserEntity(UserDataBuilder({ email: 'test2@example.com' })),
      new UserEntity(UserDataBuilder({ email: 'test3@example.com' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente
    const itemsFiltered = await sut['applyFilter'](result, 'test2@example.com')

    // Verifica que filtra correctamente por email
    expect(itemsFiltered).toStrictEqual([items[1]])
    expect(itemsFiltered).toHaveLength(1)
  })

  it('Should filter by partial name match', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'John Doe' })),
      new UserEntity(UserDataBuilder({ name: 'Jane Smith' })),
      new UserEntity(UserDataBuilder({ name: 'Bob Johnson' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente
    const itemsFiltered = await sut['applyFilter'](result, 'John')

    // Verifica que filtra por coincidencia parcial
    expect(itemsFiltered).toStrictEqual([items[0], items[2]])
    expect(itemsFiltered).toHaveLength(2)
  })

  it('Should return empty array when no items match filter', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'test1' })),
      new UserEntity(UserDataBuilder({ name: 'test2' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente
    const itemsFiltered = await sut['applyFilter'](result, 'nonexistent')

    // Verifica que devuelve array vacío cuando no hay coincidencias
    expect(itemsFiltered).toStrictEqual([])
    expect(itemsFiltered).toHaveLength(0)
  })

  it('Should sort by email field', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ email: 'c@example.com' })),
      new UserEntity(UserDataBuilder({ email: 'a@example.com' })),
      new UserEntity(UserDataBuilder({ email: 'b@example.com' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applySort para probar directamente
    const itemsSorted = sut['applySort'](result, 'email', 'asc')

    // Orden ascendente por email: a, b, c
    expect(itemsSorted).toStrictEqual([items[1], items[2], items[0]])
    expect(itemsSorted).toHaveLength(3)
  })

  it('Should handle case insensitive filtering', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test User' })),
      new UserEntity(UserDataBuilder({ name: 'test user' })),
      new UserEntity(UserDataBuilder({ name: 'TEST USER' })),
    ]
    await sut.insert(items[0])
    await sut.insert(items[1])
    await sut.insert(items[2])
    const result = await sut.findAll()

    // Accede al método privado applyFilter para probar directamente
    const itemsFiltered = await sut['applyFilter'](result, 'test')

    // Verifica que filtra sin importar mayúsculas/minúsculas
    expect(itemsFiltered).toStrictEqual([items[0], items[1], items[2]])
    expect(itemsFiltered).toHaveLength(3)
  })
})
