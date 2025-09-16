/**
 * Interfaz que define el contrato para el servicio de configuración
 *
 * Esta interfaz implementa el patrón de inversión de dependencias (DIP):
 * - Define QUÉ debe hacer el servicio, no CÓMO lo hace
 * - Permite cambiar la implementación sin afectar el código que la usa
 * - Facilita el testing al poder crear implementaciones mock
 * - Sigue el principio de segregación de interfaces (ISP)
 *
 * ¿Por qué usar interfaces?
 * - Abstracción: El código cliente no depende de la implementación concreta
 * - Testing: Puedes crear mocks que implementen esta interfaz
 * - Flexibilidad: Puedes cambiar la implementación sin romper el código
 * - Documentación: Sirve como documentación de la API del servicio
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
