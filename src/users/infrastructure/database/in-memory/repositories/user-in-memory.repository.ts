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
import { InMemorySerchableRepository } from '@/shared/domain/repositories/in-memory-serchable.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/respositories/user.repository'

export class InMemoryUserRepository
  extends InMemorySerchableRepository<UserEntity>
  implements UserRepository
{
  // Busca un usuario por email en la colección en memoria
  findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`User not found with email ${email}`)
    }
    return Promise.resolve(entity)
  }

  // Verifica si existe un usuario con el email especificado
  emailExists(email: string): Promise<boolean> {
    const entity = this.items.find(item => item.email === email)
    return Promise.resolve(!!entity)
  }
}
