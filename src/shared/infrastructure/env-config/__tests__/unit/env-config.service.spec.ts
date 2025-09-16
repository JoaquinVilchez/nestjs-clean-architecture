import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

/**
 * Tests unitarios para EnvConfigService
 *
 * Estos tests verifican que el servicio de configuración:
 * - Se pueda instanciar correctamente
 * - Funcione con la inyección de dependencias
 * - Proporcione los métodos esperados
 */
describe('EnvConfigService unit test', () => {
  let sut: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Solo importamos el módulo, no agregamos el servicio en providers
      // porque EnvConfigModule.forRoot() ya lo incluye
      imports: [EnvConfigModule.forRoot()],
    }).compile()

    // Obtenemos la instancia del servicio desde el módulo compilado
    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return the variable port', () => {
    expect(sut.getAppPort()).toBe(3000)
  })

  it('should return the variable nodeEnv', () => {
    expect(sut.getNodeEnv()).toBe('test')
  })
})
