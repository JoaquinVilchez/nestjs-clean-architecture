/**
 * ARCHIVO: user-in-memory.repository.ts
 * UBICACIÓN: /users/infrastructure/database/in-memory/repositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Este repositorio está en /users/infrastructure porque es la implementación
 * específica del repositorio de usuarios en memoria. Al estar en /infrastructure, maneja los
 * detalles técnicos de persistencia (en memoria) para el módulo de usuarios, siguiendo Clean Architecture.
 * Implementa la interfaz del dominio pero con detalles específicos de infraestructura.
 *
 * FUNCIONALIDAD: Implementación en memoria del repositorio de usuarios que extiende la funcionalidad
 * base de InMemoryRepository y añade métodos específicos para usuarios como findByEmail y emailExists.
 *
 * BENEFICIO: Proporciona una implementación de repositorio para testing y desarrollo que no requiere
 * base de datos, manteniendo la separación entre la lógica de negocio y los detalles de persistencia.
 */

import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InMemorySerchableRepository } from '@/shared/domain/repositories/in-memory-serchable.repository'
import { SortDirection } from '@/shared/domain/repositories/serchable-repository-contracts'
import { UserEntity } from '@/users/domain/entities/user.entity'
import {
  UserFilter,
  UserRepository,
} from '@/users/domain/respositories/user.repository'

export class UserInMemoryRepository
  extends InMemorySerchableRepository<UserEntity>
  implements UserRepository
{
  // Define los campos ordenables para las búsquedas de usuarios
  sortableFields: string[] = ['name', 'email', 'createdAt']

  // Implementación del filtrado para usuarios (filtra por nombre y email)
  protected async applyFilter(
    items: UserEntity[],
    filter: UserFilter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return Promise.resolve(items)
    }
    const filterLower = filter.toLowerCase()
    return items.filter(item => {
      return (
        item.props.name.toLowerCase().includes(filterLower) ||
        item.props.email.toLowerCase().includes(filterLower)
      )
    })
  }

  // Implementación del ordenamiento para usuarios (por defecto ordena por createdAt desc)
  protected applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): UserEntity[] {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }

  // Busca un usuario por email en la colección en memoria
  async findByEmail(email: string): Promise<UserEntity> {
    // Validación básica de entrada
    if (!email || typeof email !== 'string') {
      throw new NotFoundError('Invalid email provided')
    }

    const entity = this.items.find(item => item.props.email === email)
    if (!entity) {
      throw new NotFoundError(`User not found with email ${email}`)
    }
    return entity
  }

  // Verifica si existe un usuario con el email especificado
  async emailExists(email: string): Promise<void> {
    // Validación básica de entrada
    if (!email || typeof email !== 'string') {
      return
    }

    // Si el email ya existe, lanza error de conflicto
    const exists = this.items.some(item => item.props.email === email)
    if (exists) {
      throw new ConflictError('Email address already used')
    }
  }
}
