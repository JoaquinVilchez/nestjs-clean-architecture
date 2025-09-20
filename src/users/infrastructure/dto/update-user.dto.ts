/**
 * ARCHIVO: update-user.dto.ts
 *
 * FUNCIONALIDAD: DTO para actualizar un usuario existente que extiende CreateUserDto
 * pero hace todos los campos opcionales, permitiendo actualizaciones parciales.
 *
 * BENEFICIO: Permite actualizaciones parciales manteniendo las mismas validaciones
 * que CreateUserDto, pero sin requerir todos los campos para la actualización.
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // PartialType hace que todos los campos de CreateUserDto sean opcionales
}
