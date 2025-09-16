// Importaciones necesarias para crear un servicio inyectable
import { Injectable } from '@nestjs/common'
import { EnvConfig } from './env-config.interface'
import { ConfigService } from '@nestjs/config'

/**
 * Servicio de configuración personalizado que implementa la interfaz EnvConfig
 *
 * Este servicio actúa como una capa de abstracción sobre ConfigService de NestJS:
 * - Proporciona métodos específicos para obtener configuraciones de la aplicación
 * - Implementa el patrón de inyección de dependencias
 * - Centraliza la lógica de configuración en un solo lugar
 * - Facilita el testing al poder mockear fácilmente
 */
@Injectable()
export class EnvConfigService implements EnvConfig {
  /**
   * Constructor que recibe ConfigService por inyección de dependencias
   *
   * @param configService - Servicio de configuración de NestJS que lee las variables de entorno
   *
   * ¿Por qué inyección de dependencias?
   * - Facilita el testing (puedes inyectar un mock)
   * - Desacopla el código (no depende directamente de la implementación)
   * - Sigue el principio de inversión de dependencias
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Obtiene el puerto de la aplicación desde las variables de entorno
   *
   * @returns number - Puerto de la aplicación
   *
   * Ejemplo de uso en .env:
   * PORT=3000
   */
  getAppPort(): number {
    // ConfigService.get() obtiene una variable de entorno
    // Number() convierte el string a número
    return Number(this.configService.get<number>('PORT'))
  }

  /**
   * Obtiene el entorno actual de la aplicación
   *
   * @returns string - Entorno actual (development, production, test, etc.)
   *
   * Ejemplo de uso en .env:
   * NODE_ENV=production
   *
   * Si no está definido, devuelve 'development' por defecto
   */
  getNodeEnv(): string {
    // El operador ?? (nullish coalescing) devuelve 'development' si NODE_ENV es null o undefined
    return this.configService.get<string>('NODE_ENV') ?? 'development'
  }
}
