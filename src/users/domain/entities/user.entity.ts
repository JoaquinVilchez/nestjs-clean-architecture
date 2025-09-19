import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

/**
 * Propiedades que definen la estructura de un usuario en el dominio
 * Representa los datos básicos que debe contener una entidad Usuario
 */
export type UserProps = {
  name: string // Nombre del usuario (requerido)
  email: string // Email del usuario (requerido)
  password: string // Contraseña del usuario (requerido)
  createdAt?: Date // Fecha de creación (opcional, se genera automáticamente)
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
  /**
   * Constructor de la entidad User
   *
   * Pasos que ejecuta:
   * 1. Valida los datos usando el validador del dominio
   * 2. Llama al constructor de la clase padre (Entity)
   * 3. Asigna fecha de creación si no se proporciona
   */
  constructor(
    public readonly props: UserProps, // Props inmutables (solo lectura)
    id?: string, // ID opcional (se genera automáticamente si no se proporciona)
  ) {
    // 1. Validar los datos antes de crear la entidad
    UserEntity.validate(props)

    // 2. Llamar al constructor de la clase padre (Entity)
    super(props, id)

    // 3. Asignar fecha de creación si no se proporciona
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  /**
   * Método para actualizar el nombre del usuario
   *
   * Pasos que ejecuta:
   * 1. Valida los nuevos datos (incluyendo el nuevo nombre)
   * 2. Actualiza el nombre usando el setter privado
   */
  update(value: string): void {
    // 1. Validar los datos actualizados antes de cambiar
    UserEntity.validate({ ...this.props, name: value })

    // 2. Actualizar el nombre usando el setter privado
    this.name = value
  }

  /**
   * Método para actualizar la contraseña del usuario
   *
   * Pasos que ejecuta:
   * 1. Valida los nuevos datos (incluyendo la nueva contraseña)
   * 2. Actualiza la contraseña usando el setter privado
   */
  updatePassword(value: string): void {
    // 1. Validar los datos actualizados antes de cambiar
    UserEntity.validate({ ...this.props, password: value })

    // 2. Actualizar la contraseña usando el setter privado
    this.password = value
  }

  /**
   * Getter público para acceder al nombre del usuario
   * Retorna el valor de la propiedad name desde props
   */
  get name() {
    return this.props.name
  }

  /**
   * Setter privado para actualizar el nombre del usuario
   * Solo se puede usar desde dentro de la clase (métodos update)
   */
  private set name(value: string) {
    this.props.name = value
  }

  /**
   * Getter público para acceder al email del usuario
   * Retorna el valor de la propiedad email desde props
   */
  get email() {
    return this.props.email
  }

  /**
   * Getter público para acceder a la contraseña del usuario
   * Retorna el valor de la propiedad password desde props
   */
  get password() {
    return this.props.password
  }

  /**
   * Setter privado para actualizar la contraseña del usuario
   * Solo se puede usar desde dentro de la clase (métodos updatePassword)
   */
  private set password(value: string) {
    this.props.password = value
  }

  /**
   * Getter público para acceder a la fecha de creación
   * Retorna el valor de la propiedad createdAt desde props
   */
  get createdAt() {
    return this.props.createdAt
  }

  /**
   * Método estático para validar los datos de un usuario
   *
   * Pasos que ejecuta:
   * 1. Crea un validador usando la factory
   * 2. Ejecuta la validación de los datos
   * 3. Lanza excepción si hay errores de validación
   */
  static validate(props: UserProps) {
    // 1. Crear un validador usando la factory del dominio
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)

    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
