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

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  // Método de búsqueda que recibe input genérico y devuelve output genérico
  search(input: SearchInput): Promise<SearchOutput>
}
