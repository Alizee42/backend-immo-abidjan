-- CreateTable
CREATE TABLE "contenus" (
    "cle" TEXT NOT NULL,
    "valeur" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contenus_pkey" PRIMARY KEY ("cle")
);
