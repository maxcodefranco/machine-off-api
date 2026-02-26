# Autorização — CASL

Sistema de controle de acesso baseado em [CASL](https://casl.js.org/) (v6) com suporte a roles, permissões granulares e condições de ownership.

## Arquitetura

```
src/shared/authorization/
├── authorization.module.ts         # Módulo NestJS exportável
├── casl-ability.factory.ts         # Fábrica que cria Ability por usuário
├── policies.guard.ts               # Guard que verifica permissões nas rotas
├── check-policies.decorator.ts     # Decorator @CheckPolicies()
├── policy-handler.interface.ts     # Tipos AppAbility, PolicyHandler
└── index.ts                        # Barrel export
```

## Roles

### `admin` — Organizador do Evento

- Acesso via rotas `/admin/*`
- Permissão `manage` em todos os recursos (CRUD completo)
- Identificado por autenticação administrativa (e.g., JWT com `role: admin`)

### `invitee` — Convidado

- Acesso via rotas `/app/*`
- Permissão limitada aos próprios dados, vinculados ao seu código de convite
- Identificado pelo código de convite, que resolve `eventId`, `invitationId` e `participantId`

## Subjects (Recursos)

| Subject               | Descrição                                       |
|-----------------------|-------------------------------------------------|
| `Event`               | Evento do sistema                               |
| `Invitation`          | Convite com código único                        |
| `Participant`         | Participante confirmado (vinculado a um convite)|
| `Guest`               | Acompanhante de um participante                 |
| `CustomField`         | Campo personalizado definido pelo admin         |
| `CustomFieldResponse` | Resposta a um campo personalizado               |

## Actions (Ações)

| Action   | Descrição                                      |
|----------|-------------------------------------------------|
| `manage` | Permissão total (inclui create, read, update, delete) |
| `create` | Criar recurso                                  |
| `read`   | Ler/listar recurso                             |
| `update` | Atualizar recurso                              |
| `delete` | Deletar recurso                                |

## Matriz de Permissões

| Subject               | admin        | invitee                                  |
|-----------------------|--------------|------------------------------------------|
| **Event**             | `manage`     | `read` (apenas o próprio evento)         |
| **Invitation**        | `manage`     | `read` (apenas o próprio convite)        |
| **Participant**       | `read`       | `create`, `read`, `update` (próprio, via `invitationId`) |
| **Guest**             | `read`       | `create`, `read`, `update`, `delete` (próprios, via `participantId`) |
| **CustomField**       | `manage`     | `read` (campos do próprio evento)        |
| **CustomFieldResponse** | `read`     | `create`, `read`, `update` (próprias, via `participantId`) |

## Condições de Ownership (invitee)

O invitee só acessa dados vinculados ao seu contexto. As condições são aplicadas automaticamente pelo CASL:

```typescript
// Contexto extraído do token/sessão do invitee
interface InviteeContext {
  eventId: string;       // ID do evento vinculado ao convite
  invitationId: string;  // ID do convite
  participantId?: string; // ID do participante (se já confirmou presença)
}
```

| Condição                    | Aplicada a                              |
|-----------------------------|-----------------------------------------|
| `{ id: eventId }`          | Event                                   |
| `{ id: invitationId }`     | Invitation                              |
| `{ invitationId }`         | Participant                             |
| `{ participantId }`        | Guest, CustomFieldResponse              |
| `{ eventId }`              | CustomField                             |

> **Nota**: Guest e CustomFieldResponse só são acessíveis quando o `participantId` está presente no contexto (i.e., o invitee já confirmou presença).

## Como Funciona

### 1. CaslAbilityFactory

Cria uma instância de `AppAbility` baseada no `AuthUser`:

```typescript
import { CaslAbilityFactory, AuthUser } from './shared/authorization/index.js';

const user: AuthUser = {
  role: Role.invitee,
  context: {
    eventId: 'evt_123',
    invitationId: 'inv_456',
    participantId: 'prt_789',
  },
};

const ability = factory.createForUser(user);
ability.can(Action.read, 'Event');   // true (com condição id === eventId)
ability.can(Action.delete, 'Event'); // false
```

### 2. PoliciesGuard

Guard NestJS que intercepta requisições e verifica permissões:

1. Lê `request.user` (populado por um auth guard anterior na pipeline)
2. Cria a `AppAbility` via `CaslAbilityFactory`
3. Executa os policy handlers definidos no decorator `@CheckPolicies()`
4. Retorna `true` se **todos** os handlers passarem, `false` caso contrário

> Se nenhum `@CheckPolicies()` estiver definido na rota, o guard permite o acesso (pass-through).

### 3. @CheckPolicies() Decorator

Decorator que define as regras de acesso para cada rota:

```typescript
@Controller('app/guests')
@UseGuards(PoliciesGuard)
export class AppGuestsController {

  @Post()
  @CheckPolicies((ability) => ability.can(Action.create, 'Guest'))
  async createGuest(@Body() input: CreateGuestDto) { ... }

  @Get('by-participant/:participantId')
  @CheckPolicies((ability) => ability.can(Action.read, 'Guest'))
  async listByParticipant(@Param('participantId') id: string) { ... }
}
```

### 4. Requisito: request.user

O `PoliciesGuard` espera que `request.user` seja um objeto `AuthUser`:

```typescript
interface AuthUser {
  role: Role;             // 'admin' | 'invitee'
  context?: InviteeContext; // obrigatório quando role === 'invitee'
}
```

Esse objeto deve ser populado por um auth guard anterior (e.g., JWT guard, session guard) que resolve o token/código de convite e injeta os dados no request.

## Mapa de Rotas × Permissões

### Admin Controllers

| Rota                              | Action   | Subject               |
|-----------------------------------|----------|-----------------------|
| `POST /admin/events`             | `create` | `Event`               |
| `PATCH /admin/events/:id`        | `update` | `Event`               |
| `GET /admin/events/:id`          | `read`   | `Event`               |
| `GET /admin/events`              | `read`   | `Event`               |
| `POST /admin/invitations`        | `create` | `Invitation`          |
| `PATCH /admin/invitations/:id/deactivate` | `update` | `Invitation` |
| `GET /admin/invitations/:id`     | `read`   | `Invitation`          |
| `GET /admin/invitations`         | `read`   | `Invitation`          |
| `GET /admin/participants/:id`    | `read`   | `Participant`         |
| `GET /admin/participants`        | `read`   | `Participant`         |
| `GET /admin/guests`              | `read`   | `Guest`               |
| `POST /admin/custom-fields`      | `create` | `CustomField`         |
| `PATCH /admin/custom-fields/:id` | `update` | `CustomField`         |
| `DELETE /admin/custom-fields/:id`| `delete` | `CustomField`         |
| `GET /admin/custom-fields`       | `read`   | `CustomField`         |
| `GET /admin/custom-fields/:id/responses` | `read` | `CustomFieldResponse` |

### App Controllers

| Rota                                           | Action   | Subject               |
|------------------------------------------------|----------|-----------------------|
| `GET /app/events/by-invitation/:code`         | `read`   | `Event`               |
| `GET /app/invitations/lookup/:code`           | `read`   | `Invitation`          |
| `POST /app/participants`                       | `create` | `Participant`         |
| `PATCH /app/participants/:id`                  | `update` | `Participant`         |
| `GET /app/participants/by-invitation/:code`   | `read`   | `Participant`         |
| `POST /app/guests`                             | `create` | `Guest`               |
| `PATCH /app/guests/:id`                        | `update` | `Guest`               |
| `DELETE /app/guests/:id`                       | `delete` | `Guest`               |
| `GET /app/guests/by-participant/:participantId` | `read` | `Guest`               |
| `POST /app/custom-fields/responses`            | `create` | `CustomFieldResponse` |
| `GET /app/custom-fields/by-event/:eventId`    | `read`   | `CustomField`         |
| `GET /app/custom-fields/responses/by-participant/:participantId` | `read` | `CustomFieldResponse` |

## Como Adicionar um Novo Role

1. Adicione o novo valor ao enum `Role` em `src/domain/enums/role.enum.ts`
2. Adicione as regras no `CaslAbilityFactory.createForUser()`:

```typescript
if (user.role === Role.novoRole) {
  can(Action.read, 'Event');
  can(Action.read, 'Participant', { eventId: user.context?.eventId });
  // ... demais regras
}
```

3. Documente as permissões na matriz acima

## Como Adicionar um Novo Subject

1. Adicione o nome do subject no tipo `Subjects` em `policy-handler.interface.ts`:

```typescript
type Subjects =
  | 'Event'
  | 'Invitation'
  | 'NovoSubject'  // ← adicione aqui
  | 'all';
```

2. Defina as regras para cada role no `CaslAbilityFactory`
3. Use `@CheckPolicies()` nos controllers correspondentes
4. Documente na matriz de permissões

## Reutilização no Frontend

O CASL pode ser reutilizado no frontend com `@casl/ability` e `@casl/react` (ou similar). A mesma lógica da factory pode ser replicada:

```typescript
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

// Recriar as mesmas regras do backend com base no user recebido da API
function defineAbilityFor(user: { role: string; context?: InviteeContext }) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === 'admin') {
    can('manage', 'all');
  }

  if (user.role === 'invitee' && user.context) {
    can('read', 'Event', { id: user.context.eventId });
    can('read', 'Invitation', { id: user.context.invitationId });
    // ... mesmas regras do backend
  }

  return build();
}

// Uso em componentes
const ability = defineAbilityFor(currentUser);
if (ability.can('create', 'Guest')) {
  // renderizar botão "Adicionar acompanhante"
}
```

> **Dica**: Mantenha as regras de permissão sincronizadas entre backend e frontend. Uma abordagem é exportar uma função compartilhada (e.g., em um pacote `shared`) ou gerar as regras via API endpoint.
