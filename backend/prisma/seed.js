// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dias = [0, 1, 2, 3, 4, 5, 6]; // 0 = Domingo, 6 = Sábado

  for (const dia of dias) {
    await prisma.horarioFuncionamento.upsert({
      where: { diaSemana: dia },
      update: {},
      create: {
        diaSemana: dia,
        ativo: true,
        horaAbertura: "08:00",
        horaFechamento: "23:00",
      },
    });
  }

  console.log('Horários de funcionamento inicializados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });