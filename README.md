# Documentación de la API - Turnos

Esta API permite gestionar turnos de una barberia. A continuación, se describen los endpoints disponibles.

## Base URL

`localhost:${PORT}`

## **Usuarios**

### 1. Registro de usuario

**URL**: `/api/users/register`  
**Método**: `POST`  
**Descripción**: Permite registrar un nuevo usuario.

**Body (JSON)**:

```json
{
  "username": "Marcos Allende",
  "password": "87654321"
}
```

**Respuestas**:

- `201`: Usuario registrado correctamente.
- `400`: Error de validación.

---

### 2. Login de usuario

**URL**: `/api/users/login`  
**Método**: `POST`  
**Descripción**: Permite autenticar a un usuario y devuelve un token JWT para las solicitudes protegidas.

**Body (JSON)**:

```json
{
  "username": "Marcos Allende",
  "password": "87654321"
}
```

**Respuestas**:

- `200`: Usuario autenticado. Respuesta de ejemplo:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- `400`: Token no proporcionado.
- `401`: Token invalido.

---

## **Turnos**

### 1. Obtener todos los turnos

**URL**: `/api/turnos`  
**Método**: `GET`  
**Descripción**: Devuelve una lista de todos los turnos disponibles.

**Headers**:

- `Authorization`: Bearer `<token>`

**Respuestas**:

- `200`: Lista de turnos.
- `401`: No autorizado.

---

### 2. Crear un turno

**URL**: `/api/turnos`  
**Método**: `POST`  
**Descripción**: Crea un nuevo turno.

**Headers**:

- `Authorization`: Bearer `<token>`

**Body (JSON)**:

```json
{
  "cliente": {
    "nombre": "Marcos Allende",
    "numeroContacto": "+54 11 8765-0000"
  },
  "fecha": "2024-11-28",
  "hora": "08:00",
  "profesional": "Carlos Sánchez",
  "servicio": "Corte de pelo"
}
```

**Respuestas**:

- `201`: Turno creado correctamente.
- `400`: Error de validación.
- `401`: No autorizado.

---

### 3. Obtener un turno por ID

**URL**: `/api/turnos/{id}`  
**Método**: `GET`  
**Descripción**: Devuelve los detalles de un turno específico.

**Headers**:

- `Authorization`: Bearer `<token>`

**Respuestas**:

- `200`: Detalles del turno.
- `404`: Turno no encontrado.
- `401`: No autorizado.

---

### 4. Actualizar un turno

**URL**: `/api/turnos/{id}`  
**Método**: `PUT`  
**Descripción**: Actualiza un turno específico.

**Headers**:

- `Authorization`: Bearer `<token>`

**Body (JSON)**:

```json
{
  "fecha": "2024-11-28",
  "hora": "08:30",
  "estado": "realizado"
}
```

**Respuestas**:

- `200`: Turno actualizado correctamente.
- `400`: Error de validación.
- `404`: Turno no encontrado.
- `401`: No autorizado.

---

### 5. Eliminar un turno

**URL**: `/api/turnos/{id}`  
**Método**: `DELETE`  
**Descripción**: Elimina un turno específico.

**Headers**:

- `Authorization`: Bearer `<token>`

**Respuestas**:

- `204`: Turno eliminado correctamente.
- `404`: Turno no encontrado.
- `401`: No autorizado.

---

## **Autenticación**

Todos los endpoints protegidos requieren un token JWT en el header de autorización:

```
Authorization: Bearer <token>
```

---

## Notas

- Asegúrate de que el servidor esté corriendo en `localhost:${PORT}`.
- Cambia `{id}` por el ID correspondiente del turno al realizar operaciones específicas.
