# ConnectHub

Sistema web para gerenciamento de chamados entre setores de uma organização, desenvolvido com **NestJS**, **Prisma**, **PostgreSQL** e **Next.js**.

O sistema permite a abertura de tickets entre setores, registro de serviços realizados, controle de permissões por usuário e gerenciamento do ciclo de vida dos chamados.

## Link para acesso ao projeto: 
https://connect-hub-trends-it-front-ldis.vercel.app/
- Pode haver uma leve demora para a primeira conexão ao servidor devido à hibernação da hospedagem no Render.

## Link para o repositório do Front:
https://github.com/GTorres725/ConnectHubTrendsIT-Front

## Índice

- [Telas](#telas)
- [Sobre o projeto](#sobre-o-projeto)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Manual do Sistema](#manual-do-sistema)
- [Observações](#observações)
- [Limitações desta versão](#limitações-desta-versão)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Por que essas tecnologias?](#por-que-essas-tecnologias)
- [Melhorias futuras](#melhorias-futuras)
- [Como rodar localmente](#como-rodar-localmente)
- [Considerações finais e requisitos](#considerações-finais)
  
---

# Telas

<details>
<summary>Clique para visualizar as telas do sistema</summary>

<br>

## Login

<img width="624" height="564" alt="image" src="https://github.com/user-attachments/assets/ae5e5140-58a4-4498-879f-79532f82b25d" />
<img width="532" height="821" alt="image" src="https://github.com/user-attachments/assets/d5d3ef13-162c-4c2a-9623-025eddfb2671" />

## Tela inicial

<img width="1075" height="952" alt="image" src="https://github.com/user-attachments/assets/55042323-48b7-4e2e-bb23-dfcbe2b42b7c" />

## Meus tickets

<img width="1101" height="957" alt="image" src="https://github.com/user-attachments/assets/cd6157b5-bc8f-4c7c-9cea-35faffeec709" />

## Novo Ticket

<img width="1087" height="950" alt="image" src="https://github.com/user-attachments/assets/4530b45b-ac54-4e1a-a351-c861073b93ba" />

## Histórico de Serviços

<img width="1010" height="283" alt="image" src="https://github.com/user-attachments/assets/4037a883-dbd7-4196-95a3-81ef26338751" />

## Adicionar Serviço realizado

<img width="1080" height="958" alt="image" src="https://github.com/user-attachments/assets/c152002d-05e7-4f9a-a342-5911af41277d" />

## Meus dados e logout

<img width="1088" height="950" alt="image" src="https://github.com/user-attachments/assets/97f52b76-84bb-4c3b-85d2-e0d2c4ebec30" />

</details>

---

# Sobre o projeto

O ConnectHub foi desenvolvido para facilitar a comunicação entre setores de uma organização por meio de um sistema de gerenciamento de chamados.

Cada setor possui acesso apenas aos tickets destinados a ele, permitindo um fluxo organizado de atendimento. Além disso, usuários podem abrir chamados para qualquer setor da organização e acompanhar o histórico completo dos serviços realizados.

---

# Arquitetura

```text
Frontend (Next.js)
        │
        │ HTTP (Axios + JWT)
        ▼
Backend (NestJS)
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

---

# Funcionalidades

- Cadastro de usuários.
- Autenticação utilizando JWT.
- Abertura de tickets.
- Visualização de tickets restrita ao setor do usuário.
- Visualização dos tickets criados pelo próprio usuário.
- Registro de serviços realizados.
- Histórico de serviços realizados em cada ticket.
- Controle do status dos tickets.
- Controle de permissões para alteração de status.
- Recuperação de senha (lógica implementada apenas no backend nesta versão).

---

# Manual do Sistema

## Funcionamento dos Tickets

Os tickets exibidos na página inicial pertencem apenas ao setor do usuário autenticado.

Entretanto, um usuário do setor **X** pode abrir um ticket destinado ao setor **Y**.

Caso o usuário queira visualizar apenas os tickets que ele próprio criou, independentemente do setor ao qual pertencem, basta acessar a aba **"Meus Tickets"**.

Para criar um novo ticket, acesse a aba **"Novo Ticket"**.

Ao clicar em qualquer área correspondente a um ticket, será possível visualizar todos os serviços realizados naquele chamado.

---

## Adicionando um serviço realizado

Para adicionar um serviço realizado, é necessário informar o **ID do ticket**.

Esse número pode ser localizado facilmente no canto superior da área correspondente ao ticket.

Com o ID em mãos:

1. Acesse a aba **"Adicionar Serviço"**.
2. Informe a descrição do serviço realizado.
3. Atualize o status do ticket conforme a atividade executada.

---

## Status dos Tickets

Um ticket pode assumir cinco estados:

- Pendente
- Em progresso
- Realizado
- Aprovado
- Inutilizado

Caso o usuário que esteja registrando o serviço **não seja o criador do ticket**, ele poderá alterar o status apenas para:

- Pendente
- Em progresso
- Realizado

Os status **Aprovado** e **Inutilizado** são exclusivos do usuário que criou o ticket e podem ser alterados apenas na aba **"Meus Tickets"**.

---

# Observações

O sistema utiliza o fuso horário **UTC** como referência. Dessa forma, podem ocorrer pequenas diferenças em relação ao horário oficial de Brasília.

Algumas funcionalidades, como recuperação de senha por e-mail e alteração de senha pela interface, não estão disponíveis nesta versão devido às limitações dos serviços gratuitos utilizados durante o desenvolvimento.

---

# Limitações desta versão

Nesta versão do sistema não foi possível implementar a funcionalidade de alteração de senha diretamente pela interface da aplicação. Apesar disso, toda a lógica necessária já está implementada no backend.

Da mesma forma, a lógica para recuperação de senha por e-mail também foi implementada no backend. Entretanto, devido às limitações dos planos gratuitos utilizados para envio de e-mails, essa funcionalidade não pôde ser disponibilizada nesta versão.

---

# Estrutura do projeto

O projeto foi dividido em dois repositórios independentes:

- Backend (API REST)
- Frontend (Interface Web)

Essa separação permite que cada aplicação seja desenvolvida, implantada e mantida de forma independente.

---

# Tecnologias utilizadas

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt

## Frontend

- Next.js
- React
- TypeScript
- Axios
- Tailwind CSS

---

# Por que essas tecnologias?

O backend foi desenvolvido utilizando **NestJS** por oferecer uma arquitetura organizada, baseada em módulos e injeção de dependência, facilitando a manutenção e a escalabilidade do projeto.

Para o acesso ao banco de dados foi utilizado o **Prisma ORM**, que proporciona tipagem completa com TypeScript, migrations simplificadas e uma excelente experiência de desenvolvimento.

No frontend foi escolhido o **Next.js**, pois oferece uma estrutura moderna para aplicações React, organização de rotas, bom desempenho e excelente integração com TypeScript.

Além das vantagens técnicas, essas ferramentas foram escolhidas por serem as tecnologias com as quais possuo maior experiência. Isso permitiu concentrar os esforços na construção das funcionalidades do sistema, adotando boas práticas de desenvolvimento em vez de investir tempo aprendendo um novo ecossistema durante o desenvolvimento do projeto.

---

# Melhorias futuras

- Permitir a atualização dos dados do usuário.
- Adicionar um filtro para tickets inutilizados.
- Permitir a configuração do fuso horário da aplicação.
- Substituir os alertas nativos por componentes personalizados, mantendo o padrão visual utilizado pelo componente de carregamento (loading).

---

# Como rodar localmente

## Frontend

### 1. Instale as dependências

```bash
npm install
```

### 2. Crie o arquivo `.env.local`

```env
NEXT_PUBLIC_API_URL="URL_DO_SEU_BACKEND"
```

### 3. Inicie a aplicação

```bash
npm run dev
```

---

## Backend

### 1. Instale as dependências

```bash
npm install
```

### 2. Crie o arquivo `.env`

Utilize o arquivo `.env.example` como modelo.

```bash
cp .env.example .env
```

Configure as variáveis de ambiente necessárias.

### 3. Gere o Prisma Client

```bash
npx prisma generate
```

### 4. Execute as migrations

Em ambiente de produção:

```bash
npx prisma migrate deploy
```

Caso esteja executando o projeto localmente pela primeira vez:

```bash
npx prisma migrate dev
```

### 5. Inicie a aplicação

```bash
npm run dev
```

---

# Considerações finais
O aplicação se trata de um projeto realizado para fins acadêmicos, sendo o projeto 05, fase 03, do programa TrendsIT 2026.

## Requisitos

## Requisitos Funcionais (RF)

| ID | Requisito | Descrição |
|----|-----------|-----------|
| **RF01** | Cadastro de usuários | O sistema deve permitir o cadastro de novos usuários. |
| **RF02** | Autenticação de usuários | O sistema deve permitir que usuários existentes realizem login de forma segura. |
| **RF03** | Controle de acesso aos dados | O sistema deve garantir que um usuário autenticado possa visualizar, criar, editar e excluir apenas os seus próprios dados. |
| **RF04** | Persistência de dados | O sistema deve armazenar todas as informações em um banco de dados relacional SQL. |
| **RF05** | Integração entre frontend e backend | O frontend deve consumir os dados da API em tempo real, refletindo na interface todas as alterações realizadas no servidor. |

---

## Requisitos Não Funcionais (RNF)

| ID | Requisito | Descrição |
|----|-----------|-----------|
| **RNF01** | Proteção de credenciais | As senhas não podem ser armazenadas em texto puro, devendo ser protegidas por hashing utilizando algoritmos como BCrypt. |
| **RNF02** | Segurança de acesso | O acesso às rotas privadas deve ser protegido por autenticação utilizando JSON Web Token (JWT). |
| **RNF03** | Tratamento de exceções | A API deve retornar códigos HTTP apropriados para cada situação, como 401 (Unauthorized) e 404 (Not Found). |
| **RNF04** | Tecnologia do backend | O backend deve ser desenvolvido obrigatoriamente em Node.js. |
| **RNF05** | Banco de dados | O sistema deve utilizar um banco de dados relacional (MySQL, PostgreSQL ou SQLite), não sendo permitido o uso de bancos NoSQL. |
| **RNF06** | Arquitetura da API | A API deve seguir os princípios REST, utilizando corretamente os métodos GET, POST, PUT e DELETE. |
| **RNF07** | Organização do projeto | O código do frontend e do backend deve estar organizado em repositórios separados ou em uma estrutura de pastas clara. |
| **RNF08** | Documentação | O projeto deve conter um arquivo README com instruções de instalação e execução da aplicação. |
