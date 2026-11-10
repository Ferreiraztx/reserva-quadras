const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Populando horários de funcionamento...');

  // 0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado
  const horaiosPadrao = [
    { diaSemana: 0, ativo: true, horaAbertura: '08:00', horaFechamento: '22:00' }, // Domingo
    { diaSemana: 1, ativo: true, horaAbertura: '08:00', horaFechamento: '23:00' }, // Segunda
    { diaSemana: 2, ativo: true, horaAbertura: '08:00', horaFechamento: '23:00' }, // Terça
    { diaSemana: 3, ativo: true, horaAbertura: '08:00', horaFechamento: '23:00' }, // Quarta
    { diaSemana: 4, ativo: true, horaAbertura: '08:00', horaFechamento: '23:00' }, // Quinta
    { diaSemana: 5, ativo: true, horaAbertura: '08:00', horaFechamento: '23:00' }, // Sexta
    { diaSemana: 6, ativo: true, horaAbertura: '08:00', horaFechamento: '22:00' }, // Sábado
  ];

  for (const h of horaiosPadrao) {
    await prisma.horarioFuncionamento.upsert({
      where: { diaSemana: h.diaSemana }, // Usa o diaSemana que é @unique no teu schema
      update: {
        ativo: h.ativo,
        horaAbertura: h.horaAbertura,
        horaFechamento: h.horaFechamento,
      },
      create: {
        diaSemana: h.diaSemana,
        ativo: h.ativo,
        horaAbertura: h.horaAbertura,
        horaFechamento: h.horaFechamento,
      },
    });
  }

  console.log('✅ Horários de funcionamento registados com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });