/**
 * ARCHIVO: in-memory-serchable.repository.spec.ts
 * UBICACIÓN: /shared/domain/repositories/__test__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests están en /shared porque prueban la funcionalidad compartida
 * de InMemorySerchableRepository que usan TODOS los repositorios con búsqueda del dominio.
 * Al estar en /shared, estos tests se ejecutan una sola vez para validar la funcionalidad
 * común de búsqueda, filtrado, ordenamiento y paginación en toda la aplicación.
 *
 * FUNCIONALIDAD: Tests unitarios para InMemorySerchableRepository que verifican el
 * comportamiento correcto de los métodos applyFilter, applySort y applyPaginate,
 * incluyendo casos edge y validaciones de funcionalidad de búsqueda.
 *
 * BENEFICIO: Garantiza que la funcionalidad de búsqueda compartida funcione correctamente
 * y que se manejen apropiadamente todos los casos de filtrado, ordenamiento y paginación.
 */

import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySerchableRepository } from '../../in-memory-serchable.repository'
import { SearchParams } from '../../serchable-repository-contracts'

// Entidad stub para testing que extiende Entity base
type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

// Repositorio stub que extiende InMemorySerchableRepository para testing
class StubInMemorySerchableRepository extends InMemorySerchableRepository<StubEntity> {
  // Define que solo el campo 'name' es ordenable para las pruebas
  sortableFields: string[] = ['name']

  // Implementación concreta del filtrado para testing (filtra por nombre)
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return Promise.resolve(items)
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
}

describe('InMemorySerchableRepository unit tests', () => {
  let sut: StubInMemorySerchableRepository

  // Configuración del repositorio stub antes de cada test
  beforeEach(() => {
    sut = new StubInMemorySerchableRepository()
  })

  // Tests para el método applyFilter que implementa el filtrado de elementos
  describe('applyFilter method', () => {
    // Prueba que cuando no hay filtro, retorna todos los elementos
    it('should return all items when filter is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 50 })]
      const itemsFiltered = await sut['applyFilter'](items, null)
      expect(itemsFiltered).toStrictEqual(items)
    })

    // Prueba que el filtrado funciona correctamente con un término de búsqueda
    it('should filter using filter param', async () => {
      const items = [
        new StubEntity({ name: 'name value', price: 50 }),
        new StubEntity({ name: 'test name', price: 30 }),
        new StubEntity({ name: 'test value', price: 50 }),
      ]

      const itemsFiltered = await sut['applyFilter'](items, 'TEST NAME')

      expect(itemsFiltered).toHaveLength(1)
      expect(itemsFiltered[0].props.name).toBe('test name')
      expect(itemsFiltered[0].props.price).toBe(30)
    })

    // Prueba que el filtrado es insensible a mayúsculas/minúsculas
    it('should filter case insensitively', async () => {
      const items = [
        new StubEntity({ name: 'Juan Pérez', price: 50 }),
        new StubEntity({ name: 'juan garcía', price: 50 }),
        new StubEntity({ name: 'CARLOS LÓPEZ', price: 50 }),
      ]

      const itemsFiltered = await sut['applyFilter'](items, 'juan')

      expect(itemsFiltered).toHaveLength(2)
      expect(itemsFiltered.map(item => item.props.name)).toEqual([
        'Juan Pérez',
        'juan garcía',
      ])
    })

    // Prueba que retorna array vacío cuando no hay coincidencias
    it('should return empty array when no matches', async () => {
      const items = [
        new StubEntity({ name: 'Ana', price: 50 }),
        new StubEntity({ name: 'Carlos', price: 50 }),
      ]

      const itemsFiltered = await sut['applyFilter'](items, 'Pedro')

      expect(itemsFiltered).toStrictEqual([])
    })
  })

  // Tests para el método applySort que implementa el ordenamiento de elementos
  describe('applySort method', () => {
    // Prueba ordenamiento ascendente por nombre
    it('should sort items by name in ascending order', () => {
      const items = [
        new StubEntity({ name: 'c', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
      ]

      const itemsSorted = sut['applySort'](items, 'name', 'asc')

      expect(itemsSorted.map(item => item.props.name)).toEqual(['a', 'b', 'c'])
    })

    // Prueba ordenamiento descendente por nombre
    it('should sort items by name in descending order', () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
      ]

      const itemsSorted = sut['applySort'](items, 'name', 'desc')

      expect(itemsSorted.map(item => item.props.name)).toEqual(['c', 'b', 'a'])
    })

    // Prueba que no ordena cuando sort es null
    it('should return items unchanged when sort is null', () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
      ]

      const itemsSorted = sut['applySort'](items, null, null)

      expect(itemsSorted).toStrictEqual(items)
    })

    // Prueba que no ordena cuando el campo no está en sortableFields
    it('should return items unchanged when sort field is not sortable', () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
      ]

      const itemsSorted = sut['applySort'](items, 'price', 'asc')

      expect(itemsSorted).toStrictEqual(items)
    })
  })

  // Tests para el método applyPaginate que implementa la paginación de elementos
  describe('applyPaginate method', () => {
    // Prueba paginación correcta para la primera página
    it('should paginate items correctly for first page', () => {
      const items = [
        new StubEntity({ name: 'item1', price: 10 }),
        new StubEntity({ name: 'item2', price: 20 }),
        new StubEntity({ name: 'item3', price: 30 }),
        new StubEntity({ name: 'item4', price: 40 }),
        new StubEntity({ name: 'item5', price: 50 }),
      ]

      const itemsPaginated = sut['applyPaginate'](items, 1, 2)

      expect(itemsPaginated).toHaveLength(2)
      expect(itemsPaginated[0].props.name).toBe('item1')
      expect(itemsPaginated[1].props.name).toBe('item2')
    })

    // Prueba paginación correcta para la segunda página
    it('should paginate items correctly for second page', () => {
      const items = [
        new StubEntity({ name: 'item1', price: 10 }),
        new StubEntity({ name: 'item2', price: 20 }),
        new StubEntity({ name: 'item3', price: 30 }),
        new StubEntity({ name: 'item4', price: 40 }),
        new StubEntity({ name: 'item5', price: 50 }),
      ]

      const itemsPaginated = sut['applyPaginate'](items, 2, 2)

      expect(itemsPaginated).toHaveLength(2)
      expect(itemsPaginated[0].props.name).toBe('item3')
      expect(itemsPaginated[1].props.name).toBe('item4')
    })

    // Prueba que retorna página parcial cuando hay menos elementos que perPage
    it('should return partial page when items are less than perPage', () => {
      const items = [
        new StubEntity({ name: 'item1', price: 10 }),
        new StubEntity({ name: 'item2', price: 20 }),
      ]

      const itemsPaginated = sut['applyPaginate'](items, 1, 5)

      expect(itemsPaginated).toHaveLength(2)
      expect(itemsPaginated[0].props.name).toBe('item1')
      expect(itemsPaginated[1].props.name).toBe('item2')
    })

    // Prueba que retorna array vacío cuando la página está más allá de los elementos disponibles
    it('should return empty array when page is beyond available items', () => {
      const items = [
        new StubEntity({ name: 'item1', price: 10 }),
        new StubEntity({ name: 'item2', price: 20 }),
      ]

      const itemsPaginated = sut['applyPaginate'](items, 3, 2)

      expect(itemsPaginated).toHaveLength(0)
    })
  })

  describe('search method', () => {
    // Test básico: solo paginación
    it('should apply only pagination when the other params are null', async () => {
      const items = Array(16)
        .fill(null)
        .map(() => new StubEntity({ name: 'test', price: 50 }))
      sut.items = items

      const params = await sut.search(new SearchParams())

      expect(params.items).toHaveLength(15)
      expect(params.total).toBe(16)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(15)
      expect(params.sort).toBeNull()
      expect(params.sortDir).toBeNull()
      expect(params.filter).toBeNull()

      params.items.forEach(item => {
        expect(item.props.name).toBe('test')
        expect(item.props.price).toBe(50)
      })
    })

    // Test: filtro + paginación
    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'test2', price: 50 }),
        new StubEntity({ name: 'test3', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          filter: 'test',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(3)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(2)
      expect(params.sort).toBeNull()
      expect(params.sortDir).toBeNull()
      expect(params.filter).toBe('test')

      params.items.forEach(item => {
        expect(item.props.name).toContain('test')
        expect(item.props.price).toBe(50)
      })
    })

    // Test: ordenamiento + paginación
    it('should apply sort and paginate', async () => {
      const items = [
        new StubEntity({ name: 'zebra', price: 50 }),
        new StubEntity({ name: 'apple', price: 50 }),
        new StubEntity({ name: 'banana', price: 50 }),
        new StubEntity({ name: 'cherry', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDir: 'asc',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(4)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(2)
      expect(params.sort).toBe('name')
      expect(params.sortDir).toBe('asc')
      expect(params.filter).toBeNull()

      expect(params.items[0].props.name).toBe('apple')
      expect(params.items[1].props.name).toBe('banana')
    })

    // Test: filtro + ordenamiento + paginación (combinación completa)
    it('should apply filter, sort and paginate together', async () => {
      const items = [
        new StubEntity({ name: 'zebra test', price: 50 }),
        new StubEntity({ name: 'apple test', price: 50 }),
        new StubEntity({ name: 'banana test', price: 50 }),
        new StubEntity({ name: 'cherry other', price: 50 }),
        new StubEntity({ name: 'delta test', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          filter: 'test',
          sort: 'name',
          sortDir: 'asc',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(4) // 4 elementos coinciden con 'test'
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(2)
      expect(params.sort).toBe('name')
      expect(params.sortDir).toBe('asc')
      expect(params.filter).toBe('test')

      expect(params.items[0].props.name).toBe('apple test')
      expect(params.items[1].props.name).toBe('banana test')
    })

    // Test: segunda página con filtro
    it('should return second page with filter applied', async () => {
      const items = [
        new StubEntity({ name: 'test1', price: 50 }),
        new StubEntity({ name: 'test2', price: 50 }),
        new StubEntity({ name: 'test3', price: 50 }),
        new StubEntity({ name: 'test4', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 2,
          filter: 'test',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(4)
      expect(params.currentPage).toBe(2)
      expect(params.perPage).toBe(2)
      expect(params.filter).toBe('test')

      expect(params.items[0].props.name).toBe('test3')
      expect(params.items[1].props.name).toBe('test4')
    })

    // Test: ordenamiento descendente
    it('should sort in descending order', async () => {
      const items = [
        new StubEntity({ name: 'apple', price: 50 }),
        new StubEntity({ name: 'zebra', price: 50 }),
        new StubEntity({ name: 'banana', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          sort: 'name',
          sortDir: 'desc',
        }),
      )

      expect(params.items).toHaveLength(3)
      expect(params.total).toBe(3)
      expect(params.sort).toBe('name')
      expect(params.sortDir).toBe('desc')

      expect(params.items[0].props.name).toBe('zebra')
      expect(params.items[1].props.name).toBe('banana')
      expect(params.items[2].props.name).toBe('apple')
    })

    // Test: filtro que no encuentra resultados
    it('should return empty results when filter finds no matches', async () => {
      const items = [
        new StubEntity({ name: 'apple', price: 50 }),
        new StubEntity({ name: 'banana', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          filter: 'nonexistent',
        }),
      )

      expect(params.items).toHaveLength(0)
      expect(params.total).toBe(0)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(15)
      expect(params.filter).toBe('nonexistent')
    })

    // Test: página más allá de los resultados disponibles
    it('should return empty results when page is beyond available items', async () => {
      const items = [
        new StubEntity({ name: 'test1', price: 50 }),
        new StubEntity({ name: 'test2', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 3,
          perPage: 2,
          filter: 'test',
        }),
      )

      expect(params.items).toHaveLength(0)
      expect(params.total).toBe(2)
      expect(params.currentPage).toBe(3)
      expect(params.perPage).toBe(2)
      expect(params.filter).toBe('test')
    })

    // Test: filtro vacío (string vacío)
    it('should treat empty string filter as null', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          filter: '',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(2)
      expect(params.filter).toBeNull() // El filtro vacío se convierte a null
    })

    // Test: campo de ordenamiento no válido
    it('should ignore invalid sort field', async () => {
      const items = [
        new StubEntity({ name: 'zebra', price: 50 }),
        new StubEntity({ name: 'apple', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          sort: 'invalidField',
          sortDir: 'asc',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(2)
      expect(params.sort).toBe('invalidField')
      expect(params.sortDir).toBe('asc')
      // Los items deben mantener el orden original
      expect(params.items[0].props.name).toBe('zebra')
      expect(params.items[1].props.name).toBe('apple')
    })

    // Test: perPage personalizado
    it('should respect custom perPage value', async () => {
      const items = Array(10)
        .fill(null)
        .map((_, index) => new StubEntity({ name: `test${index}`, price: 50 }))
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          perPage: 3,
        }),
      )

      expect(params.items).toHaveLength(3)
      expect(params.total).toBe(10)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(3)
    })

    // Test: página personalizada
    it('should respect custom page value', async () => {
      const items = Array(10)
        .fill(null)
        .map((_, index) => new StubEntity({ name: `test${index}`, price: 50 }))
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 3,
        }),
      )

      expect(params.items).toHaveLength(3)
      expect(params.total).toBe(10)
      expect(params.currentPage).toBe(2)
      expect(params.perPage).toBe(3)
    })

    // Test: filtro case insensitive
    it('should apply case insensitive filter', async () => {
      const items = [
        new StubEntity({ name: 'Test Name', price: 50 }),
        new StubEntity({ name: 'TEST VALUE', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          filter: 'test',
        }),
      )

      expect(params.items).toHaveLength(2)
      expect(params.total).toBe(2)
      expect(params.filter).toBe('test')

      expect(params.items[0].props.name).toBe('Test Name')
      expect(params.items[1].props.name).toBe('TEST VALUE')
    })

    // Test: último page con elementos restantes
    it('should return remaining items on last page', async () => {
      const items = Array(5)
        .fill(null)
        .map((_, index) => new StubEntity({ name: `test${index}`, price: 50 }))
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 3,
        }),
      )

      expect(params.items).toHaveLength(2) // Solo quedan 2 elementos
      expect(params.total).toBe(5)
      expect(params.currentPage).toBe(2)
      expect(params.perPage).toBe(3)
    })

    // Test: rendimiento con gran volumen de datos
    it('should handle large dataset efficiently', async () => {
      const items = Array(1000)
        .fill(null)
        .map(
          (_, index) =>
            new StubEntity({
              name: `item${index.toString().padStart(4, '0')}`,
              price: 50,
            }),
        )
      sut.items = items

      const startTime = Date.now()
      const params = await sut.search(
        new SearchParams({
          page: 10,
          perPage: 50,
          filter: 'item0',
          sort: 'name',
          sortDir: 'asc',
        }),
      )
      const endTime = Date.now()

      expect(params.items).toHaveLength(50)
      expect(params.total).toBe(1000) // Todos los elementos contienen 'item0' en algún lugar
      expect(params.currentPage).toBe(10)
      expect(params.perPage).toBe(50)
      expect(params.sort).toBe('name')
      expect(params.sortDir).toBe('asc')
      expect(params.filter).toBe('item0')

      // Verificar que el rendimiento es aceptable (menos de 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })

    // Test: array vacío
    it('should handle empty items array', async () => {
      sut.items = []

      const params = await sut.search(new SearchParams())

      expect(params.items).toHaveLength(0)
      expect(params.total).toBe(0)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(15)
    })

    // Test: filtro con caracteres especiales
    it('should handle special characters in filter', async () => {
      const items = [
        new StubEntity({ name: 'test@email.com', price: 50 }),
        new StubEntity({ name: 'test#hashtag', price: 50 }),
        new StubEntity({ name: 'test$money', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          filter: '@email',
        }),
      )

      expect(params.items).toHaveLength(1)
      expect(params.total).toBe(1)
      expect(params.items[0].props.name).toBe('test@email.com')
    })

    // Test: ordenamiento con valores iguales
    it('should maintain stable sort with equal values', async () => {
      const items = [
        new StubEntity({ name: 'apple', price: 50 }),
        new StubEntity({ name: 'apple', price: 50 }),
        new StubEntity({ name: 'banana', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          sort: 'name',
          sortDir: 'asc',
        }),
      )

      expect(params.items).toHaveLength(3)
      expect(params.items[0].props.name).toBe('apple')
      expect(params.items[1].props.name).toBe('apple')
      expect(params.items[2].props.name).toBe('banana')
    })

    // Test: filtro con espacios en blanco
    it('should handle whitespace in filter', async () => {
      const items = [
        new StubEntity({ name: 'test name', price: 50 }),
        new StubEntity({ name: 'testname', price: 50 }),
        new StubEntity({ name: 'other', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          filter: 'test name',
        }),
      )

      expect(params.items).toHaveLength(1)
      expect(params.total).toBe(1)
      expect(params.items[0].props.name).toBe('test name')
    })

    // Test: valores extremos de paginación
    it('should handle extreme pagination values', async () => {
      const items = Array(5)
        .fill(null)
        .map((_, index) => new StubEntity({ name: `test${index}`, price: 50 }))
      sut.items = items

      // perPage muy grande
      const params1 = await sut.search(
        new SearchParams({
          perPage: 1000,
        }),
      )
      expect(params1.items).toHaveLength(5)
      expect(params1.total).toBe(5)

      // page muy grande
      const params2 = await sut.search(
        new SearchParams({
          page: 999,
          perPage: 2,
        }),
      )
      expect(params2.items).toHaveLength(0)
      expect(params2.total).toBe(5)
    })

    // Test: combinación de todos los parámetros con valores edge
    it('should handle all parameters with edge values', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
      ]
      sut.items = items

      const params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 1,
          filter: 'a',
          sort: 'name',
          sortDir: 'desc',
        }),
      )

      expect(params.items).toHaveLength(1)
      expect(params.total).toBe(1)
      expect(params.currentPage).toBe(1)
      expect(params.perPage).toBe(1)
      expect(params.sort).toBe('name')
      expect(params.sortDir).toBe('desc')
      expect(params.filter).toBe('a')
      expect(params.items[0].props.name).toBe('a')
    })
  })
})
