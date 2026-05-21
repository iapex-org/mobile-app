
# IAPEX — App Móvil (Familia)

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Ionic-8.x-3880FF?logo=ionic&logoColor=white" alt="Ionic">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Capacitor-6.x-119EFF?logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  <em>Aplicación móvil para que familias busquen seres queridos desaparecidos mediante búsqueda híbrida con IA.</em>
</p>

<p align="center">
  <a href="https://github.com/iapex-org/mobile-app">Repositorio</a>
  ·
  <a href="https://github.com/iapex-org/mobile-app/issues">Reportar Bug</a>
  ·
  <a href="https://virtual.cuautitlan.unam.mx/intar/wp-content/uploads/sites/19/2025/12/166-A-Hybrid-Artificial-Intelligent-System-for-Missing-JORGE-CHRISTIAN-SERRANO-PUERTOS.pdf">Artículo de Investigación</a>
</p>

---

## Acerca de IAPEX

**IAPEX** (Inteligencia Artificial para la Localización de Pacientes Extraviados en Instituciones de Salud) es un sistema validado que ayuda a instituciones de salud a identificar y gestionar pacientes no localizados mediante una fusión de reconocimiento facial y análisis textual.

Este repositorio contiene la **App Móvil** — una aplicación multiplataforma (Android/iOS) para que las familias puedan:

- Subir fotos de seres queridos desaparecidos para reconocimiento facial
- Ingresar descripciones físicas (rasgos morfológicos, vestimenta, etc.)
- Ver coincidencias potenciales ordenadas por porcentaje de similitud
- Enviar solicitudes de contacto a instituciones cuando encuentran una coincidencia

### Ecosistema

| Componente | Repositorio | Stack |
|-----------|-----------|-------|
| **App Móvil** (este) | [iapex-org/mobile-app](https://github.com/iapex-org/mobile-app) | React 18, Ionic 8, Capacitor |
| **Portal Web** | [iapex-org/web-app](https://github.com/iapex-org/web-app) | Angular 19, Bootstrap, TypeScript |
| **Core API** | [iapex-org/core-api](https://github.com/iapex-org/core-api) | Spring Boot 3, PostgreSQL, MongoDB |

## Funcionalidades

- **Búsqueda Híbrida** — Combina reconocimiento facial (75%) con análisis textual (25%)
- **Reconocimiento Facial** — Identificación basada en CNN mediante dlib
- **Coincidencia de Texto** — Algoritmos Levenshtein y Jaro-Winkler para descripciones morfológicas
- **Resultados Ordenados** — Coincidencias ordenadas por porcentaje de similitud
- **Solicitudes de Contacto** — Enviar consultas a instituciones cuando se encuentra una coincidencia
- **Datos Seguros** — Autenticación JWT y encriptación de extremo a extremo
- **Multiplataforma** — Android e iOS mediante Capacitor

## Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
git clone https://github.com/iapex-org/mobile-app.git
cd mobile-app
npm install
```

Crea un archivo `.env` desde el ejemplo:

```bash
cp .env.example .env
```

Configura tus variables de entorno:

```env
VITE_API_REST_BASE_URL=http://localhost:8080/api/v1
VITE_API_SEARCH_BASE_URL=http://localhost:8000/api/v1
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilación Móvil

```bash
npm run build
npx cap sync
npx cap open android   # Android Studio
npx cap open ios       # Xcode (macOS)
```

## Contribuciones

Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para nuestras convenciones de ramas, commits y flujo de PRs.

## Licencia

Este proyecto está licenciado bajo GNU General Public License v3.0 — consulta el archivo [LICENSE](LICENSE) para más detalles.

## Reconocimientos

**Autores:**
- Florentino Altamirano Misrael
- Ortiz Pérez Alejandro
- Serrano Puertos Jorge Christian

**Asesor:**
- Escobar García Arturo

**Apoyo Académico:**
- Universidad Tecnológica del Centro de Veracruz
