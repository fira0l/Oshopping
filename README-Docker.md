# OShop Docker Setup

This project is fully dockerized with all components running in containers.

## Services

- **Frontend**: React app (Port 3000)
- **Admin Dashboard**: React admin panel (Port 3001)  
- **Backend**: Node.js GraphQL API (Port 4000)
- **Database**: PostgreSQL (Port 5432)

## Quick Start

1. **Build and run all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Access URLs

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:4000
- **Database**: localhost:5432

## Environment Variables

The database credentials are set in docker-compose.yml:
- Database: `oshop_db`
- User: `oshop_user`
- Password: `oshop_password`

## Development

To rebuild a specific service:
```bash
docker-compose build frontend
docker-compose build backend
docker-compose build admin
```

## Logs

View logs for all services:
```bash
docker-compose logs -f
```

View logs for specific service:
```bash
docker-compose logs -f frontend
```