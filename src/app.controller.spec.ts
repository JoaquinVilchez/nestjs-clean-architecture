import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// Test unitario de AppController: verifica que el controlador principal de la aplicación funcione correctamente
// Beneficio: garantiza que la aplicación básica de NestJS esté configurada correctamente y responda
describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  // Antes de cada test, configuramos el módulo de testing de NestJS
  beforeEach(async () => {
    // 1. Crear un módulo de testing con el controlador principal y su servicio
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Registrar el controlador principal
      providers: [AppService], // Registrar el servicio que necesita el controlador
    }).compile() // Compilar el módulo para crear las instancias

    // 2. Obtener las instancias del controlador y servicio desde el módulo compilado
    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
  })

  // Grupo de tests para el endpoint raíz
  describe('root', () => {
    // Test: Verifica que el controlador se instancie correctamente
    it('should be defined', () => {
      expect(appController).toBeDefined()
    })

    // Test: Verifica que el endpoint raíz retorne el mensaje esperado
    it('should return "Hello World!"', () => {
      // 1. Llamar al método getHello() del controlador
      // 2. Verificar que retorne exactamente "Hello World!"
      expect(appController.getHello()).toBe('Hello World!')
    })

    // Test: Verifica que el controlador use el servicio correctamente
    it('should call service getHello method', () => {
      // Mock del método getHello del servicio
      const spy = jest
        .spyOn(appService, 'getHello')
        .mockReturnValue('Hello World!')

      // Llamar al método del controlador
      const result = appController.getHello()

      // Verificar que se llame al servicio
      expect(spy).toHaveBeenCalledTimes(1)
      expect(result).toBe('Hello World!')

      // Restaurar el mock
      spy.mockRestore()
    })

    // Test: Verifica que el controlador maneje diferentes respuestas del servicio
    it('should return different messages based on service response', () => {
      // Mock del servicio con diferentes respuestas
      const spy = jest.spyOn(appService, 'getHello')

      // Caso 1: Respuesta normal
      spy.mockReturnValue('Hello World!')
      expect(appController.getHello()).toBe('Hello World!')

      // Caso 2: Respuesta personalizada
      spy.mockReturnValue('Hello from NestJS!')
      expect(appController.getHello()).toBe('Hello from NestJS!')

      // Caso 3: Respuesta vacía
      spy.mockReturnValue('')
      expect(appController.getHello()).toBe('')

      // Restaurar el mock
      spy.mockRestore()
    })

    // Test: Verifica que el controlador sea estable con múltiples llamadas
    it('should be stable with multiple calls', () => {
      const results: string[] = []

      // Realizar múltiples llamadas
      for (let i = 0; i < 10; i++) {
        results.push(appController.getHello())
      }

      // Verificar que todas las respuestas sean consistentes
      results.forEach(result => {
        expect(result).toBe('Hello World!')
      })
    })
  })
})
