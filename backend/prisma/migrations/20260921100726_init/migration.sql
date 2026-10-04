-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('VENTE', 'LOCATION');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DISPONIBLE', 'RESERVE', 'VENDU', 'LOUE');

-- CreateEnum
CREATE TYPE "Quartier" AS ENUM ('QUARTIER_1', 'QUARTIER_2', 'QUARTIER_3');

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "type" "PropertyType" NOT NULL,
    "status" "PropertyStatus" NOT NULL,
    "quartier" "Quartier" NOT NULL,
    "superficie" DOUBLE PRECISION,
    "prix" DECIMAL(15,2) NOT NULL,
    "nombreChambres" INTEGER,
    "nombreSallesDeBain" INTEGER,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "imageUrl" TEXT,
    "auteur" TEXT,
    "tags" TEXT[],
    "publie" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_requests" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "sujet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "paysResidence" TEXT,
    "traite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_requests_pkey" PRIMARY KEY ("id")
);
