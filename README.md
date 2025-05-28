# Resume API

A NestJS-based REST API for resume management built by Devtalks Group.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
  - [Option 1: Docker Development (Recommended)](#option-1-docker-development-recommended)
  - [Option 2: Local Development (Non-Docker)](#option-2-local-development-non-docker)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Production Deployment](#production-deployment)

## Prerequisites

### For Docker Development

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

### For Local Development

- [Node.js](https://nodejs.org/) (v22.13.1+)
- [pnpm](https://pnpm.io/) (v10.5.0+)
- [PostgreSQL](https://www.postgresql.org/) (v17.5+)

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resume-api
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker (Recommended for development)**

   ```bash
   # For development (database only)
   docker-compose -f docker-compose.local.yml up -d

   # Install dependencies and start the app locally
   pnpm install
   pnpm run start:dev
   ```

## Development Setup

### Option 1: Docker Development (Recommended)

This approach runs PostgreSQL and pgAdmin in Docker while running the NestJS app locally for better development experience.

1. **Start the database services**

   ```bash
   docker-compose -f docker-compose.local.yml up -d
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm run start:dev
   ```

4. **Access the services**
   - API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - pgAdmin: http://localhost:5050

### Option 2: Local Development (Non-Docker)

1. **Install PostgreSQL**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib

   # macOS (with Homebrew)
   brew install postgresql@17
   brew services start postgresql@17

   # Arch Linux
   sudo pacman -S postgresql
   sudo systemctl enable postgresql
   sudo systemctl start postgresql
   ```

2. **Create database and user**

   ```bash
   sudo -u postgres psql
   ```

   In PostgreSQL shell:

   ```sql
   CREATE DATABASE resume_api;
   CREATE USER postgres WITH PASSWORD 'postgres123';
   GRANT ALL PRIVILEGES ON DATABASE resume_api TO postgres;
   \q
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Configure environment variables**
   Create a `.env` file with local database settings:

   ```env
   # Application
   NODE_ENV=development
   APP_PORT=3000

   # Database
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres123
   DATABASE_NAME=resume_api
   ```

5. **Start the development server**
   ```bash
   pnpm run start:dev
   ```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Application Configuration
NODE_ENV=development
APP_PORT=3000

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres123
DATABASE_NAME=resume_api

# pgAdmin Configuration (for Docker setup)
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050
```

## Available Scripts

```bash
# Development
pnpm run start:dev      # Start with hot reload
pnpm run start:debug    # Start with debug mode

# Building
pnpm run build          # Build the application
pnpm run start:prod     # Run production build

# Testing
pnpm run test           # Run unit tests
pnpm run test:watch     # Run tests in watch mode
pnpm run test:cov       # Run tests with coverage
pnpm run test:e2e       # Run end-to-end tests

# Code Quality
pnpm run lint           # Run ESLint
pnpm run format         # Format code with Prettier
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

- **Local Development**: http://localhost:3000/api-docs
- **Custom Port**: http://localhost:{APP_PORT}/api-docs

The API documentation includes:

- All available endpoints
- Request/response schemas
- Authentication requirements
- Interactive API testing interface

## Production Deployment

### Full Docker Setup

For production deployment, use the main docker-compose file:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

This setup includes:

- NestJS application container
- PostgreSQL database
- pgAdmin for database management
- Proper networking and volume management

### Environment Variables for Production

Ensure you set secure values for production:

```env
NODE_ENV=production
DATABASE_PASSWORD=<secure-password>
PGADMIN_PASSWORD=<secure-password>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `pnpm run test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

---

Built with ❤️ by Devtalks Group
