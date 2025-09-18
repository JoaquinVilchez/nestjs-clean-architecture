import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

// Test unitario de UsersService: verifica que el servicio se instancie correctamente
// Beneficio: garantiza que la configuración de NestJS esté bien y el servicio sea funcional
describe('UsersService', () => {
  let service: UsersService

  // Antes de cada test, configuramos el módulo de testing de NestJS
  beforeEach(async () => {
    // 1. Crear un módulo de testing solo con el servicio
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService], // Registrar el servicio a testear
    }).compile() // Compilar el módulo para crear las instancias

    // 2. Obtener la instancia del servicio desde el módulo compilado
    service = module.get<UsersService>(UsersService)
  })

  // Test básico: verifica que el servicio se haya creado correctamente
  it('should be defined', () => {
    // Verificar que el servicio esté definido (no sea undefined)
    expect(service).toBeDefined()
  })
})
