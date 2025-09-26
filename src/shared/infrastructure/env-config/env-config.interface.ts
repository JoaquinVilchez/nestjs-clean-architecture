/**
 * ARCHIVO: env-config.interface.ts
 * UBICACIÓN: /shared/infrastructure/env-config/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La interfaz de configuración está en /shared/infrastructure porque
 * define el contrato para funcionalidad de infraestructura compartida que puede ser
 * utilizada por CUALQUIER módulo de la aplicación. Al estar en /shared, evita duplicar
 * esta interfaz en cada módulo y garantiza consistencia en el acceso a configuración.
 *
 * FUNCIONALIDAD: Interfaz que define el contrato para el servicio de configuración,
 * implementando el patrón de inversión de dependencias (DIP) y proporcionando una
 * abstracción clara para el acceso a variables de entorno.
 *
 * BENEFICIO: Proporciona abstracción sobre la implementación concreta, facilita el
 * testing con mocks, permite cambiar implementaciones sin romper el código y sirve
 * como documentación de la API del servicio de configuración.
 */
export interface EnvConfig {
  /**
   * Obtiene el puerto de la aplicación
   *
   * @returns number - Puerto donde la aplicación escuchará las conexiones
   */
  getAppPort(): number

  /**
   * Obtiene el entorno actual de la aplicación
   *
   * @returns string - Entorno actual (development, production, test, etc.)
   */
  getNodeEnv(): string
}
