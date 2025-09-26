/**
 * ARCHIVO: env-config.service.spec.ts
 * UBICACIÓN: /shared/infrastructure/env-config/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests del servicio de configuración están en /shared/infrastructure
 * porque prueban la funcionalidad específica del servicio de configuración compartido.
 * Al estar en /shared, estos tests validan la funcionalidad común de configuración
 * que usan TODOS los módulos de la aplicación.
 *
 * FUNCIONALIDAD: Tests unitarios para EnvConfigService que verifican el comportamiento
 * correcto de la lectura de variables de entorno y la configuración del servicio.
 *
 * BENEFICIO: Garantiza que las variables de entorno se lean correctamente y estén
 * disponibles en la aplicación, proporcionando confianza en la configuración compartida.
 */

import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

describe('EnvConfigService unit test', () => {
  let sut: EnvConfigService

  // Configuración del módulo de testing de NestJS antes de cada test
  beforeEach(async () => {
    // Crear un módulo de testing importando el módulo de configuración completo
    const module: TestingModule = await Test.createTestingModule({
      // Importamos el módulo completo porque EnvConfigModule.forRoot() incluye el servicio y su configuración
      imports: [EnvConfigModule.forRoot()],
    }).compile()

    // Obtener la instancia del servicio desde el módulo compilado
    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  // Prueba que el servicio se instancie correctamente
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  // Prueba que el método getAppPort() retorne el puerto correcto
  it('should return the variable port', () => {
    expect(sut.getAppPort()).toBe(3000)
  })

  // Prueba que el método getNodeEnv() retorne el entorno correcto
  it('should return the variable nodeEnv', () => {
    expect(sut.getNodeEnv()).toBe('test')
  })
})
