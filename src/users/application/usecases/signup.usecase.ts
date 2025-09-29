/**
 * ARCHIVO: signup.usecase.ts
 * UBICACIÓN: /users/application/usecases/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El caso de uso SignupUseCase está en /users/application porque representa
 * la lógica de aplicación específica para el registro de usuarios. Al estar en /application,
 * orquesta la interacción entre la capa de dominio y la infraestructura, siguiendo Clean Architecture.
 * Los casos de uso encapsulan las operaciones de negocio específicas de la aplicación.
 *
 * FUNCIONALIDAD: Define el caso de uso para el registro de usuarios en la capa de aplicación.
 * Este caso de uso encapsula la lógica de negocio para registrar un nuevo usuario, incluyendo
 * validaciones, creación de entidades y coordinación con repositorios.
 *
 * BENEFICIO: Proporciona una abstracción clara de la operación de registro de usuarios que es
 * independiente de frameworks externos y detalles de infraestructura. Esto garantiza que
 * la lógica de negocio se mantenga consistente y sea fácil de testear y mantener.
 */

import { UserRepository } from '@/users/domain/respositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'

export type SignupUseCaseInput = {
  name: string
  email: string
  password: string
}

export type SignupUseCaseOutput = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(input: SignupUseCaseInput): Promise<SignupUseCaseOutput> {
    const { name, email, password } = input
    if (!email || !name || !password) {
      throw new BadRequestError('Input data not provided')
    }
    await this.userRepository.emailExists(email)
    const user = new UserEntity({ name, email, password })
    await this.userRepository.insert(user)
    return user.toJSON()
  }
}
