import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '../entities/validators/class-validator-fields'

/**
 * Clase que define las reglas de validación para un usuario
 *
 * Esta clase utiliza decoradores de class-validator para definir:
 * - Qué validaciones aplicar a cada campo
 * - Los mensajes de error específicos
 * - Las reglas de negocio del dominio
 *
 * Beneficio: Centraliza todas las reglas de validación en un solo lugar
 * y las hace reutilizables en toda la aplicación
 */
export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt: Date

  /**
   * Constructor que asigna los datos a las propiedades de la clase
   *
   * Pasos que ejecuta:
   * 1. Recibe los datos del usuario (UserProps)
   * 2. Asigna cada propiedad usando Object.assign
   * 3. Los decoradores de validación se aplican automáticamente
   */
  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt })
  }
}

/**
 * Validador específico para usuarios
 *
 * Esta clase extiende ClassValidatorFields y se encarga de:
 * - Aplicar las reglas de validación definidas en UserRules
 * - Proporcionar una interfaz consistente para validar usuarios
 * - Manejar errores de validación de manera centralizada
 *
 * Beneficio: Encapsula la lógica de validación y la hace fácil de usar
 */
export class UserValidator extends ClassValidatorFields<UserRules> {
  /**
   * Método para validar los datos de un usuario
   *
   * Pasos que ejecuta:
   * 1. Crea una instancia de UserRules con los datos
   * 2. Llama al método validate de la clase padre
   * 3. Retorna true si es válido, false si hay errores
   *
   * @param data - Datos del usuario a validar
   * @returns true si es válido, false si hay errores
   */
  validate(data: UserProps): boolean {
    // 1. Crear instancia de UserRules con los datos (o objeto vacío si data es null/undefined)
    // 2. Llamar al método validate de la clase padre (ClassValidatorFields)
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

/**
 * Factory para crear instancias de UserValidator
 *
 * Esta clase implementa el patrón Factory y se encarga de:
 * - Crear instancias de UserValidator de manera consistente
 * - Centralizar la creación del validador
 * - Facilitar el testing y la inyección de dependencias
 *
 * Beneficio: Proporciona una forma estándar de crear validadores
 * y facilita el mantenimiento del código
 */
export class UserValidatorFactory {
  /**
   * Método estático para crear una nueva instancia de UserValidator
   *
   * Pasos que ejecuta:
   * 1. Crea una nueva instancia de UserValidator
   * 2. Retorna la instancia lista para usar
   *
   * @returns Nueva instancia de UserValidator
   */
  static create(): UserValidator {
    return new UserValidator()
  }
}
