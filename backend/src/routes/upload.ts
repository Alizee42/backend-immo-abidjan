import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new Error('Format non supporté (jpg, png ou webp uniquement)'));
    }
    cb(null, true);
  },
});

router.post('/', requireAuth, upload.array('photos', 12), async (req, res) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  // En production, les photos sont servies via le relais Netlify (PUBLIC_URL)
  const baseUrl = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  const urls = files.map((f) => `${baseUrl}/uploads/${f.filename}`);
  res.status(201).json({ urls });
});

export default router;
