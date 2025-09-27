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
  let module: TestingModule

  // Configuración del módulo de testing de NestJS antes de cada test
  beforeEach(async () => {
    // Crear un módulo de testing importando el módulo de configuración completo
    module = await Test.createTestingModule({
      // Importamos el módulo completo porque EnvConfigModule.forRoot() incluye el servicio y su configuración
      imports: [EnvConfigModule.forRoot()],
    }).compile()

    // Obtener la instancia del servicio desde el módulo compilado
    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  afterEach(async () => {
    // Limpiar el módulo después de cada test
    await module.close()
  })

  describe('Service Initialization', () => {
    it('should be defined', () => {
      expect(sut).toBeDefined()
    })

    it('should be an instance of EnvConfigService', () => {
      expect(sut).toBeInstanceOf(EnvConfigService)
    })

    it('should have all required methods', () => {
      expect(typeof sut.getAppPort).toBe('function')
      expect(typeof sut.getNodeEnv).toBe('function')
    })
  })

  describe('getAppPort method', () => {
    it('should return the variable port', () => {
      expect(sut.getAppPort()).toBe(3000)
    })

    it('should return a number', () => {
      const port = sut.getAppPort()
      expect(typeof port).toBe('number')
      expect(Number.isInteger(port)).toBeTruthy()
    })

    it('should return consistent port value', () => {
      const port1 = sut.getAppPort()
      const port2 = sut.getAppPort()
      expect(port1).toBe(port2)
    })

    it('should return a valid port number', () => {
      const port = sut.getAppPort()
      expect(port).toBeGreaterThan(0)
      expect(port).toBeLessThanOrEqual(65535)
    })
  })

  describe('getNodeEnv method', () => {
    it('should return the variable nodeEnv', () => {
      expect(sut.getNodeEnv()).toBe('test')
    })

    it('should return a string', () => {
      const nodeEnv = sut.getNodeEnv()
      expect(typeof nodeEnv).toBe('string')
    })

    it('should return consistent nodeEnv value', () => {
      const nodeEnv1 = sut.getNodeEnv()
      const nodeEnv2 = sut.getNodeEnv()
      expect(nodeEnv1).toBe(nodeEnv2)
    })

    it('should return a valid environment value', () => {
      const nodeEnv = sut.getNodeEnv()
      const validEnvs = ['development', 'production', 'test', 'staging']
      expect(validEnvs).toContain(nodeEnv)
    })
  })

  describe('Service Stability', () => {
    it('should handle multiple calls consistently', () => {
      const ports = []
      const nodeEnvs = []

      // Realizar múltiples llamadas
      for (let i = 0; i < 10; i++) {
        ports.push(sut.getAppPort())
        nodeEnvs.push(sut.getNodeEnv())
      }

      // Verificar que todas las respuestas sean consistentes
      ports.forEach(port => {
        expect(port).toBe(3000)
      })

      nodeEnvs.forEach(nodeEnv => {
        expect(nodeEnv).toBe('test')
      })
    })

    it('should not throw errors on repeated calls', () => {
      expect(() => {
        for (let i = 0; i < 100; i++) {
          sut.getAppPort()
          sut.getNodeEnv()
        }
      }).not.toThrow()
    })
  })

  describe('Module Integration', () => {
    it('should be properly registered in the module', () => {
      const serviceFromModule = module.get<EnvConfigService>(EnvConfigService)
      expect(serviceFromModule).toBe(sut)
    })

    it('should be a singleton instance', () => {
      const service1 = module.get<EnvConfigService>(EnvConfigService)
      const service2 = module.get<EnvConfigService>(EnvConfigService)
      expect(service1).toBe(service2)
    })
  })

  describe('Error Handling', () => {
    it('should handle service access gracefully', () => {
      expect(() => {
        const service = module.get<EnvConfigService>(EnvConfigService)
        service.getAppPort()
        service.getNodeEnv()
      }).not.toThrow()
    })

    it('should maintain state consistency', () => {
      // Verificar que el servicio mantenga su estado
      const initialPort = sut.getAppPort()
      const initialNodeEnv = sut.getNodeEnv()

      // Realizar algunas operaciones
      sut.getAppPort()
      sut.getNodeEnv()

      // Verificar que el estado no haya cambiado
      expect(sut.getAppPort()).toBe(initialPort)
      expect(sut.getNodeEnv()).toBe(initialNodeEnv)
    })
  })
})
