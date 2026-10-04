#!/usr/bin/env bash
# Déploiement de l'API SCI-AGD (/opt/sci-agd).
# Installé sur le VPS en /usr/local/bin/sci-agd-deploy, hors du repo : un déploiement ne peut pas
# modifier le script en cours d'exécution. Lancé par GitHub Actions avec une clé SSH limitée à ce script.
set -euo pipefail

# Un seul déploiement à la fois
exec 9>/var/lock/sci-agd-deploy.lock
flock -n 9 || { echo "Un déploiement est déjà en cours"; exit 1; }

cd /opt/sci-agd

echo "== Récupération du code"
git fetch --quiet origin main
git reset --hard origin/main
git log -1 --oneline

echo "== Build et redémarrage de l'API (la base n'est pas touchée)"
docker compose up -d --build sci-agd-api

echo "== Vérification"
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:8083/api/demo; then
    echo "API OK"
    docker image prune -f > /dev/null
    exit 0
  fi
  sleep 2
done

echo "L'API ne répond pas après 60 s"
docker compose logs --tail 50 sci-agd-api
exit 1
