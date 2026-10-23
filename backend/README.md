# Forekey Business Dashboard — Backend

Laravel 13 REST API for customers and dashboard statistics.

## Prerequisites

- PHP 8.2+ with extensions: `pdo`, **`pdo_sqlite`** (or configure MySQL in `.env`)
- Composer 2.x

On Ubuntu/Debian, if migrations fail with `could not find driver`:

```bash
sudo apt install php8.5-sqlite3   # match your PHP version
```

Verified stack during development: PHP 8.5.12, Laravel 13.38.0.

## Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

API base URL: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

## Database

Default `.env` uses SQLite at `database/database.sqlite`. To use MySQL, set `DB_CONNECTION=mysql` and related `DB_*` variables, then run `php artisan migrate --seed`.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Dashboard summary JSON |
| GET | `/api/customers` | List customers |
| POST | `/api/customers` | Create customer (201) |
| GET | `/api/customers/{id}` | Single customer |
| PUT/PATCH | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer (204) |

### Dashboard stats response

```json
{
  "total_customers": 10,
  "active_customers": 7,
  "inactive_customers": 3,
  "new_customers_this_month": 10
}
```

### Create customer

`POST /api/customers`

```json
{
  "name": "Aarav Shah",
  "email": "aarav.shah@example.com",
  "phone": "+91 90000 12345",
  "company": "Sample Trading Co.",
  "status": "active"
}
```

Validation errors return **422** with Laravel's standard `message` and `errors` object.

## CORS

`config/cors.php` allows `http://localhost:5173` and `http://127.0.0.1:5173` for local Vite development.
