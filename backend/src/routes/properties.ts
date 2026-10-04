import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';
import type { Prisma, Property } from '@prisma/client';

const router = Router();

function serialize(property: Property) {
  return { ...property, prix: Number(property.prix) };
}

const propertyTypeSchema = z.enum(['VENTE', 'LOCATION', 'LOCATION_VENTE']);
const propertyStatusSchema = z.enum(['DISPONIBLE', 'RESERVE', 'VENDU', 'LOUE']);
const categorieSchema = z.enum(['TERRAIN_VIABILISE', 'MAISON_CLES_EN_MAIN']);
const avancementSchema = z.enum(['LIVRE', 'EN_TRAVAUX', 'PREVU']);
const quartierSchema = z.enum(['QUARTIER_1', 'QUARTIER_2', 'QUARTIER_3']);

const propertyInputSchema = z.object({
  titre: z.string().min(1),
  description: z.string().optional(),
  type: propertyTypeSchema,
  status: propertyStatusSchema,
  categorie: categorieSchema.optional(),
  avancement: avancementSchema.optional(),
  quartier: quartierSchema,
  superficie: z.number().optional(),
  prix: z.number().positive(),
  nombreChambres: z.number().int().nullable().optional(),
  nombreSallesDeBain: z.number().int().nullable().optional(),
  photos: z.array(z.string()).optional(),
});

router.get('/', async (req, res) => {
  const query = z
    .object({
      type: propertyTypeSchema.optional(),
      quartier: quartierSchema.optional(),
      status: propertyStatusSchema.optional(),
      categorie: categorieSchema.optional(),
      avancement: avancementSchema.optional(),
      tri: z.enum(['recent', 'prix_asc', 'prix_desc']).optional(),
    })
    .safeParse(req.query);

  if (!query.success) {
    return res.status(400).json({ error: 'Paramètres de filtre invalides' });
  }

  const { tri, ...filtres } = query.data;
  const ordreSecondaire: Prisma.PropertyOrderByWithRelationInput =
    tri === 'prix_asc' ? { prix: 'asc' } : tri === 'prix_desc' ? { prix: 'desc' } : { createdAt: 'desc' };

  // L'enum status suit l'ordre de déclaration : disponibles, puis réservés, puis vendus et loués
  const properties = await prisma.property.findMany({
    where: filtres,
    orderBy: [{ status: 'asc' }, ordreSecondaire],
  });
  res.json(properties.map(serialize));
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return res.status(404).json({ error: 'Bien introuvable' });
  res.json(serialize(property));
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = propertyInputSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const property = await prisma.property.create({ data: parsed.data });
  res.status(201).json(serialize(property));
});

router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  const parsed = propertyInputSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  try {
    const property = await prisma.property.update({ where: { id }, data: parsed.data });
    res.json(serialize(property));
  } catch {
    res.status(404).json({ error: 'Bien introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  try {
    await prisma.property.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Bien introuvable' });
  }
});

export default router;
