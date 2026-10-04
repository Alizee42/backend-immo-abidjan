import { Router } from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

// Seules ces clés peuvent être lues ou écrites
const CLES = ['parametres', 'accueil', 'vision', 'a-propos'] as const;
const estCle = (cle: string): cle is (typeof CLES)[number] => (CLES as readonly string[]).includes(cle);

// Renvoie {} si rien n'a encore été enregistré : le front utilise alors ses textes par défaut
router.get('/:cle', async (req, res) => {
  const { cle } = req.params;
  if (!estCle(cle)) return res.status(404).json({ error: 'Contenu inconnu' });

  const contenu = await prisma.contenu.findUnique({ where: { cle } });
  res.json(contenu?.valeur ?? {});
});

router.put('/:cle', requireAuth, async (req, res) => {
  const { cle } = req.params;
  if (!estCle(cle)) return res.status(404).json({ error: 'Contenu inconnu' });
  if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Contenu invalide' });
  }

  const contenu = await prisma.contenu.upsert({
    where: { cle },
    update: { valeur: req.body },
    create: { cle, valeur: req.body },
  });
  res.json(contenu.valeur);
});

export default router;
