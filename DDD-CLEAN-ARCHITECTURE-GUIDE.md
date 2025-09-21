# 🏗️ DDD & Clean Architecture - Guía de Referencia

## 📋 ¿Qué es Domain-Driven Design (DDD)?

**DDD** es una metodología de desarrollo de software que se enfoca en el **dominio de negocio** como el corazón de la aplicación. El dominio contiene toda la lógica de negocio pura, independiente de tecnologías externas.

### 🎯 Principios Clave de DDD:

- **Ubiquitous Language**: El código habla el mismo idioma que el negocio
- **Bounded Contexts**: Cada módulo tiene su propio dominio bien definido
- **Entities**: Objetos con identidad única que representan conceptos del negocio
- **Value Objects**: Objetos inmutables que representan conceptos sin identidad
- **Aggregates**: Conjuntos de entidades que se mantienen consistentes juntas

---

## 🏛️ ¿Qué es Clean Architecture?

**Clean Architecture** es un patrón arquitectónico que organiza el código en capas concéntricas, donde las dependencias apuntan hacia adentro (hacia el dominio).

### 🎯 Principios Clave:

- **Independencia de Frameworks**: El dominio no depende de NestJS, Express, etc.
- **Independencia de UI**: El dominio no sabe si es web, móvil, CLI
- **Independencia de Base de Datos**: El dominio no sabe si es MySQL, PostgreSQL, etc.
- **Independencia de Agentes Externos**: El dominio no depende de APIs externas

---

## 📁 Estructura de Carpetas

```
src/
├── shared/                    # 🟦 COMPARTIDO - Funcionalidad común
│   └── domain/               # Lógica compartida entre módulos
│       ├── entities/         # Clase base Entity
│       ├── errors/           # Excepciones compartidas
│       ├── validators/       # Validadores base
│       └── repositories/     # Contratos de repositorio
│
└── users/                    # 🟨 MÓDULO ESPECÍFICO - Usuarios
    ├── domain/               # 🟢 DOMINIO - Lógica de negocio pura
    │   ├── entities/         # UserEntity (reglas de negocio)
    │   ├── validators/       # UserValidator (validaciones específicas)
    │   └── testing/          # Helpers de testing
    │
    └── infrastructure/       # 🔴 INFRAESTRUCTURA - Detalles técnicos
        ├── dto/              # DTOs para APIs REST
        ├── controllers/      # Controladores HTTP
        ├── services/         # Servicios de orquestación
        └── modules/          # Configuración de NestJS
```

---

## 🎯 Capas de Clean Architecture

### 🟢 1. DOMINIO (Domain Layer)

**¿Qué contiene?** Lógica de negocio pura, reglas del dominio, entidades, validaciones.

**Características:**

- ✅ **Independiente** de frameworks externos
- ✅ **Sin dependencias** externas
- ✅ **Testeable** sin base de datos ni APIs
- ✅ **Reutilizable** en diferentes contextos

**Ejemplos en el proyecto:**

- `UserEntity` - Reglas de negocio de usuarios
- `UserValidator` - Validaciones del dominio
- `Entity` (shared) - Funcionalidad base compartida

### 🔴 2. INFRAESTRUCTURA (Infrastructure Layer)

**¿Qué contiene?** Detalles técnicos, frameworks, bases de datos, APIs externas.

**Características:**

- ✅ **Implementa** interfaces del dominio
- ✅ **Maneja** detalles técnicos específicos
- ✅ **Se adapta** a frameworks externos
- ✅ **Puede cambiar** sin afectar el dominio

**Ejemplos en el proyecto:**

- `UsersController` - Endpoints HTTP REST
- `CreateUserDto` - Validación de entrada HTTP
- `UsersModule` - Configuración de NestJS

---

## 🔄 Flujo de Dependencias

```
🌐 EXTERNO (HTTP, DB, APIs)
    ↓
🔴 INFRAESTRUCTURA (Controllers, DTOs, Services)
    ↓
🟢 DOMINIO (Entities, Validators, Business Logic)
    ↓
🟦 SHARED (Base Classes, Common Logic)
```

**Regla de Oro:** Las dependencias SIEMPRE apuntan hacia adentro (hacia el dominio).

---

## 📝 Patrones Clave

### 🏗️ Repository Pattern

```typescript
// Contrato en el dominio (shared)
interface RepositoryInterface<E> {
  insert(entity: E): Promise<void>
  findById(id: string): Promise<E>
}

// Implementación en infraestructura
class UserRepository implements RepositoryInterface<UserEntity> {
  // Implementación específica de MySQL/PostgreSQL
}
```

### 🎭 Factory Pattern

```typescript
// En el dominio
class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
```

### 🏛️ Entity Pattern

```typescript
// Entidad del dominio
class UserEntity extends Entity<UserProps> {
  // Reglas de negocio puras
  update(name: string): void {
    this.validate({ ...this.props, name })
    this.name = name
  }
}
```

---

## 🧪 Testing Strategy

### 🟢 Tests del Dominio

- **Unitarios**: Prueban lógica de negocio pura
- **Integración**: Prueban validaciones completas
- **Sin dependencias** externas (DB, APIs)

### 🔴 Tests de Infraestructura

- **Unitarios**: Prueban configuración de frameworks
- **Integración**: Prueban APIs REST completas
- **Con dependencias** externas (NestJS, DB)

---

## 🎯 Beneficios de esta Arquitectura

### ✅ **Mantenibilidad**

- Código organizado por responsabilidades
- Fácil localizar y modificar funcionalidad

### ✅ **Testabilidad**

- Dominio testeable sin dependencias externas
- Tests rápidos y confiables

### ✅ **Escalabilidad**

- Fácil agregar nuevos módulos
- Patrón consistente en toda la aplicación

### ✅ **Flexibilidad**

- Cambiar frameworks sin afectar el dominio
- Intercambiar implementaciones fácilmente

### ✅ **Claridad**

- Cada archivo tiene un propósito claro
- Arquitectura autodocumentada

---

## 🚀 Próximos Pasos

1. **Aplicar el patrón** a nuevos módulos (products, orders, etc.)
2. **Implementar casos de uso** en la capa de aplicación
3. **Agregar repositorios reales** (MySQL, PostgreSQL)
4. **Implementar eventos de dominio** para comunicación entre módulos
5. **Agregar tests de integración** end-to-end

---

## 📚 Recursos Adicionales

- **Clean Architecture** - Robert C. Martin
- **Domain-Driven Design** - Eric Evans
- **Implementing Domain-Driven Design** - Vaughn Vernon

---

_💡 **Tip**: Consulta los comentarios en cada archivo del proyecto para ver ejemplos específicos de cómo se aplica esta arquitectura._
