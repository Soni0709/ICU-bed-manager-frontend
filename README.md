# ICU Bed Manager - Frontend

A real-time ICU bed tracking and patient management dashboard built with React, TypeScript, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)

## Features

### Core Functionality
- **Real-time Bed Tracking**: Monitor 20 ICU beds with live status updates
- **State Management**: Three-state bed lifecycle (Available → Occupied → Maintenance)
- **Patient Assignment**: Assign patients with urgency levels (Low, Medium, High, Critical)
- **Patient Discharge**: Move patients from occupied beds to maintenance
- **Bed Cleaning**: Mark beds as cleaned and return them to available status

### UI/UX Features
- **Color-Coded Tiles**: 
  - 🟢 Green: Available beds
  - 🔴 Red: Occupied beds
  - 🟡 Yellow: Maintenance beds
- **Live Statistics Dashboard**: Real-time count of available, occupied, and maintenance beds
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Toast Notifications**: Beautiful toast notifications for all actions (using Sonner)
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client-side validation for patient assignment
- **CSV Export**: Download bed census data

### Advanced Features
- **Pessimistic Locking**: Prevents concurrent bed assignments
- **Error Handling**: Comprehensive error messages for failed operations
- **State Machine Enforcement**: Validates state transitions (The Guardrail)
- **Optimistic UI Updates**: Instant feedback with backend verification

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3+ | UI Library |
| TypeScript | 5.5+ | Type Safety |
| Vite | 5.4+ | Build Tool |
| Tailwind CSS | 3.4+ | Styling |
| Shadcn/ui | Latest | UI Components |
| Axios | 1.7+ | HTTP Client |
| Sonner | 1.7+ | Toast Notifications |
| Lucide React | Latest | Icons |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Backend API**: Rails backend running on `http://localhost:3000`

Check your versions:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd icu-bed-frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- Axios
- Sonner
- Lucide React icons


Expected output should include:
```
├── @radix-ui/react-dialog@...
├── @radix-ui/react-select@...
├── axios@...
├── lucide-react@...
├── react@...
├── sonner@...
├── tailwindcss@...
└── typescript@...
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

You should see:
```
  VITE v5.4.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### With Backend Connected

**Terminal 1 - Backend (Rails):**
```bash
cd ../icu_bed_manager
rails server
```

**Terminal 2 - Frontend (React):**
```bash
cd icu-bed-frontend
npm run dev
```

**Open in Browser:**
```
http://localhost:5173
```

## Project Structure
```
icu-bed-frontend/
│
├── public/                      # Static assets
│
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── select.tsx
│   │   ├── AssignPatientModal.tsx  # Patient assignment modal
│   │   └── BedTile.tsx          # Individual bed card
│   │
│   ├── data/                    # Mock data (optional)
│   │   └── mockBeds.ts          # Mock bed data for testing
│   │
│   ├── services/                # API services
│   │   └── api.ts               # Axios API client
│   │
│   ├── types/                   # TypeScript types
│   │   └── bed.ts               # Bed-related interfaces
│   │
│   ├── utils/                   # Utility functions
│   │   └── bedUtils.ts          # Helper functions for beds
│   │
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # App-specific styles
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles + Tailwind
│
├── .gitignore                   # Git ignore rules
├── components.json              # Shadcn configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TS config
├── tsconfig.node.json           # Node-specific TS config
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```


#### Start Server
```bash
npm run dev


## API Integration

### API Base URL

The frontend connects to the Rails backend at:
```
http://localhost:3000
```

### API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/beds` | Fetch all beds | - |
| POST | `/beds/:id/assign` | Assign patient | `{ patient_name, urgency_level }` |
| POST | `/beds/:id/discharge` | Discharge patient | - |
| POST | `/beds/:id/clean` | Mark bed cleaned | - |
| GET | `/beds/export` | Export CSV | - |


## Testing

### Manual Testing Checklist

- [ ] Initial load shows all 20 beds
- [ ] Statistics display correctly
- [ ] Assign patient modal opens and validates
- [ ] Patient assignment updates bed state
- [ ] Discharge moves bed to maintenance
- [ ] Clean bed returns to available
- [ ] Refresh button reloads data
- [ ] Export CSV downloads file
- [ ] Toast notifications appear
- [ ] Error messages display for invalid actions
- [ ] Loading states show during API calls
- [ ] Responsive design works on mobile
