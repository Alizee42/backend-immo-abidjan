import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const motDePasse = process.argv[3];
  const nom = process.argv[4] ?? 'Admin';

  if (!email || !motDePasse) {
    console.error('Usage: tsx prisma/create-admin.ts <email> <mot-de-passe> [nom]');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(motDePasse, 10);
  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, nom },
    create: { email, passwordHash, nom },
  });

  console.log(`Utilisateur admin prêt : ${user.email} (id ${user.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
