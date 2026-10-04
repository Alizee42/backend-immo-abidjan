import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import propertiesRouter from './routes/properties.js';
import articlesRouter from './routes/articles.js';
import contactRouter from './routes/contact.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import demoRouter from './routes/demo.js';
import contenusRouter from './routes/contenus.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT ?? 8081;
// Plusieurs origines possibles, séparées par des virgules
const corsOrigin = (process.env.CORS_ORIGIN ?? 'http://localhost:4200').split(',').map((o) => o.trim());

// Derrière Nginx : req.protocol vaut https, utilisé pour construire les URL des photos
app.set('trust proxy', 1);
app.use(cors({ origin: corsOrigin, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/properties', propertiesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/demo', demoRouter);
app.use('/api/contenus', contenusRouter);

app.listen(port, () => {
  console.log(`API SCI-AGD disponible sur http://localhost:${port}`);
});
