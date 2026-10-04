import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(1),
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Email ou mot de passe invalide' });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return res.status(500).json({ error: 'JWT_SECRET non configuré côté serveur' });

  const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (!user) return res.status(401).json({ error: 'Identifiants incorrects' });

  const motDePasseValide = await bcrypt.compare(parsed.data.motDePasse, user.passwordHash);
  if (!motDePasseValide) return res.status(401).json({ error: 'Identifiants incorrects' });

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, utilisateur: { id: user.id, email: user.email, nom: user.nom } });
});

router.get('/moi', requireAuth, async (req, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.admin!.userId } });
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json({ id: user.id, email: user.email, nom: user.nom });
});

export default router;
