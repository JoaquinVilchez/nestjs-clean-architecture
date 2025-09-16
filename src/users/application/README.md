# 📋 Application Layer

## ¿Qué va aquí?

Esta carpeta contiene la **lógica de aplicación** del módulo de usuarios. Aquí se implementan los casos de uso que orquestan las operaciones del dominio.

## Archivos que deberían estar aquí:

- **Use Cases (Casos de Uso)**: Clases que encapsulan una operación específica del negocio
  - `create-user.use-case.ts`
  - `update-user.use-case.ts`
  - `delete-user.use-case.ts`
  - `get-user.use-case.ts`

- **Transformers**: Utilidades para convertir datos entre capas
  - `user.transformer.ts`

- **DTOs de Aplicación**: Objetos de transferencia de datos específicos de la aplicación
  - `user-response.dto.ts`

## Funcionalidad:

- ✅ Orquestar operaciones del dominio
- ✅ Coordinar entre entidades y servicios
- ✅ Manejar la lógica de aplicación (no de negocio)
- ✅ Transformar datos entre capas

## ⚠️ Importante:

- Esta capa NO debe conocer detalles de infraestructura
- Se enfoca en la lógica de aplicación, no en reglas de negocio
- Es independiente de frameworks y tecnologías específicas
