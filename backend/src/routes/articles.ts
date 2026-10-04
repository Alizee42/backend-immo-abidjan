import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const articleInputSchema = z.object({
  titre: z.string().min(1),
  contenu: z.string().min(1),
  resume: z.string().min(1),
  imageUrl: z.string().optional(),
  auteur: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publie: z.boolean().optional(),
});

router.get('/', async (_req, res) => {
  const articles = await prisma.article.findMany({
    where: { publie: true },
    orderBy: { publishedAt: 'desc' },
  });
  res.json(articles);
});

router.get('/admin', requireAuth, async (_req, res) => {
  const articles = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' } });
  res.json(articles);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  const article = await prisma.article.findFirst({ where: { id, publie: true } });
  if (!article) return res.status(404).json({ error: 'Article introuvable' });
  res.json(article);
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = articleInputSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const article = await prisma.article.create({ data: parsed.data });
  res.status(201).json(article);
});

router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  const parsed = articleInputSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  try {
    const article = await prisma.article.update({ where: { id }, data: parsed.data });
    res.json(article);
  } catch {
    res.status(404).json({ error: 'Article introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Id invalide' });

  try {
    await prisma.article.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: 'Article introuvable' });
  }
});

export default router;
