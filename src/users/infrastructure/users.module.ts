/**
 * ARCHIVO: users.module.ts
 * UBICACIÓN: /users/infrastructure/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El módulo está en /users/infrastructure porque es la configuración
 * específica del módulo de usuarios en NestJS. Los módulos de NestJS pertenecen a la
 * capa de infraestructura ya que manejan la configuración del framework y la organización
 * de dependencias específicas del módulo de usuarios.
 *
 * FUNCIONALIDAD: Módulo de usuarios para NestJS que configura y organiza todas las
 * dependencias relacionadas con el módulo de usuarios. Registra el controlador y el
 * servicio, y define las dependencias que necesitan para funcionar correctamente.
 *
 * BENEFICIO: Organiza las dependencias del módulo, facilita la inyección de dependencias
 * y permite la modularización de la aplicación de manera clara y mantenible.
 */

import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  // TODO: Agregar más providers cuando se implementen:
  // - UserRepository (para persistencia)
  // - CreateUserUseCase (caso de uso de creación)
  // - UpdateUserUseCase (caso de uso de actualización)
  // - DeleteUserUseCase (caso de uso de eliminación)
  // - GetUserUseCase (caso de uso de consulta)
}
