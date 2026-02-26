import { DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity.js';
import { InvitationEntity } from './entities/invitation.entity.js';
import { ParticipantEntity } from './entities/participant.entity.js';
import { GuestEntity } from './entities/guest.entity.js';
import { CustomFieldEntity } from './entities/custom-field.entity.js';
import { CustomFieldResponseEntity } from './entities/custom-field-response.entity.js';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'machine_off',
  entities: [
    EventEntity,
    InvitationEntity,
    ParticipantEntity,
    GuestEntity,
    CustomFieldEntity,
    CustomFieldResponseEntity,
  ],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  console.log('Database connected. Seeding data...');

  // Truncate in correct order to respect FK constraints
  await dataSource.query('TRUNCATE TABLE custom_field_responses CASCADE');
  await dataSource.query('TRUNCATE TABLE guests CASCADE');
  await dataSource.query('TRUNCATE TABLE participants CASCADE');
  await dataSource.query('TRUNCATE TABLE custom_fields CASCADE');
  await dataSource.query('TRUNCATE TABLE invitations CASCADE');
  await dataSource.query('TRUNCATE TABLE events CASCADE');
  console.log('Tables truncated.');

  const eventRepo = dataSource.getRepository(EventEntity);
  const invitationRepo = dataSource.getRepository(InvitationEntity);
  const participantRepo = dataSource.getRepository(ParticipantEntity);
  const guestRepo = dataSource.getRepository(GuestEntity);
  const customFieldRepo = dataSource.getRepository(CustomFieldEntity);

  // ─── Event ───────────────────────────────────────────────────────────────
  const event = eventRepo.create({
    name: 'Machine.off — Edição #1',
    location: 'Sítio Recanto Verde, Estrada Municipal 140, km 8 — Atibaia, SP',
    startDate: new Date('2026-05-17T00:00:00.000Z'),
    endDate: null,
    startTime: '09:00',
    endTime: '22:00',
    orientacoes: `## Como funciona o Machine.off?

O **Machine.off** é um retiro desconectado de tecnologia para desenvolvedores, designers e entusiastas de produto. A ideia é simples: deixar as máquinas de lado por um dia inteiro e recuperar o prazer das conversas presenciais, da natureza e do descanso real.

### Programação do dia

| Horário       | Atividade                                      |
|---------------|------------------------------------------------|
| 09:00 – 10:00 | Chegada, café da manhã e integração            |
| 10:00 – 12:00 | Dinâmica de abertura e rodadas de conversa     |
| 12:00 – 14:00 | **Almoço coletivo** (buffet incluso)           |
| 14:00 – 16:30 | Atividades ao ar livre e tempo livre           |
| 16:30 – 17:00 | Palestra-relâmpago: *"Slow Tech"*              |
| 17:00 – 19:00 | Momento de reflexão e escrita criativa         |
| 19:00 – 22:00 | **Jantar** e encerramento com fogueira         |

### Regras do retiro

- Celulares devem permanecer guardados em envelopes lacrados durante todo o evento.
- Laptops e tablets **não são permitidos** nas áreas comuns.
- Fotografias só são permitidas nos momentos autorizados pelo facilitador.
- O respeito ao espaço coletivo e à natureza é fundamental.

### Custo e política de reembolso

- A participação é **gratuita** para convidados selecionados.
- Em caso de desistência com menos de 7 dias de antecedência, aplicamos uma taxa simbólica de R$ 50,00 para cobrir custos operacionais.
- Convidados que trouxerem acompanhantes sem aviso prévio podem ter o acesso negado.

---

## O espaço

O Sítio Recanto Verde fica localizado a 85 km de São Paulo, em meio à Serra da Mantiqueira. O local possui 40 hectares de mata nativa, trilhas sinalizadas, piscina natural e estrutura completa para eventos.

### Instalações disponíveis

- **Salão principal** com capacidade para 60 pessoas, cadeiras e mesas rústicas
- **Cozinha industrial** operada por equipe contratada — sem acesso ao público
- **Área de fogueira** com bancos ao redor, cobertura parcial contra chuva
- **Piscina natural** com monitoramento de pH e temperatura (abertura às 14h)
- **Banheiros externos** masculinos e femininos com chuveiros aquecidos
- **Estacionamento** com capacidade para 30 veículos

### Como chegar

**De carro:** Pegue a Rodovia Fernão Dias (BR-381) sentido Campinas, saia no km 60 em direção a Atibaia. Siga pela Estrada Municipal 140 por 8 km. O sítio fica à direita, portão azul.

**Transporte coletivo:** Haverá um van saindo da estação de metrô Tietê às 07h30. Reserve sua vaga ao confirmar presença.

### Contato do local

Em caso de emergência no dia do evento, entre em contato com a organização pelo WhatsApp disponível no e-mail de confirmação.
`,
    deadline: new Date('2026-05-10T23:59:59.000Z'),
    pricingType: 'split',
    pricingValue: null,
    links: {
      whatsapp: 'https://wa.me/5511999990000',
      maps: 'https://maps.google.com/?q=Sitio+Recanto+Verde+Atibaia',
    },
  });
  const savedEvent = await eventRepo.save(event);
  console.log(`Event created: ${savedEvent.id}`);

  // ─── Custom Field ─────────────────────────────────────────────────────────
  const imageConsentField = customFieldRepo.create({
    eventId: savedEvent.id,
    key: 'image_consent',
    label: 'Autorizo o uso da minha imagem em materiais de divulgação do evento',
    type: 'boolean',
    required: true,
    options: null,
    order: 1,
  });
  const savedField = await customFieldRepo.save(imageConsentField);
  console.log(`Custom field created: ${savedField.id}`);

  // ─── Invitations ─────────────────────────────────────────────────────────
  const invJoao = invitationRepo.create({
    eventId: savedEvent.id,
    code: 'MACHOFF-JOAO',
    guestName: 'João Mendes',
    guestPhone: '+5511987654321',
    status: 'active',
  });

  const invMaria = invitationRepo.create({
    eventId: savedEvent.id,
    code: 'MACHOFF-MARIA',
    guestName: 'Maria Oliveira',
    guestPhone: '+5511976543210',
    status: 'active',
  });

  const invCarlos = invitationRepo.create({
    eventId: savedEvent.id,
    code: 'MACHOFF-CARLOS',
    guestName: 'Carlos Souza',
    guestPhone: '+5511965432109',
    status: 'active',
  });

  const invAna = invitationRepo.create({
    eventId: savedEvent.id,
    code: 'MACHOFF-ANA',
    guestName: 'Ana Paula Costa',
    guestPhone: null,
    status: 'active',
  });

  const invPedro = invitationRepo.create({
    eventId: savedEvent.id,
    code: 'MACHOFF-PEDRO',
    guestName: 'Pedro Alves',
    guestPhone: '+5511954321098',
    status: 'inactive',
  });

  const [savedJoao, savedMaria, savedCarlos, savedAna, savedPedro] =
    await invitationRepo.save([invJoao, invMaria, invCarlos, invAna, invPedro]);
  console.log(
    `Invitations created: ${savedJoao.id}, ${savedMaria.id}, ${savedCarlos.id}, ${savedAna.id}, ${savedPedro.id}`,
  );

  // ─── Participant for Maria ────────────────────────────────────────────────
  const participant = participantRepo.create({
    invitationId: savedMaria.id,
    name: 'Maria Oliveira',
    document: '123.456.789-00',
    email: 'maria.oliveira@email.com',
    phone: '+5511976543210',
    shifts: ['lunch', 'dinner'],
    acceptsImageUsage: true,
    hasDietaryRestriction: true,
    dietaryRestrictionDescription: 'Intolerância a lactose',
  });
  const savedParticipant = await participantRepo.save(participant);
  console.log(`Participant created: ${savedParticipant.id}`);

  // ─── Guests for Maria ─────────────────────────────────────────────────────
  const guestLucas = guestRepo.create({
    participantId: savedParticipant.id,
    name: 'Lucas Oliveira',
    isChild: true,
    age: 8,
    hasDietaryRestriction: false,
    dietaryRestrictionDescription: null,
  });

  const guestRoberto = guestRepo.create({
    participantId: savedParticipant.id,
    name: 'Roberto Ferreira',
    isChild: false,
    age: null,
    hasDietaryRestriction: true,
    dietaryRestrictionDescription: 'Vegetariano — sem carnes ou derivados de peixe',
  });

  const [savedLucas, savedRoberto] = await guestRepo.save([guestLucas, guestRoberto]);
  console.log(`Guests created: ${savedLucas.id}, ${savedRoberto.id}`);

  console.log('Seed completed successfully.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
