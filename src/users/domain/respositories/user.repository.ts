/**
 * ARCHIVO: user.repository.ts
 * UBICACIÓN: /users/domain/respositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La interfaz del repositorio está en /users/domain porque define
 * el contrato específico para la persistencia de usuarios. Al estar en /domain, es
 * independiente de la implementación técnica y contiene las reglas de negocio
 * específicas del módulo de usuarios para el acceso a datos.
 *
 * FUNCIONALIDAD: Define la interfaz del repositorio de usuarios que extiende
 * SearchableRepositoryInterface y añade métodos específicos para usuarios como
 * findByEmail y emailExists.
 *
 * BENEFICIO: Proporciona una abstracción clara para el acceso a datos de usuarios,
 * permite intercambiar implementaciones sin afectar la lógica de negocio y
 * facilita el testing con mocks.
 */

import { UserEntity } from '../entities/user.entity'
import { SearchableRepositoryInterface } from '@/shared/domain/repositories/serchable-repository-contracts'

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  // Busca un usuario por su email
  findByEmail(email: string): Promise<UserEntity>
  // Verifica si existe un usuario con el email especificado
  emailExists(email: string): Promise<boolean>
}
