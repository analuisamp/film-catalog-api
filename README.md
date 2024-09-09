# Film Catalog API

## Overview

This project implements a film catalog API with JWT authentication. It provides CRUD operations for managing movies, accessible only to authenticated users.

### Tools

- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL

## Technical Aspects

The architecture consists of an application providing a RESTful JSON API, using Redis for caching.

### Deployment

Heroku
https://apinestjs-film-catalog-b4e6bc228e9d.herokuapp.com/

## How to Use
   
### Installation

```bash
$ pnpm install
```

### Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
The API will be accessible at http://localhost:3000.

###Swagger Documentation
You can access the Swagger documentation at http://localhost:3000.


