/**
 * ARCHIVO: repository-contracts.ts
 *
 * FUNCIONALIDAD: Define el contrato base para repositorios en Clean Architecture.
 * Esta interfaz genérica especifica las operaciones CRUD estándar que debe implementar
 * cualquier repositorio de entidades del dominio.
 *
 * BENEFICIO: Proporciona una abstracción consistente para la persistencia de datos,
 * permite intercambiar implementaciones (base de datos, memoria, etc.) sin afectar
 * la lógica de negocio y facilita el testing con mocks.
 */

import { Entity } from '../entities/entity'

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>
  findById(id: string): Promise<E>
  findAll(): Promise<E[]>
  update(entity: E): Promise<void>
  delete(id: string): Promise<void>
}
