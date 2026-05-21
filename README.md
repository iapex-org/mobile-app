# IAPEX — Mobile App (Family)

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Ionic-8.x-3880FF?logo=ionic&logoColor=white" alt="Ionic">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Capacitor-6.x-119EFF?logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  <em>Mobile application for families to search for missing loved ones using hybrid AI matching.</em>
</p>

<p align="center">
  <a href="https://github.com/iapex-org/mobile-app">Repository</a>
  ·
  <a href="https://github.com/iapex-org/mobile-app/issues">Report Bug</a>
  ·
  <a href="https://virtual.cuautitlan.unam.mx/intar/wp-content/uploads/sites/19/2025/12/166-A-Hybrid-Artificial-Intelligent-System-for-Missing-JORGE-CHRISTIAN-SERRANO-PUERTOS.pdf">Research Paper</a>
</p>

<p align="center">
  <a href="README.md">🇬🇧 English</a> · <a href="README.es.md">🇪🇸 Español</a>
</p>

---

## About IAPEX

**IAPEX** (Hybrid AI for Missing Patient Identification) is a validated system that helps healthcare institutions identify and manage unidentified or missing patients through a fusion of facial recognition and textual analysis.

This repository contains the **Mobile App** — a cross-platform application (Android/iOS) for families to:

- Upload photos of missing loved ones for facial recognition
- Enter physical descriptions (morphological traits, clothing, etc.)
- View potential matches ranked by similarity percentage
- Submit contact requests to institutions when a match is found

### Ecosystem

| Component | Repository | Stack |
|-----------|-----------|-------|
| **Mobile App** (this) | [iapex-org/mobile-app](https://github.com/iapex-org/mobile-app) | React 18, Ionic 8, Capacitor |
| **Web Portal** | [iapex-org/web-app](https://github.com/iapex-org/web-app) | Angular 19, Bootstrap, TypeScript |
| **Core API** | [iapex-org/core-api](https://github.com/iapex-org/core-api) | Spring Boot 3, PostgreSQL, MongoDB |

## Features

- **Hybrid Search** — Combines facial recognition (75%) with text analysis (25%)
- **Facial Recognition** — CNN-based identification via dlib
- **Text Matching** — Levenshtein and Jaro-Winkler algorithms for morphological descriptions
- **Ranked Results** — Matches ordered by similarity percentage
- **Contact Requests** — Submit inquiries to institutions when a match is found
- **Secure Data** — JWT authentication and end-to-end encryption
- **Cross-Platform** — Android and iOS via Capacitor

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone https://github.com/iapex-org/mobile-app.git
cd mobile-app
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
VITE_API_REST_BASE_URL=http://localhost:8080/api/v1
VITE_API_SEARCH_BASE_URL=http://localhost:8000/api/v1
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Mobile Build

```bash
npm run build
npx cap sync
npx cap open android   # Android Studio
npx cap open ios       # Xcode (macOS)
```

## Architecture

```
┌───────────────────────────────────────────────┐
│            Mobile App (React + Ionic)          │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Camera  │ │  Search  │ │   Results    │   │
│  │ Module  │ │  Module  │ │   Module     │   │
│  └────┬────┘ └────┬─────┘ └──────┬───────┘   │
│       │           │              │            │
│  ┌────▼───────────▼──────────────▼───────┐    │
│  │         HTTP Services (Axios)         │    │
│  └────────────────┬──────────────────────┘    │
└───────────────────┼──────────────────────────┘
                    │ JWT Auth
         ┌──────────┴──────────┐
         ▼                     ▼
┌──────────────┐     ┌──────────────┐
│  Core API    │     │  Search API  │
│  (Spring)    │     │  (FastAPI)   │
└──────────────┘     └──────────────┘
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our branch naming, commit conventions, and PR workflow.

## License

This project is licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

**Authors:**
- Serrano Puertos Jorge Christian — christian.serrano.puertos@gmail.com
- Florentino Altamirano Misrael — misraelaltamirano@gmail.com
- Ortiz Pérez Alejandro — alex03ortizperez@gmail.com

**Collaborators:**
- Chávez Moreno Jose Eduardo
- Fernández López Kevin Noé

**Advisor:**
- Escobar García Arturo

**Stakeholders:**
- Guarneros Nolasco Luis Rolando
- Cruz Ramos Nancy Aracely

**Academic Support:**
- Universidad Tecnológica del Centro de Veracruz
