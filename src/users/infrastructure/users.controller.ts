/**
 * ARCHIVO: users.controller.ts
 * UBICACIÓN: /users/infrastructure/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El controlador está en /users/infrastructure porque es la capa
 * que maneja la interfaz externa (HTTP/REST) del módulo de usuarios. En Clean Architecture,
 * los controladores pertenecen a la capa de infraestructura ya que manejan detalles
 * de implementación específicos del framework (NestJS) y la comunicación externa.
 *
 * FUNCIONALIDAD: Controlador REST para el módulo de usuarios que maneja todas las
 * peticiones HTTP relacionadas con usuarios. Define los endpoints REST estándar (CRUD)
 * y delega la lógica de negocio al servicio correspondiente.
 *
 * BENEFICIO: Proporciona una API REST consistente y separa las preocupaciones de HTTP
 * de la lógica de negocio, facilitando el testing y mantenimiento del código.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Convierte el ID de string a number para el servicio
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Convierte el ID de string a number para el servicio
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Convierte el ID de string a number para el servicio
    return this.usersService.remove(+id)
  }
}
