import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

// Test unitario de EnvConfigService: verifica que el servicio de configuración funcione correctamente
// Beneficio: garantiza que las variables de entorno se lean correctamente y estén disponibles en la aplicación
describe('EnvConfigService unit test', () => {
  let sut: EnvConfigService

  // Antes de cada test, configuramos el módulo de testing de NestJS
  beforeEach(async () => {
    // 1. Crear un módulo de testing importando el módulo de configuración
    const module: TestingModule = await Test.createTestingModule({
      // Importamos el módulo completo en lugar de solo el servicio
      // porque EnvConfigModule.forRoot() ya incluye el servicio y su configuración
      imports: [EnvConfigModule.forRoot()],
    }).compile() // Compilar el módulo para crear las instancias

    // 2. Obtener la instancia del servicio desde el módulo compilado
    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  // Test 1: Verifica que el servicio se haya creado correctamente
  it('should be defined', () => {
    // Verificar que el servicio esté definido (no sea undefined)
    expect(sut).toBeDefined()
  })

  // Test 2: Verifica que el método getAppPort() retorne el puerto correcto
  it('should return the variable port', () => {
    // 1. Llamar al método getAppPort() del servicio
    // 2. Verificar que retorne el puerto esperado (3000 por defecto en testing)
    expect(sut.getAppPort()).toBe(3000)
  })

  // Test 3: Verifica que el método getNodeEnv() retorne el entorno correcto
  it('should return the variable nodeEnv', () => {
    // 1. Llamar al método getNodeEnv() del servicio
    // 2. Verificar que retorne el entorno esperado ('test' en testing)
    expect(sut.getNodeEnv()).toBe('test')
  })
})
