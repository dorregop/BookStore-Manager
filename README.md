# 📚 BookStore Manager

> Sistema de gestión para librería desarrollado como proyecto de aprendizaje orientado al desarrollo **Backend con Node.js y Express**.

---

## 📖 Descripción

**BookStore Manager** es una aplicación web diseñada para administrar una librería mediante una arquitectura escalable y mantenible.

El proyecto tiene como objetivo principal reforzar conocimientos en desarrollo Backend utilizando **JavaScript**, **Node.js** y **Express**, aplicando buenas prácticas de diseño de software, separación de responsabilidades y arquitectura por capas.

La aplicación comenzará utilizando archivos **JSON** como mecanismo de persistencia para posteriormente evolucionar hacia una base de datos relacional sin necesidad de modificar la lógica de negocio.

El frontend actuará únicamente como cliente de la API REST desarrollada.

---

# 🎯 Objetivos del proyecto

Este proyecto busca reforzar conocimientos sobre:

* JavaScript (ES6+)
* Node.js
* Express
* Arquitectura REST
* Arquitectura por capas
* Programación orientada a objetos
* Organización de proyectos Backend
* Separación de responsabilidades
* CRUD
* Validaciones
* Middlewares
* Manejo de errores
* Persistencia de datos
* Consumo de APIs
* Git y flujo de trabajo profesional

---

# 🏛 Arquitectura

El proyecto seguirá una arquitectura por capas.

```text
Cliente

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Persistencia (JSON)

↓

(Base de datos en futuras versiones)
```

Cada capa tendrá una única responsabilidad.

| Capa         | Responsabilidad                          |
| ------------ | ---------------------------------------- |
| Routes       | Define las rutas disponibles de la API   |
| Controllers  | Gestiona las peticiones HTTP             |
| Services     | Implementa la lógica de negocio          |
| Repositories | Acceso a los datos                       |
| Models       | Representación de las entidades          |
| Middlewares  | Funcionalidades reutilizables de Express |

---

# 📦 Modelo del dominio

El sistema estará compuesto por las siguientes entidades.

## 📚 Book

Representa la información bibliográfica del libro.

Un libro puede tener múltiples ejemplares.

---

## 📖 Copy

Representa una copia física del libro.

Cada ejemplar tendrá un único estado.

Estados posibles:

* AVAILABLE
* RESERVED
* LOANED
* SOLD

---

## 👤 User

Representa a los usuarios del sistema.

Roles iniciales:

* ADMIN
* CUSTOMER

---

## 📅 Reservation

Representa la reserva de un ejemplar.

---

## 🤝 Loan

Representa el préstamo de un ejemplar.

---

## 🛒 Sale

Representa una compra realizada por un cliente.

---

# 📌 Reglas de negocio

El sistema deberá garantizar las siguientes reglas:

* Un libro puede tener múltiples ejemplares.
* Cada ejemplar pertenece a un único libro.
* Cada ejemplar solo puede tener un estado activo.
* Solo pueden reservarse ejemplares disponibles.
* Solo pueden prestarse ejemplares disponibles.
* Solo pueden venderse ejemplares disponibles.
* Un ejemplar reservado únicamente podrá venderse al usuario que realizó la reserva.
* Un ejemplar prestado nunca podrá venderse.
* Los ejemplares vendidos no podrán volver a utilizarse.
* Solo podrán eliminarse ejemplares disponibles.
* El stock se calculará automáticamente a partir de los ejemplares existentes.

---

# 🚀 Tecnologías

## Backend

* Node.js
* Express
* JavaScript
* UUID
* Dotenv
* Nodemon

## Frontend

* HTML5
* CSS3
* JavaScript
* Framework CSS (por definir)

## Persistencia

Primera versión:

* Archivos JSON

Versiones futuras:

* PostgreSQL

---

# 📁 Estructura del proyecto

```text
bookstore-manager/

│

├── src/

│   ├── config/

│   ├── controllers/

│   ├── data/

│   ├── middlewares/

│   ├── models/

│   ├── repositories/

│   ├── routes/

│   ├── services/

│   ├── utils/

│   ├── app.js

│   └── server.js

│

├── public/

├── docs/

├── package.json

├── README.md

└── .env
```

---

# 🌐 API REST

La API expondrá recursos para:

* Books
* Copies
* Users
* Reservations
* Loans
* Sales

Los endpoints serán implementados progresivamente durante el desarrollo.

---

# 🗺 Roadmap

## Sprint 0

* Definición del dominio
* Diseño de arquitectura
* Organización del proyecto
* Configuración de Express
* Diseño de la API

---

## Sprint 1

Gestión de libros

* Listar libros
* Obtener libro por ID
* Crear libro
* Editar libro
* Eliminar libro

---

## Sprint 2

Gestión de ejemplares

* Alta de ejemplares
* Baja de ejemplares
* Control de stock

---

## Sprint 3

Gestión de usuarios

---

## Sprint 4

Reservas

---

## Sprint 5

Préstamos

---

## Sprint 6

Carrito y ventas

---

## Sprint 7

Autenticación mediante JWT

---

## Sprint 8

Migración a PostgreSQL

---

# 📌 Objetivos de calidad

Al finalizar el proyecto se espera que:

* El código sea modular.
* Cada capa tenga una única responsabilidad.
* La lógica de negocio sea independiente de la persistencia.
* La API siga principios REST.
* El proyecto pueda escalar fácilmente.
* Sea posible reemplazar JSON por una base de datos sin modificar la lógica de negocio.

---

# 📚 Aprendizajes esperados

Este proyecto está pensado como una evolución progresiva hacia un backend profesional.

Más que desarrollar una aplicación completa, el objetivo es comprender cómo diseñar, estructurar y mantener una API escalable aplicando buenas prácticas de desarrollo.

Cada nueva funcionalidad será incorporada mediante iteraciones, permitiendo que el proyecto crezca de forma ordenada y preparada para futuras mejoras.

---

# 📄 Licencia

Proyecto desarrollado con fines educativos y de aprendizaje.
