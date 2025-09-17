import { Entity } from '@/shared/domain/entities/entity'

/**
 * Propiedades que definen la estructura de un usuario en el dominio
 * Representa los datos básicos que debe contener una entidad Usuario
 */
export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
}

/**
 * Entidad de Usuario en el dominio (Clean Architecture)
 *
 * Esta entidad representa un usuario en la capa de dominio y contiene:
 * - La lógica de negocio relacionada con usuarios
 * - Las reglas de validación y comportamiento del dominio
 * - Los datos inmutables del usuario (props readonly)
 *
 * En Clean Architecture, las entidades del dominio son independientes
 * de frameworks, bases de datos y tecnologías externas.
 *
 * Uso típico:
 * - Validar reglas de negocio
 * - Aplicar lógica del dominio
 * - Mantener la integridad de los datos del usuario
 * - Ser utilizada por casos de uso en la capa de aplicación
 */
export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    super(props, id)
    // Si no se proporciona fecha de creación, se asigna la fecha actual
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  update(value: string): void {
    this.name = value
  }

  updatePassword(value: string): void {
    this.password = value
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
}
