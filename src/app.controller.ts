/**
 * ARCHIVO: app.controller.ts
 * UBICACIÓN: /src/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El controlador AppController está en la raíz de src porque es el
 * controlador principal de la aplicación NestJS. Al estar en la raíz, maneja las rutas
 * de nivel principal de la aplicación y actúa como punto de entrada para peticiones HTTP.
 * Sigue Clean Architecture delegando la lógica de negocio a servicios.
 *
 * FUNCIONALIDAD: Define el controlador principal de la aplicación que maneja las rutas
 * HTTP de nivel raíz. Este controlador actúa como punto de entrada para las peticiones
 * principales de la aplicación y delega la lógica de negocio a los servicios correspondientes.
 *
 * BENEFICIO: Proporciona una interfaz HTTP clara y desacoplada para la aplicación principal.
 * Al delegar la lógica de negocio a servicios, mantiene la separación de responsabilidades
 * y facilita el testing y mantenimiento del código.
 */

import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
