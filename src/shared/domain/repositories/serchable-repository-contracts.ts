/**
 * ARCHIVO: serchable-repository-contracts.ts
 * UBICACIÓN: /shared/domain/repositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Esta interfaz está en /shared/domain porque define el contrato
 * para repositorios con funcionalidad de búsqueda que pueden ser utilizados por
 * CUALQUIER módulo del dominio. Al estar en /shared, evita duplicar esta interfaz
 * en cada módulo y garantiza consistencia en el patrón de repositorios con búsqueda.
 *
 * FUNCIONALIDAD: Define la interfaz para repositorios que incluyen funcionalidad
 * de búsqueda avanzada. Extiende RepositoryInterface base y añade el método search
 * con tipos genéricos para input y output de búsqueda.
 *
 * BENEFICIO: Proporciona una abstracción consistente para repositorios con búsqueda,
 * permite implementar diferentes estrategias de búsqueda y facilita el testing
 * con mocks que implementen esta interfaz.
 */

import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

// Tipo para dirección de ordenamiento en búsquedas
export type SortDirection = 'asc' | 'desc'

// Tipo para propiedades de entrada de búsqueda con paginación y filtros
export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

// Tipo para propiedades del resultado de búsqueda con metadatos de paginación
export type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: SortDirection | null
  filter: Filter | null
}

// Clase para manejar parámetros de búsqueda con validación y valores por defecto
export class SearchParams {
  protected _page: number
  protected _perPage: number
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    // Inicializar valores por defecto primero
    this._page = 1
    this._perPage = 15
    this._sort = null
    this._sortDir = null
    this._filter = null

    // Luego aplicar los valores del props usando setters con validación
    this.page = props.page ?? 1
    this.perPage = props.perPage ?? 15
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  // Valida y establece el número de página (debe ser entero positivo)
  private set page(value: number) {
    // Si el valor es boolean, tratarlo como inválido
    if (typeof value === 'boolean') {
      return
    }

    let _page = +value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) != _page) {
      _page = 1
    }
    this._page = _page
  }

  get page(): number {
    return this._page
  }

  // Valida y establece el número de elementos por página (debe ser entero positivo)
  private set perPage(value: number) {
    if (typeof value === 'boolean') {
      return
    }

    let _perPage = +value
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      parseInt(_perPage as any) != _perPage
    ) {
      _perPage = this._perPage
    }
    this._perPage = _perPage
  }

  get perPage(): number {
    return this._perPage
  }

  // Establece el campo de ordenamiento (convierte a string o null)
  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sort(): string | null {
    return this._sort
  }

  // Establece la dirección de ordenamiento (asc/desc, por defecto asc)
  private set sortDir(value: string | null) {
    if (!this.sort) {
      this._sortDir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sortDir =
      dir !== 'asc' && dir !== 'desc' ? 'asc' : (dir as SortDirection)
  }

  get sortDir(): SortDirection | null {
    return this._sortDir
  }

  // Establece el filtro de búsqueda (convierte a string o null)
  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get filter(): string | null {
    return this._filter
  }
}

// Clase para representar el resultado de una búsqueda con metadatos de paginación
export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly lastPage: number
  readonly sort: string | null
  readonly sortDir: SortDirection | null
  readonly filter: Filter | null

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    // Calcula la última página basada en el total y elementos por página
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  // Convierte el resultado a JSON, opcionalmente serializando las entidades
  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  // Método de búsqueda que recibe input genérico y devuelve output genérico
  search(input: SearchInput): Promise<SearchOutput>
}
