/**
 * ARCHIVO: env-config.module.ts
 * UBICACIÓN: /shared/infrastructure/env-config/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El módulo de configuración está en /shared/infrastructure porque es
 * funcionalidad de infraestructura compartida que puede ser utilizada por CUALQUIER módulo
 * de la aplicación. Al estar en /shared, evita duplicar la configuración de variables
 * de entorno en cada módulo y proporciona una configuración centralizada para toda la app.
 *
 * FUNCIONALIDAD: Módulo de configuración personalizado que extiende la funcionalidad de
 * @nestjs/config e implementa el patrón de módulo dinámico para configurar variables
 * de entorno de manera flexible y centralizada.
 *
 * BENEFICIO: Centraliza la configuración de variables de entorno, permite configuración
 * dinámica en tiempo de ejecución y facilita el manejo de diferentes entornos (dev, prod, test).
 */

// Importaciones necesarias para crear un módulo dinámico de configuración
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { EnvConfigService } from './env-config.service'
import { join } from 'node:path'
@Module({
  // Proveedores que estarán disponibles en este módulo
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {
  /**
   * Método estático que crea un módulo dinámico
   *
   * @param options - Opciones de configuración que se pueden personalizar
   * @returns DynamicModule - Un módulo configurado dinámicamente
   *
   * ¿Por qué es dinámico?
   * - Permite configurar el módulo en tiempo de ejecución
   * - Se puede llamar desde AppModule con diferentes configuraciones
   * - Es más flexible que un módulo estático
   */
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      // El módulo que se está configurando
      module: EnvConfigModule,

      // Módulos que este módulo necesita importar
      imports: [
        // Configuramos el ConfigModule de NestJS con nuestras opciones personalizadas
        ConfigModule.forRoot({
          // Spread operator para incluir las opciones pasadas como parámetro
          ...options,

          // Configuración de archivos de variables de entorno
          envFilePath: [
            // 1. Archivo específico del entorno (ej: .env.development, .env.production)
            // process.cwd() obtiene el directorio raíz del proyecto
            // NODE_ENV es la variable que indica el entorno actual
            join(
              process.cwd(),
              `.env.${process.env.NODE_ENV || 'development'}`,
            ),
            // 2. Archivo por defecto (.env) como fallback
            // Si no existe el archivo específico del entorno, usa este
            join(process.cwd(), '.env'),
          ],
        }),
      ],

      // Servicios que este módulo proporciona
      providers: [EnvConfigService],

      // Servicios que otros módulos pueden importar
      exports: [EnvConfigService],
    }
  }
}
