# 🏛️ Domain Layer

## ¿Qué va aquí?

Esta es la **carpeta más importante** del módulo. Contiene el núcleo del dominio de usuarios con todas las reglas de negocio puras.

## Archivos que deberían estar aquí:

- **Entities (Entidades)**: Objetos con identidad propia
  - `user.entity.ts` ✅ (ya existe)
  - `user-profile.entity.ts`

- **Value Objects (Objetos de Valor)**: Conceptos sin identidad, definidos por sus atributos
  - `email.vo.ts`
  - `password.vo.ts`
  - `user-id.vo.ts`

- **Interfaces de Repositorios**: Contratos para persistencia
  - `user.repository.interface.ts`

- **Services de Dominio**: Lógica de negocio que no pertenece a una sola entidad
  - `user-domain.service.ts`

- **Enums y Types**: Definiciones del dominio
  - `user-status.enum.ts`
  - `user.types.ts`

## Funcionalidad:

- ✅ Definir reglas de negocio puras
- ✅ Representar conceptos del dominio
- ✅ Validar invariantes del negocio
- ✅ Contener la lógica más importante de la aplicación

## ⚠️ Importante:

- **NUNCA** debe depender de frameworks externos
- **NUNCA** debe conocer detalles de infraestructura
- Debe ser **100% testeable** de forma aislada
- Aquí van las reglas de negocio más importantes
