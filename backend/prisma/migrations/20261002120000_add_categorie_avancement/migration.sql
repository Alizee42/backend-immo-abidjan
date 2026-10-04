-- AlterEnum
ALTER TYPE "PropertyType" ADD VALUE 'LOCATION_VENTE';

-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('TERRAIN_VIABILISE', 'MAISON_CLES_EN_MAIN');

-- CreateEnum
CREATE TYPE "Avancement" AS ENUM ('LIVRE', 'EN_TRAVAUX', 'PREVU');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "avancement" "Avancement" NOT NULL DEFAULT 'LIVRE',
ADD COLUMN     "categorie" "Categorie" NOT NULL DEFAULT 'MAISON_CLES_EN_MAIN';
