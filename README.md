# Ticket System

Ett enkelt fullstack-biljettsystem byggt med Vue, Node.js, Express och SQLite.

Projektet låter användaren:

- Skapa en biljett med en slumpmässig biljettkod
- Visa alla biljetter
- Använda en biljett
- Förhindra att samma biljett används flera gånger
- Radera en biljett så länge den inte har använts

## Tekniker

### Frontend
- Vue
- Vite
- JavaScript

### Backend
- Node.js
- Express
- CORS

### Databas
- SQLite
- better-sqlite3

### Testning
- Vitest
- Supertest
- Vue Test Utils

## Databasdesign

Projektet använder en SQLite-databas med tabellen `tickets`.

| Fält | Typ | Beskrivning |
|---|---|---|
| id | INTEGER | Unikt ID för biljetten |
| code | TEXT | Unik biljettkod |
| created_at | TEXT | Tidpunkt då biljetten skapades |
| used | INTEGER | 0 = oanvänd, 1 = använd |
| used_at | TEXT | Tidpunkt då biljetten användes |

## Starta projektet

### Backend

Gå till backend-mappen:

```bash
cd backend
npm install
node src/server.js