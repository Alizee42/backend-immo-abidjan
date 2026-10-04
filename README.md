# SCI-AGD — API

API REST du site SCI-AGD (programme immobilier du domaine de Songon Agban, Abidjan) : biens, articles, demandes de contact, contenus des pages et administration.

## Stack

Node.js 20 · TypeScript · Express · Prisma · PostgreSQL 16 · Docker Compose

## Structure

```
docker-compose.yml   API + base PostgreSQL (dossier /opt/sci-agd sur le VPS)
.env.example         variables à copier dans .env (jamais commité)
backend/
  src/               serveur Express et routes
  prisma/
    schema.prisma    modèle de données
    migrations/      migrations appliquées au démarrage du conteneur
    seed.ts          jeu de données de démonstration (unique seed)
    create-admin.ts  création d'un compte admin
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `DB_PASSWORD` | Mot de passe PostgreSQL |
| `JWT_SECRET` | Signature des jetons de connexion admin |
| `CORS_ORIGIN` | Origines autorisées, séparées par des virgules |
| `PUBLIC_URL` | URL publique de l'API (construction des URL des photos) |
| `CLOUDINARY_*` | Optionnel : `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |

## Lancement

### Docker (production)

```bash
cp .env.example .env   # puis remplir les valeurs
docker compose up -d --build
```

L'API écoute sur `127.0.0.1:8083`, nginx assure le HTTPS devant. Les migrations Prisma sont appliquées automatiquement au démarrage. Le seed, lui, n'est jamais lancé automatiquement.

### En local

```bash
cd backend
npm install
# .env avec DATABASE_URL, JWT_SECRET, CORS_ORIGIN, PORT=8082
npx prisma migrate deploy
npm run dev
```

## Données

```bash
npm run prisma:seed      # charge (ou recharge) les biens et articles de démo
npm run demo:purge       # supprime uniquement le contenu de démo
npm run create-admin -- <email> <mot-de-passe> [nom]
```

Dans le conteneur : `docker exec sci-agd-api npx tsx prisma/seed.ts`.

Le seed crée 24 biens (SOBE 1 livré, SOBE 2 en travaux, SOBE 3 prévu) et 5 articles, tous marqués `demo`. Il ne touche jamais aux vrais biens.

## Endpoints

🔒 = jeton admin requis (`Authorization: Bearer <token>`)

| Route | Méthodes |
|---|---|
| `/api/properties` | `GET`, `GET /:id`, 🔒 `POST`, 🔒 `PUT /:id`, 🔒 `DELETE /:id` |
| `/api/articles` | `GET`, `GET /:id`, 🔒 `GET /admin`, 🔒 `POST`, 🔒 `PUT /:id`, 🔒 `DELETE /:id` |
| `/api/contact` | `POST`, 🔒 `GET`, 🔒 `PATCH /:id`, 🔒 `DELETE /:id` |
| `/api/auth` | `POST /login`, 🔒 `GET /moi` |
| `/api/upload` | 🔒 `POST` (champ `photos`, 12 max) |
| `/api/contenus` | `GET /:cle`, 🔒 `PUT /:cle` |
| `/api/demo` | `GET` (bandeau démo actif ?), 🔒 `DELETE` (purge de la démo) |
| `/uploads/*` | photos envoyées |
