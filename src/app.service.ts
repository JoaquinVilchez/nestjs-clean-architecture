/**
 * ARCHIVO: app.service.ts
 * UBICACIÓN: /src/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El servicio AppService está en la raíz de src porque es el servicio
 * principal de la aplicación NestJS. Al estar en la raíz, proporciona funcionalidades
 * básicas de nivel principal de la aplicación y puede ser inyectado en controladores
 * y otros servicios que lo necesiten.
 *
 * FUNCIONALIDAD: Define el servicio principal de la aplicación que contiene la lógica
 * de negocio básica. Este servicio proporciona funcionalidades simples y reutilizables
 * que pueden ser utilizadas por controladores y otros servicios de la aplicación.
 *
 * BENEFICIO: Proporciona una abstracción clara para la lógica de negocio principal de
 * la aplicación. Al ser inyectable, facilita el testing y mantiene la separación de
 * responsabilidades entre controladores y lógica de negocio.
 */

import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
