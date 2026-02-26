# Modules Architecture Patterns

## 1. Glossário

| Termo                       | Descrição                                   | Exemplos                               |
| --------------------------- | ------------------------------------------- | -------------------------------------- |
| **management-scope**        | Escopo de gerenciamento do recurso          | `admin`, `app`, `kernel`               |
| **context**                 | Domínio específico do módulo                | `accounts`, `education`, `integration` |
| **resource**                | Recurso específico do módulo                | `users`, `classrooms`, `courses`       |
| **resource-use-case**       | Caso de uso específico do recurso           | `create-user`, `fetch-classroom`       |
| **event-bus**               | Estrutura de eventos do recurso             | `events`, `consumers`, `listeners`     |
| **resource-event-use-case** | Caso de uso específico do evento do recurso | `user-created`, `classroom-updated`    |

> **Nota:** Consumers utilizam controllers de microservices do NestJS. Listeners utilizam EventsHandler do CQRS do NestJS.

---

## 2. Estrutura de Diretórios

```text
src/
  modules/
    {context}/
        {resource}/
            {management-scope}/
                commands/
                    commands.ts
                    {resource-use-case}.handler.ts
                queries/
                    queries.ts
                    {resource-use-case}.handler.ts
                services/
                    {resource-use-case}.service.ts
                validators/
                    {resource-use-case}.validator.ts
                utils/
                    {utility-group-name}.util.ts
                dto/
                    dto.ts                                # DTOs genéricos do resource
                    {resource-use-case}.dto.ts            # DTOs de caso de uso
                    types.ts                              # Types e enums específicos
                {management-scope}-{resource}.controller.ts
                {management-scope}-{resource}.module.tscompartilhadas do resource
            events-bus/
                consumers/
                {resource-event-use-case}.consumer.ts
                listeners/
                {resource-event-use-case}.listener.ts
                events.ts
```

---

## 3. Diretrizes Gerais

- Sempre inclua `index.ts` para exportar todos os membros públicos sempre que qualquer arquivo dentro do diretório for modificado
- Use PascalCase para nomes de classes com prefixo do management-scope
- Mantenha DTOs separados da lógica de negócio

---

## 4. DTOs

### 4.1 DTOs Genéricos do Resource

**Arquivo:** `src/modules/{context}/{resource}/{management-scope}/dto/dto.ts`

Usado para definir DTOs genéricos do recurso.

**Convenção de Nomenclatura:**

- `{ManagementScope}{Resource}Dto`

**Exemplo:**

```ts
export class AdminUserDto {
  id: string;
  email: string;
  // ...
}

export class KernelClassroomDto {
  id: string;
  name: string;
  // ...
}
```

### 4.2 DTOs de Caso de Uso

**Arquivo:** `src/modules/{context}/{resource}/{management-scope}/dto/{resource-use-case}.dto.ts`

Usado para definir DTOs específicos para casos de uso do recurso.

**Convenção de Nomenclatura:**

- Input: `{ManagementScope}{ResourceUseCase}InputDto`
- Output: `{ManagementScope}{ResourceUseCase}OutputDto`

**Diretrizes:**

- Use decorators do `class-validator` para validação de input
- Componha DTOs de caso de uso utilizando DTOs genéricos do recurso

**Exemplo:**

```ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminCreateUserInputDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}

export class AdminCreateUserOutputDto {
  id: string;
  createdAt: Date;
}
```

---

## 5. Types

**Arquivo:** `src/modules/{context}/{resource}/{management-scope}/dto/types.ts`

Define types e enums específicos do management-scope. **Os enums devem ser extensões dos enums da camada domain** (`src/domain`).

**Diretrizes:**

- Prefira **estender** enums existentes do domain ao invés de criar novos
- Use `types.ts` apenas para types específicos que não existem no domain
- Interfaces de contexto interno do service devem permanecer no próprio service

**Convenção de Nomenclatura:**

- Enums: `{ManagementScope}{Resource}{EnumName}`
- Interfaces/Types: `{ManagementScope}{Resource}{TypeName}`

**Exemplo - Extensão de Enum do Domain:**

```ts
// src/modules/accounts/users/admin/dto/types.ts
import { UserStatus as DomainUserStatus } from 'src/domain';

// Extensão do enum do domain com valores específicos do management-scope
export enum AdminUserStatus {
  // Valores herdados do domain
  active = DomainUserStatus.active,
  inactive = DomainUserStatus.inactive,

  // Valores específicos do admin scope
  pending_approval = 'pending_approval',
  suspended = 'suspended',
}

// Type específico que não existe no domain
export interface AdminUserFilterOptions {
  includeInactive?: boolean;
  onlyPendingApproval?: boolean;
}
```

**Quando NÃO usar types.ts:**

- Interfaces de contexto interno do service (ex: `CreateUserContext`) devem permanecer no service
- DTOs devem ir no `dto/`
- Enums já existentes no domain não precisam ser re-exportados

---

## 6. Commands & Queries (CQRS)

- **Arquivo:** `src/modules/{context}/{resource}/{management-scope}/commands/commands.ts`
- **Arquivo:** `src/modules/{context}/{resource}/{management-scope}/queries/queries.ts`

### 5.1 Definições de Tipos

**Convenção de Nomenclatura:**

- Commands: `{ManagementScope}{Action}CommandInput` / `{ManagementScope}{Action}CommandOutput`
- Queries: `{ManagementScope}{Action}QueryInput` / `{ManagementScope}{Action}QueryOutput`

**Exemplo:**

```ts
// arquivo: src/modules/education/classrooms/kernel/commands/commands.ts

export class KernelProcessUserProgressCommandInput {
  userId: string;
  classroomId: string;
}

export class KernelProcessUserProgressCommandOutput {
  success: boolean;
}
```

```ts
// arquivo: src/modules/education/users/admin/queries/queries.ts

export class AdminFetchUserDetailsQueryInput {
  userId: string;
}

export class AdminFetchUserDetailsQueryOutput {
  user: AdminUserDto;
  enrollments: AdminEnrollmentDto[];
}
```

### 5.2 Uso

- Use `CommandBus` para despachar commands
- Use `QueryBus` para despachar queries

**Exemplo:**

```ts
// Despachando um command
await this.commandBus.execute(new KernelProcessUserProgressCommand(input));

// Despachando uma query
const result = await this.queryBus.execute(
  new AdminFetchUserDetailsQuery(input),
);
```

### 5.3 Handlers

- **Arquivo:** `src/modules/{context}/{resource}/{management-scope}/commands/{resource-use-case}.handler.ts`
- **Arquivo:** `src/modules/{context}/{resource}/{management-scope}/queries/{resource-use-case}.handler.ts`

Implemente handlers de command e query estendendo `ICommandHandler` e `IQueryHandler`.

```ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  KernelProcessUserProgressCommandInput,
  KernelProcessUserProgressCommandOutput,
} from './commands/commands';
import { KernelProcessUserProgressService } from './services/process-user-progress.service';

@CommandHandler(KernelProcessUserProgressCommand)
export class KernelProcessUserProgressCommandHandler implements ICommandHandler<KernelProcessUserProgressCommand> {
  constructor(
    private readonly processUserProgressService: KernelProcessUserProgressService,
  ) {}

  async execute(
    command: KernelProcessUserProgressCommand,
  ): Promise<KernelProcessUserProgressCommandOutput> {
    const { userId, classroomId } = command;
    return this.processUserProgressService.execute({ userId, classroomId });
  }
}
```

```ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  AdminFetchUserDetailsQueryInput,
  AdminFetchUserDetailsQueryOutput,
} from './queries/queries';
import { AdminFetchUserDetailsService } from './services/v2/fetch-user-details.service';

@QueryHandler(AdminFetchUserDetailsQuery)
export class AdminFetchUserDetailsQueryHandler implements IQueryHandler<AdminFetchUserDetailsQuery> {
  constructor(
    private readonly fetchUserDetailsService: AdminFetchUserDetailsService,
  ) {}

  async execute(
    query: AdminFetchUserDetailsQuery,
  ): Promise<AdminFetchUserDetailsQueryOutput> {
    const { userId } = query;
    return this.fetchUserDetailsService.execute({ userId });
  }
}
```

---

## 6. Events

### 6.1 Definições de Eventos

**Arquivo:** `src/modules/{context}/{resource}/events/events.ts`

```ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}
```

### 6.2 Consumers (Microservices)

**Arquivo:** `src/modules/{context}/{resource}/events/consumers/{resource-event}.consumer.ts`

Usado para comunicação entre serviços via filas de mensagens.

```ts
@Controller()
export class UserCreatedConsumer {
  @MessagePattern('user.created')
  async handle(data: UserCreatedEvent) {
    // Tratar evento
  }
}
```

### 6.3 Emitindo Eventos para Microservices

Para emitir eventos para microservices, use o `ClientProxy` do `@nestjs/microservices`.

```ts
import { ClientProxy } from '@nestjs/microservices';
import { UserCreatedEvent } from 'src/modules/{context}/{resource}/events/events';

export class UserCreatedEmitter {
  constructor(private readonly client: ClientProxy) {}

  async emitUserCreatedEvent(userId: string, email: string) {
    const event = new UserCreatedEvent(userId, email);
    await this.client.emit('user.created', event).toPromise();
  }
}
```

### 6.4 Listeners (In-Process)

**Arquivo:** `src/modules/{context}/{resource}/events/listeners/{resource-event}.listener.ts`

Usado para tratamento de eventos in-process via EventBus do NestJS.

```ts
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedListener implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent) {
    // Tratar evento
  }
}
```

### 6.5 Publicando Eventos In-Process

Para publicar eventos in-process, use o `EventBus` do `@nestjs/cqrs`.

```ts
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/modules/{context}/{resource}/events/events';

export class UserCreatedPublisherExample {
  constructor(private readonly eventBus: EventBus) {}

  publishUserCreatedEvent(userId: string, email: string) {
    const event = new UserCreatedEvent({
      userId,
      email,
    });

    this.eventBus.publish(event);
  }
}
```

**Diretrizes para Eventos:**

- Use sempre o primeiro parâmetro na construção do evento passando um objeto com as propriedades do evento
- Use sempre o método `publish` do `EventBus` para publicar o evento
