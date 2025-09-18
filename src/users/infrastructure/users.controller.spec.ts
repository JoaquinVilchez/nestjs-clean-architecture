import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

// Test unitario de UsersController: verifica que el controlador se instancie correctamente
// Beneficio: garantiza que la configuración de NestJS esté bien y el controlador sea funcional
describe('UsersController', () => {
  let controller: UsersController

  // Antes de cada test, configuramos el módulo de testing de NestJS
  beforeEach(async () => {
    // 1. Crear un módulo de testing con el controlador y sus dependencias
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController], // Registrar el controlador a testear
      providers: [UsersService], // Registrar el servicio que necesita el controlador
    }).compile() // Compilar el módulo para crear las instancias

    // 2. Obtener la instancia del controlador desde el módulo compilado
    controller = module.get<UsersController>(UsersController)
  })

  // Test básico: verifica que el controlador se haya creado correctamente
  it('should be defined', () => {
    // Verificar que el controlador esté definido (no sea undefined)
    expect(controller).toBeDefined()
  })
})
