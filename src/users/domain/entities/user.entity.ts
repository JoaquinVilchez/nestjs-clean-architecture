/**
 * ARCHIVO: user.entity.ts
 *
 * FUNCIONALIDAD: Define la entidad de Usuario en la capa de dominio siguiendo Clean Architecture.
 * Esta entidad encapsula toda la lógica de negocio relacionada con usuarios, incluyendo
 * validaciones, reglas de dominio y comportamiento específico del usuario.
 *
 * BENEFICIO: Proporciona una representación inmutable y validada de un usuario que es
 * independiente de frameworks externos, bases de datos o tecnologías específicas.
 * Esto garantiza que las reglas de negocio se mantengan consistentes sin importar
 * cómo se persistan o presenten los datos del usuario.
 */

import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    // Valida los datos antes de crear la entidad
    UserEntity.validate(props)

    super(props, id)

    // Asigna fecha de creación si no se proporciona
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  get name() {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  // Método estático para validar los datos de un usuario
  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)

    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  // Método para actualizar el nombre del usuario
  update(value: string): void {
    // Valida los datos actualizados antes de cambiar
    UserEntity.validate({ ...this.props, name: value })

    this.name = value
  }

  // Método para actualizar la contraseña del usuario
  updatePassword(value: string): void {
    // Valida los datos actualizados antes de cambiar
    UserEntity.validate({ ...this.props, password: value })

    this.password = value
  }
}
