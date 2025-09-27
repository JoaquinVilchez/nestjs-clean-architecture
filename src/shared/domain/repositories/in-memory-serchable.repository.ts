/**
 * ARCHIVO: in-memory-serchable.repository.ts
 * UBICACIÓN: /shared/domain/repositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Esta clase abstracta está en /shared/domain porque proporciona
 * una implementación base en memoria para repositorios con funcionalidad de búsqueda
 * que puede ser utilizada por CUALQUIER módulo del dominio. Al estar en /shared,
 * evita duplicar esta implementación en cada módulo y proporciona una base común
 * para todos los repositorios con búsqueda en memoria de la aplicación.
 *
 * FUNCIONALIDAD: Implementación base abstracta de repositorio en memoria con
 * funcionalidad de búsqueda que incluye filtrado, ordenamiento y paginación.
 * Define métodos abstractos que deben ser implementados por repositorios específicos.
 *
 * BENEFICIO: Permite testing rápido sin base de datos, desarrollo sin dependencias
 * externas y proporciona una implementación de referencia para repositorios con
 * búsqueda reales, manteniendo la separación entre lógica de negocio y persistencia.
 */

import { Entity } from '../entities/entity'
import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from './serchable-repository-contracts'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySerchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  // Lista de campos por los que se puede ordenar (debe ser definida por repositorios específicos)
  sortableFields: string[] = []

  // Implementa la búsqueda aplicando filtro, ordenamiento y paginación en secuencia
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = this.applySort(itemsFiltered, props.sort, props.sortDir)
    const itemsPaginated = this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )
    return new SearchResult({
      items: itemsPaginated,
      total: itemsSorted.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    })
  }

  // Método abstracto que debe ser implementado por repositorios específicos para filtrar
  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  // Método que implementa el ordenamiento de elementos basado en sortableFields
  protected applySort(
    items: E[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): E[] {
    // Si no hay campo de ordenamiento o no está en sortableFields, retorna sin ordenar
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }
    return [...items].sort((a, b) => {
      // Accede a las propiedades de la entidad para comparar
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const aValue = a.props[sort]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const bValue = b.props[sort]

      // Compara valores y aplica dirección de ordenamiento
      if (aValue < bValue) {
        return sortDir === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDir === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  // Método que implementa la paginación de elementos usando slice
  protected applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): E[] {
    const start = (page - 1) * perPage
    const end = start + perPage
    return items.slice(start, end)
  }
}
