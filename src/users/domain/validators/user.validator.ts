/**
 * ARCHIVO: user.validator.ts
 * UBICACIÓN: /users/domain/validators/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El validador está en /users/domain porque contiene las reglas de
 * validación específicas del módulo de usuarios. Al estar en /domain, es independiente
 * de frameworks externos y contiene la lógica de validación pura del dominio de usuarios.
 * Extiende la funcionalidad compartida de /shared pero con reglas específicas de usuarios.
 *
 * FUNCIONALIDAD: Define las reglas de validación para usuarios utilizando decoradores
 * de class-validator. Incluye UserRules para las reglas, UserValidator para la lógica
 * de validación y UserValidatorFactory para crear instancias.
 *
 * BENEFICIO: Centraliza todas las reglas de validación del dominio de usuarios en un
 * solo lugar, las hace reutilizables y proporciona una interfaz consistente para validar.
 */

import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields'

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

  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    // Maneja casos donde data puede ser null/undefined
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
