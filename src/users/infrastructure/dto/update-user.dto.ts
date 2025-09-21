/**
 * ARCHIVO: update-user.dto.ts
 * UBICACIÓN: /users/infrastructure/dto/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El DTO está en /users/infrastructure porque es específico del módulo
 * de usuarios y pertenece a la capa de infraestructura. Los DTOs de actualización manejan
 * la entrada de datos para operaciones de modificación en la interfaz externa del módulo.
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
