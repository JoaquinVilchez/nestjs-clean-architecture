# 🔧 Infrastructure Layer

## ¿Qué va aquí?

Esta carpeta contiene las **implementaciones concretas** de la infraestructura necesaria para el módulo de usuarios. Aquí se manejan las interacciones con tecnologías externas.

## Archivos que deberían estar aquí:

- **Controllers**: Manejan las peticiones HTTP
  - `users.controller.ts` ✅ (ya existe)
  - `users.controller.spec.ts` ✅ (ya existe)

- **Services de Infraestructura**: Implementaciones concretas
  - `users.service.ts` ✅ (ya existe)
  - `users.service.spec.ts` ✅ (ya existe)

- **DTOs de Infraestructura**: Para validación de entrada/salida
  - `create-user.dto.ts` ✅ (ya existe)
  - `update-user.dto.ts` ✅ (ya existe)
  - `user-response.dto.ts`

- **Repositorios Implementados**: Implementaciones concretas de las interfaces del dominio
  - `user.repository.ts` (implementa `UserRepositoryInterface`)
  - `user.repository.spec.ts`

- **Mappers**: Convierten entre entidades de dominio y modelos de persistencia
  - `user.mapper.ts`

- **Módulos**: Configuración de NestJS
  - `users.module.ts` ✅ (ya existe)

## Funcionalidad:

- ✅ Manejar peticiones HTTP (REST/GraphQL)
- ✅ Implementar persistencia en base de datos
- ✅ Integrar con servicios externos
- ✅ Validar datos de entrada
- ✅ Configurar dependencias de NestJS

## ⚠️ Importante:

- Esta capa **SÍ** puede depender de frameworks (NestJS, TypeORM, etc.)
- Debe implementar las interfaces definidas en el dominio
- Es la capa más externa y específica de tecnología
- Aquí van los detalles de implementación técnica
