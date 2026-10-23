# Forekey Business Dashboard

A portfolio business admin dashboard: **React + Vite** frontend and **Laravel** REST API with fictional customer data.

## Features

- Dashboard summary cards (totals, active/inactive, new this month)
- Customer list with search, create, edit, and delete
- Server-side validation and JSON API
- SQLite by default (MySQL-ready configuration)

## Prerequisites

| Tool | Version (verified) |
|------|-------------------|
| PHP | 8.5.12 + `pdo_sqlite` |
| Composer | 2.10.3 |
| Node.js | 24.21.0 |
| npm | 11.19.0 |
| Laravel | 13.38.0 |

Install the SQLite PHP extension if needed: `sudo apt install php8.5-sqlite3` (adjust version).

## Quick start

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API should be at [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api).

## Project structure

```text
forekey-business-dashboard/
├── frontend/          React app
├── backend/           Laravel API
├── screenshots/       UI captures (see below)
└── README.md
```

See `frontend/README.md` and `backend/README.md` for details and API examples.

## Screenshots

Captures from the local dev environment. Desktop layouts use the full sidebar; mobile layouts use the slide-out navigation (see **Mobile → Sidebar**).

### Desktop

#### Dashboard

![Dashboard summary cards on desktop](screenshots/Dashboard.png)

#### Customer list

![Customer list with search, sorting, pagination, and row actions](screenshots/CustomerList.png)

#### Add customer

![Add customer modal](screenshots/CustomerAdd.png)

#### Edit customer

![Edit customer modal](screenshots/CustomerEdit.png)

### Mobile

#### Sidebar

![Mobile navigation drawer](screenshots/mobile/Sidebar.png)

#### Dashboard

![Dashboard on mobile](screenshots/mobile/Dashboard.png)

#### Customer list

![Customer list on mobile](screenshots/mobile/CustomerList.png)

#### Add customer

![Add customer modal on mobile](screenshots/mobile/CustomerAdd.png)

#### Edit customer

![Edit customer modal on mobile](screenshots/mobile/CustomerEdit.png)

## Project status

Core implementation complete (API, database seeder, dashboard and customer UI). Screenshots above are from the local dev environment.

## About Forekey Technologies

- **Website:** https://www.forekey.in/
- **Email:** contact@forekey.in
- **GitHub:** https://github.com/forekey

Portfolio demonstration only — no production or confidential data.
