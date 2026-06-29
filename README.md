# ImmoAbidjan — Backend

API REST Spring Boot pour une plateforme immobilière ciblant Abidjan, Côte d'Ivoire. Gère les annonces de biens (vente / location), un blog et les demandes de contact pour un programme résidentiel organisé en trois quartiers (Nord, Centre, Sud).

## Stack technique

| Technologie | Version |
|---|---|
| Java | 21 |
| Spring Boot | 3.5.0 |
| Spring Data JPA | (géré par Boot) |
| Spring Security | (géré par Boot) |
| Spring Validation | (géré par Boot) |
| PostgreSQL | (géré par Boot) |
| Lombok | (géré par Boot) |
| Build | Gradle (wrapper inclus) |

## Base de données

**PostgreSQL** — port 5433 par défaut. Le schéma est auto-géré via `ddl-auto=update`. Un `DataSeeder` peuple automatiquement la base au premier démarrage avec 9 biens et 4 articles de blog.

## Prérequis

- Java 21
- PostgreSQL démarré sur le port 5433

## Installation et lancement

```bash
# 1. Créer la base de données et l'utilisateur
psql -U postgres -c "CREATE USER immo_user WITH PASSWORD 'immo_password';"
psql -U postgres -c "CREATE DATABASE immo_abidjan OWNER immo_user;"

# 2. Lancer l'API (port 8081)
./gradlew bootRun        # Linux / macOS
gradlew.bat bootRun      # Windows
```

API disponible sur `http://localhost:8081`.

## Endpoints

Toutes les routes sont publiques (pas d'authentification requise).

### Biens immobiliers (`/api/properties`)

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/properties` | Liste des biens — filtrable par `type`, `quartier`, `status` |
| `POST` | `/api/properties` | Créer un bien |
| `PUT` | `/api/properties/{id}` | Modifier un bien |
| `DELETE` | `/api/properties/{id}` | Supprimer un bien |

Paramètres de filtre : `type` (`VENTE` / `LOCATION`), `quartier` (`NORD` / `CENTRE` / `SUD`), `status` (`DISPONIBLE` / `RESERVE` / `VENDU`).

### Articles de blog (`/api/articles`)

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/articles` | Liste des articles |
| `POST` | `/api/articles` | Créer un article |
| `PUT` | `/api/articles/{id}` | Modifier un article |

### Contact (`/api/contact`)

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Envoyer une demande de contact |
