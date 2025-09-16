// Importaciones necesarias para el módulo principal de la aplicación
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { UsersModule } from './users/infrastructure/users.module'

/**
 * Módulo principal de la aplicación (AppModule)
 *
 * Este es el módulo raíz de la aplicación NestJS que:
 * - Importa todos los módulos necesarios para la aplicación
 * - Define los controladores y servicios principales
 * - Configura la estructura base de la aplicación
 *
 * Arquitectura Clean Architecture:
 * - shared/infrastructure: Contiene la infraestructura compartida
 * - env-config: Módulo de configuración que maneja variables de entorno
 */
@Module({
  // Módulos que esta aplicación necesita importar
  imports: [
    // Importamos nuestro módulo de configuración personalizado
    // .forRoot() inicializa el módulo con la configuración por defecto
    // Esto carga las variables de entorno y hace disponible EnvConfigService
    EnvConfigModule.forRoot(),
    UsersModule,
  ],

  // Controladores que manejan las rutas HTTP
  controllers: [AppController],

  // Servicios que contienen la lógica de negocio
  providers: [AppService],
})
export class AppModule {}
