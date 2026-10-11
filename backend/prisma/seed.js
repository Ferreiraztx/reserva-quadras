// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajuste os nomes dos campos/modelo conforme seu schema.prisma
  const diasSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
  ];

  for (const dia of diasSemana) {
    // Exemplo básico: ajuste de acordo com o seu modelo Prisma de Horário/Funcionamento
    /*
    await prisma.businessHour.upsert({
      where: { day: dia },
      update: {},
      create: {
        day: dia,
        openTime: '08:00',
        closeTime: '22:00',
        active: true,
      },
    });
    */
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });