// Unique jeu de données du site SCI-AGD : biens et articles de démonstration (marqués demo).
//   npm run prisma:seed / npm run demo:seed → (re)charge les biens et articles de démo
//   npm run demo:purge                      → supprime uniquement le contenu marqué demo, jamais les vrais biens
import { PrismaClient, type Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const IMG = {
  maison: ['/images/demo/maison-1.jpg', '/images/demo/maison-2.jpg', '/images/demo/maison-3.jpg', '/images/demo/maison-4.jpg', '/images/demo/maison-5.jpg', '/images/demo/maison-6.jpg', '/images/defaut/maison.jpg'],
  terrain: ['/images/defaut/terrain.jpg', '/images/defaut/domaine.jpg', '/images/demo/viabilisation.jpg'],
  chantier: '/images/defaut/sobe-1.jpg',
  quartier: '/images/defaut/sobe-2.jpg',
};

const SUFFIXE_PREVU = ' Visuel d\'illustration, non contractuel.';

type Bien = Omit<Prisma.PropertyCreateManyInput, 'demo'>;

function maison(
  quartier: Bien['quartier'], titre: string, chambres: number, surface: number, prix: number,
  opts: Partial<Bien> & { photo: number },
): Bien {
  const { photo, ...reste } = opts;
  return {
    titre,
    description: `Maison clés en main de ${chambres} chambres sur ${surface} m² habitables, dans un quartier résidentiel du domaine de Songon Agban.`,
    type: 'VENTE',
    status: 'DISPONIBLE',
    categorie: 'MAISON_CLES_EN_MAIN',
    avancement: 'LIVRE',
    quartier,
    superficie: surface,
    prix,
    nombreChambres: chambres,
    nombreSallesDeBain: Math.max(1, chambres - 1),
    photos: [IMG.maison[photo % IMG.maison.length], IMG.maison[(photo + 3) % IMG.maison.length]],
    ...reste,
  };
}

function terrain(quartier: Bien['quartier'], surface: number, opts: Partial<Bien> & { photo: number }): Bien {
  const { photo, ...reste } = opts;
  return {
    titre: `Terrain viabilisé de ${surface} m²`,
    description: `Parcelle de ${surface} m² prête à bâtir : voirie, adduction d'eau et électricité. Idéale pour construire votre maison à Songon Agban.`,
    type: 'VENTE',
    status: 'DISPONIBLE',
    categorie: 'TERRAIN_VIABILISE',
    avancement: 'LIVRE',
    quartier,
    superficie: surface,
    prix: surface * 30000,
    photos: [IMG.terrain[photo % IMG.terrain.length]],
    ...reste,
  };
}

const biens: Bien[] = [
  // SOBE 1 : premier quartier, biens livrés
  maison('QUARTIER_1', 'Villa 4 chambres avec jardin — SOBE 1', 4, 220, 72000000, { photo: 0 }),
  maison('QUARTIER_1', 'Maison 3 chambres plain-pied — SOBE 1', 3, 160, 48000000, { photo: 1 }),
  maison('QUARTIER_1', 'Maison 3 chambres — SOBE 1', 3, 150, 250000, { photo: 2, type: 'LOCATION', description: 'Maison de 3 chambres à louer, livrée et prête à habiter, dans le premier quartier du domaine.' }),
  maison('QUARTIER_1', 'Maison 2 chambres — SOBE 1', 2, 110, 150000, { photo: 3, type: 'LOCATION', status: 'LOUE' }),
  maison('QUARTIER_1', 'Maison 4 chambres en location-vente — SOBE 1', 4, 200, 380000, { photo: 4, type: 'LOCATION_VENTE', description: 'Devenez propriétaire progressivement : une mensualité fixe, et la maison est à vous au terme du contrat.' }),
  maison('QUARTIER_1', 'Duplex 5 chambres — SOBE 1', 5, 300, 95000000, { photo: 5, status: 'VENDU' }),
  terrain('QUARTIER_1', 500, { photo: 0 }),
  terrain('QUARTIER_1', 400, { photo: 1, status: 'RESERVE' }),

  // SOBE 2 : en travaux, réservation possible
  maison('QUARTIER_2', 'Maison 3 chambres — livraison prochaine', 3, 170, 52000000, { photo: 6, avancement: 'EN_TRAVAUX', description: 'Maison clés en main de 3 chambres actuellement en construction. Réservez dès maintenant votre future maison.' }),
  maison('QUARTIER_2', 'Villa 4 chambres — en construction', 4, 230, 75000000, { photo: 0, avancement: 'EN_TRAVAUX', photos: [IMG.chantier, IMG.maison[0]] }),
  maison('QUARTIER_2', 'Maison 3 chambres en location-vente — SOBE 2', 3, 160, 290000, { photo: 1, type: 'LOCATION_VENTE', avancement: 'EN_TRAVAUX' }),
  maison('QUARTIER_2', 'Maison 2 chambres — SOBE 2', 2, 120, 34000000, { photo: 2, avancement: 'EN_TRAVAUX', status: 'RESERVE' }),
  maison('QUARTIER_2', 'Maison 4 chambres à louer — SOBE 2', 4, 210, 350000, { photo: 3, type: 'LOCATION', avancement: 'EN_TRAVAUX' }),
  terrain('QUARTIER_2', 600, { photo: 2, avancement: 'EN_TRAVAUX', description: 'Parcelle de 600 m² en cours de viabilisation (voirie et réseaux). Réservation possible.' }),
  terrain('QUARTIER_2', 450, { photo: 2, avancement: 'EN_TRAVAUX' }),
  terrain('QUARTIER_2', 300, { photo: 0 }),

  // SOBE 3 : tranche prévue
  maison('QUARTIER_3', 'Maison 3 chambres — tranche à venir', 3, 165, 50000000, { photo: 4, avancement: 'PREVU' }),
  maison('QUARTIER_3', 'Villa 4 chambres — tranche à venir', 4, 240, 78000000, { photo: 5, avancement: 'PREVU' }),
  maison('QUARTIER_3', 'Maison 3 chambres en location-vente — SOBE 3', 3, 165, 300000, { photo: 6, type: 'LOCATION_VENTE', avancement: 'PREVU' }),
  maison('QUARTIER_3', 'Maison 2 chambres — tranche à venir', 2, 115, 33000000, { photo: 1, avancement: 'PREVU' }),
  terrain('QUARTIER_3', 500, { photo: 1, avancement: 'PREVU', photos: [IMG.quartier] }),
  terrain('QUARTIER_3', 800, { photo: 1, avancement: 'PREVU', photos: [IMG.quartier] }),
  terrain('QUARTIER_3', 350, { photo: 0, avancement: 'PREVU' }),
  terrain('QUARTIER_3', 600, { photo: 1, avancement: 'PREVU' }),
].map((b) => (b.avancement === 'PREVU' ? { ...b, description: (b.description ?? '') + SUFFIXE_PREVU } : b));

const articles: Omit<Prisma.ArticleCreateManyInput, 'demo'>[] = [
  {
    titre: 'Le domaine de Songon : 124 hectares, une vision familiale',
    resume: 'Pourquoi la famille Atchan a choisi de n\'engager que 20 hectares et de préserver le reste du domaine.',
    contenu: '<p>Le domaine de Songon couvre 124 hectares, sous ACD au nom de la famille Atchan. Plutôt que de tout engager, la SCI-AGD a choisi de mobiliser 20 hectares pour un programme immobilier maîtrisé.</p><p>Les 104 hectares restants forment une réserve foncière préservée juridiquement : un héritage protégé pour les générations futures.</p>',
    imageUrl: '/images/defaut/domaine.jpg',
    auteur: 'Équipe SCI-AGD',
    tags: ['Domaine', 'Vision'],
    publie: true,
    publishedAt: new Date('2026-09-02'),
  },
  {
    titre: 'SOBE 1, 2 et 3 : trois quartiers, un même cœur résidentiel',
    resume: 'Tour d\'horizon des trois quartiers résidentiels du programme et de leur avancement.',
    contenu: '<p>Les quartiers SOBE 1, 2 et 3 occupent 12 hectares du programme et accueilleront à terme plus de 400 logements.</p><p>SOBE 1 propose déjà des biens livrés, SOBE 2 est en travaux et SOBE 3 constitue la prochaine tranche.</p>',
    imageUrl: '/images/defaut/sobe-2.jpg',
    auteur: 'Équipe SCI-AGD',
    tags: ['SOBE', 'Programme'],
    publie: true,
    publishedAt: new Date('2026-09-10'),
  },
  {
    titre: 'Location-vente : devenir propriétaire pas à pas',
    resume: 'Comment fonctionne la location-vente et à qui elle s\'adresse.',
    contenu: '<p>La location-vente permet d\'habiter immédiatement une maison tout en la payant progressivement, par mensualités.</p><p>Au terme du contrat, vous devenez propriétaire. Une formule adaptée aux familles qui souhaitent accéder à la propriété sans apport important.</p>',
    imageUrl: '/images/demo/maison-2.jpg',
    auteur: 'Équipe SCI-AGD',
    tags: ['Location-vente', 'Conseils'],
    publie: true,
    publishedAt: new Date('2026-09-18'),
  },
  {
    titre: 'Terrain viabilisé ou maison clés en main : que choisir ?',
    resume: 'Les avantages de chaque formule selon votre projet et votre budget.',
    contenu: '<p>Le terrain viabilisé vous laisse construire à votre rythme et selon vos plans. La maison clés en main vous permet d\'emménager sans gérer de chantier.</p><p>Notre équipe vous aide à choisir la formule adaptée à votre situation.</p>',
    imageUrl: '/images/defaut/terrain.jpg',
    auteur: 'Équipe SCI-AGD',
    tags: ['Conseils'],
    publie: true,
    publishedAt: new Date('2026-09-24'),
  },
  {
    titre: 'Acheter à Songon depuis l\'étranger',
    resume: 'Les questions à se poser quand on vit en France, au Canada ou ailleurs.',
    contenu: '<p>De nombreux acquéreurs vivent hors de Côte d\'Ivoire. Avant de vous engager, renseignez-vous sur le statut du terrain, le calendrier des travaux et les modalités de paiement.</p><p>Contactez-nous : nous répondons à toutes vos questions à distance.</p>',
    imageUrl: '/images/defaut/hero-1.jpg',
    auteur: 'Équipe SCI-AGD',
    tags: ['Diaspora', 'Conseils'],
    publie: true,
    publishedAt: new Date('2026-09-30'),
  },
];

async function purger() {
  const b = await prisma.property.deleteMany({ where: { demo: true } });
  const a = await prisma.article.deleteMany({ where: { demo: true } });
  console.log(`Démo supprimée : ${b.count} biens, ${a.count} articles`);
}

async function main() {
  await purger();
  if (process.argv.includes('--purge')) return;

  await prisma.property.createMany({ data: biens.map((b) => ({ ...b, demo: true })) });
  await prisma.article.createMany({ data: articles.map((a) => ({ ...a, demo: true })) });
  console.log(`Démo chargée : ${biens.length} biens, ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
