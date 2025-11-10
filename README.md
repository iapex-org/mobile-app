# IAPEX - Aplicación móvil

Aplicación móvil para localizar pacientes extraviados en instituciones de salud mediante búsqueda híbrida con inteligencia artificial.

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue?logo=react" alt="React version">
  <img src="https://img.shields.io/badge/Ionic-8.x-blue?logo=ionic" alt="Ionic version">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript version">
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite" alt="Vite version">
</p>

<!-- ## 📱 Capturas de pantalla

<p align="center">
  <img src="./assets/screenshots/upload.png" alt="Carga de imágenes" width="200"/>
  <img src="./assets/screenshots/input.png" alt="Datos del paciente" width="200"/>
  <img src="./assets/screenshots/search.png" alt="Búsqueda en proceso" width="200"/>
  <img src="./assets/screenshots/results.png" alt="Resultados" width="200"/>
</p> -->

## 🏥 ¿Qué es IAPEX?

**IAPEX** (_Inteligencia Artificial para la Localización de Pacientes Extraviados en Instituciones de Salud_) es un sistema validado y robusto diseñado para abordar un problema crítico: **la identificación de pacientes no localizados o no identificados** dentro de instituciones de salud.

### Componentes del ecosistema

- **App móvil** (este repositorio): para búsqueda rápida de pacientes desde dispositivos móviles
- **App web**: para personal de salud y gestión institucional
- **API REST (Spring Boot)**: gestión de datos, autenticación y seguridad
- **API de búsqueda (FastAPI)**: motor de IA con búsqueda híbrida

La app móvil permite realizar búsquedas combinando **reconocimiento facial** y **descripción textual** del paciente, generando resultados ordenados por porcentaje de similitud.

---

## ✨ Funcionalidades

🔍 **Búsqueda híbrida** - combina reconocimiento facial (75%) y análisis textual (25%)
📸 **Reconocimiento facial** - identifica pacientes mediante CNN basada en dlib
📝 **Búsqueda textual** - algoritmos Levenshtein y Jaro-Winkler para coincidencias
📊 **Resultados ordenados** - porcentaje de similitud en cada coincidencia
🏥 **Contacto institucional** - solicita información de pacientes encontrados
🔒 **Datos seguros** - autenticación JWT y encriptación completa

---

## 🛠 Tecnologías

- **React** con TypeScript
- **Ionic Framework** para componentes móviles
- **Vite** como build tool
- **Capacitor** para funcionalidades nativas
- **Axios** para comunicación con APIs
- **React Hook Form** para gestión de formularios
- **Context API** para estado global

---

## ⚡ Instalación rápida

### Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**

### Pasos

1. **Clonar repositorio**

```bash
git clone https://github.com/aescobar80/IAPEX-MOBILE-APP.git
cd IAPEX-MOBILE-APP
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

⚠️ **IMPORTANTE:** Las variables de entorno son **OBLIGATORIAS**. La aplicación no funcionará sin ellas.

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Configura tus valores en `.env`:

```env
# API REST - Backend principal (Spring Boot)
VITE_API_REST_BASE_URL=http://localhost:8080/api/v1

# API SEARCH - Backend de búsqueda (FastAPI)
VITE_API_SEARCH_BASE_URL=http://localhost:8000/api/v1
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 📱 Compilar para móvil

```bash
# Sincronizar con Capacitor
npm run build
npx cap sync

# Abrir en Android Studio
npx cap open android

# Abrir en Xcode (macOS)
npx cap open ios
```

---

## 🏗 Ecosistema IAPEX: arquitectura de microservicios

IAPEX está compuesto por múltiples repositorios especializados que conforman una arquitectura moderna y escalable:

| Repositorio                                                            | Propósito                 | Tecnología                | Estado       |
| ---------------------------------------------------------------------- | ------------------------- | ------------------------- | ------------ |
| **[IAPEX-MOBILE-APP](https://github.com/aescobar80/IAPEX-MOBILE-APP)** | App móvil para búsqueda   | React + Ionic + Capacitor | ✅ Operativo |
| **[IAPEX_APP-WEB](https://github.com/aescobar80/IAPEX_APP-WEB)**       | App web institucional     | React + Vite              | ✅ Operativo |
| **[API-REST-IAPEX](https://github.com/aescobar80/API-REST-IAPEX)**     | API principal y seguridad | Spring Boot + PostgreSQL  | ✅ Operativo |
| **[API-SEARCH-IAPEX](https://github.com/misraelDev/API-SEARCH-IAPEX)** | Motor de IA y búsqueda    | FastAPI + dlib + MongoDB  | ✅ Operativo |

---

## 🤝 Colaboración interna

Seguimos convenciones específicas para mantener consistencia - consulta [CONTRIBUTING.MD](CONTRIBUTING.MD).

## 🤝 Reconocimientos

Este proyecto fue desarrollado por el equipo de autores:

- Florentino Altamirano Misrael
- Ortiz Pérez Alejandro
- Serrano Puertos Jorge Christian

Con la asesoría y guía conceptual de:

- Arturo Escobar García

Y con el apoyo académico de la

- Universidad Tecnológica del Centro de Veracruz
