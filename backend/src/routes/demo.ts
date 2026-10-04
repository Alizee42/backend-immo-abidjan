import { Router } from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

// Indique au front s'il doit afficher le bandeau « Site de démonstration »
router.get('/', async (_req, res) => {
  const [biens, articles] = await Promise.all([
    prisma.property.count({ where: { demo: true } }),
    prisma.article.count({ where: { demo: true } }),
  ]);
  res.json({ actif: biens + articles > 0 });
});

// Supprime uniquement le contenu marqué demo, jamais les vrais biens et articles
router.delete('/', requireAuth, async (_req, res) => {
  const [biens, articles] = await Promise.all([
    prisma.property.deleteMany({ where: { demo: true } }),
    prisma.article.deleteMany({ where: { demo: true } }),
  ]);
  res.json({ biens: biens.count, articles: articles.count });
});

export default router;
