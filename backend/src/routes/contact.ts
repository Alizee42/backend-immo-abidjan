import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const contactInputSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  sujet: z.string().min(1),
  message: z.string().min(20),
  paysResidence: z.string().optional(),
});

router.post('/', async (req, res) => {
  const parsed = contactInputSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  await prisma.contactRequest.create({ data: parsed.data });
  res.status(200).send('Votre demande a été envoyée avec succès.');
});

router.get('/', requireAuth, async (_req, res) => {
  const demandes = await prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(demandes);
});

router.patch('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = z.object({ traite: z.boolean() }).safeParse(req.body);
  if (!Number.isInteger(id) || !parsed.success) return res.status(400).json({ error: 'Requête invalide' });

  try {
    res.json(await prisma.contactRequest.update({ where: { id }, data: parsed.data }));
  } catch {
    res.status(404).json({ error: 'Demande introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  try {
    await prisma.contactRequest.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Demande introuvable' });
  }
});

export default router;
