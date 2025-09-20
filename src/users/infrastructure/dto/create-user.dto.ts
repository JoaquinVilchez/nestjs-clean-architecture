/**
 * ARCHIVO: create-user.dto.ts
 *
 * FUNCIONALIDAD: DTO para crear un nuevo usuario que define la estructura de datos
 * requerida en la capa de infraestructura. Se utiliza para validar los datos de entrada
 * antes de procesarlos en el controlador.
 *
 * BENEFICIO: Centraliza la validación de datos de entrada y proporciona tipado fuerte
 * para TypeScript, mejorando la seguridad y mantenibilidad del código.
 */

import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateUserDto {
  @MaxLength(255, {
    message: 'name must be shorter than or equal to 255 characters',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string

  @MaxLength(255, {
    message: 'email must be shorter than or equal to 255 characters',
  })
  @IsEmail({}, { message: 'email must be an email' })
  @IsString({ message: 'email must be a string' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string

  @MaxLength(100, {
    message: 'password must be shorter than or equal to 100 characters',
  })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password should not be empty' })
  password: string
}
