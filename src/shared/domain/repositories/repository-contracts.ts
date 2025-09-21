/**
 * ARCHIVO: repository-contracts.ts
 * UBICACIÓN: /shared/domain/repositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El contrato de repositorio está en /shared/domain porque define
 * la interfaz que deben implementar TODOS los repositorios del dominio en cualquier
 * módulo. Al estar en /shared, evita duplicar esta interfaz en cada módulo y garantiza
 * consistencia en el patrón de repositorio en toda la aplicación.
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
