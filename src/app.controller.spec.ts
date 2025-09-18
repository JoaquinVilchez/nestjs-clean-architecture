import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// Test unitario de AppController: verifica que el controlador principal de la aplicación funcione correctamente
// Beneficio: garantiza que la aplicación básica de NestJS esté configurada correctamente y responda
describe('AppController', () => {
  let appController: AppController

  // Antes de cada test, configuramos el módulo de testing de NestJS
  beforeEach(async () => {
    // 1. Crear un módulo de testing con el controlador principal y su servicio
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Registrar el controlador principal
      providers: [AppService], // Registrar el servicio que necesita el controlador
    }).compile() // Compilar el módulo para crear las instancias

    // 2. Obtener la instancia del controlador desde el módulo compilado
    appController = app.get<AppController>(AppController)
  })

  // Grupo de tests para el endpoint raíz
  describe('root', () => {
    // Test: Verifica que el endpoint raíz retorne el mensaje esperado
    it('should return "Hello World!"', () => {
      // 1. Llamar al método getHello() del controlador
      // 2. Verificar que retorne exactamente "Hello World!"
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
