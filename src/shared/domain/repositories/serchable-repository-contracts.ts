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

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage: number
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps) {
    this._page = props.page ?? 1
    this._perPage = props.perPage ?? 15
    this._sort = props.sort ?? null
    this._sortDir = props.sortDir ?? null
    this._filter = props.filter ?? null
  }

  private set page(value: number) {
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

  private set perPage(value: number) {
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

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sort(): string | null {
    return this._sort
  }

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

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get filter(): string | null {
    return this._filter
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  // Método de búsqueda que recibe input genérico y devuelve output genérico
  search(input: SearchInput): Promise<SearchOutput>
}
