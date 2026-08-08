# NB Arquitetura e Interiores

Portfólio profissional desenvolvido para a arquiteta **Natasha Almeida Bandeira**, com o objetivo de apresentar sua trajetória, experiência e projetos nas áreas de **interiores, arquitetura comercial, espaços externos e design**.

O site combina uma identidade visual editorial com uma experiência imersiva, valorizando fotografias, composição, materiais, iluminação e a narrativa de cada projeto.

Além da área pública, o projeto possui um **painel administrativo integrado ao Supabase**, permitindo que a própria arquiteta gerencie o conteúdo do portfólio.

---

## 🌐 Site publicado

Acesse o projeto:

[https://nb-arquitetura.vercel.app](https://nb-arquitetura.vercel.app)

---

## ✨ Funcionalidades

### Área pública

- Home com navegação fluida entre seções;
- Colagens de imagens e animações durante o scroll;
- Projeto em destaque;
- Projeto em andamento;
- Página sobre a trajetória profissional;
- Currículo disponível para download;
- Projetos organizados por categoria;
- Páginas individuais geradas por slug;
- Galerias responsivas;
- Lightbox com ampliação e zoom;
- Página de contato;
- Links para e-mail, Instagram, LinkedIn e WhatsApp;
- Interface responsiva para desktop, tablet e dispositivos móveis.

### Categorias

- Interiores;
- Comercial;
- Externos;
- Design.

### Painel administrativo

Disponível em:

```text
/admin
```

O painel permite:

- Login exclusivo da administradora;
- Cadastro de projetos;
- Edição de projetos;
- Exclusão de projetos;
- Publicação e ocultação de projetos;
- Organização por categoria;
- Upload de múltiplas imagens;
- Reordenação das imagens;
- Definição da imagem de capa;
- Escolha do enquadramento da capa;
- Definição do projeto em destaque;
- Definição do projeto em andamento;
- Remoção automática das imagens do Storage ao excluir um projeto;
- Atualização das páginas públicas a partir do banco de dados.

---

## 🚀 Tecnologias utilizadas

### Front-end

- **Next.js 16** — framework React e estrutura da aplicação;
- **React 19** — componentes e interfaces interativas;
- **TypeScript** — tipagem estática e maior segurança no desenvolvimento;
- **CSS3** — identidade visual, responsividade, animações e transições;
- **Tailwind CSS/PostCSS** — processamento e suporte à camada de estilos;
- **Yet Another React Lightbox** — galeria com ampliação e zoom.

### Back-end e dados

- **Supabase PostgreSQL** — armazenamento dos projetos;
- **Supabase Auth** — autenticação da administradora;
- **Supabase Storage** — armazenamento das imagens;
- **Row Level Security (RLS)** — controle de acesso ao banco e ao Storage;
- **Supabase SSR** — integração da autenticação com o Next.js.

### Infraestrutura

- **GitHub** — versionamento do código;
- **Vercel** — hospedagem e deploy contínuo;
- **Supabase** — banco, autenticação e arquivos.

---

## 🔐 Segurança

O sistema utiliza políticas RLS para controlar as operações:

- Visitantes podem consultar somente projetos publicados;
- Somente usuários cadastrados na tabela `admins` podem criar, editar ou excluir projetos;
- Cadastros públicos e autenticação anônima permanecem desativados;
- Uploads são restritos a JPEG, PNG, WebP e AVIF;
- Cada imagem pode ter no máximo **1,5 MB**;
- A chave utilizada no navegador é somente a Publishable key do Supabase;
- Nenhuma `secret key`, `service_role` ou senha do banco é armazenada no repositório.

> As imagens do portfólio ficam em um bucket público para serem exibidas no site. Arquivos confidenciais não devem ser enviados pelo painel.

---

## 📂 Estrutura do projeto

```text
app/
├── admin/
│   ├── login/
│   ├── AdminDashboard.tsx
│   ├── layout.tsx
│   └── page.tsx
├── comercial/
├── contato/
├── design/
├── externos/
├── interiores/
├── projetos/
│   └── [slug]/
├── sobre/
├── CategoryProjects.tsx
├── components.tsx
├── data.ts
├── globals.css
├── layout.tsx
└── page.tsx

lib/
├── supabase/
│   ├── client.ts
│   └── server.ts
├── projects.ts
└── types.ts

public/
└── images/

supabase/
└── setup.sql

.env.example
proxy.ts
SUPABASE.md
```

---

## 💻 Executar localmente

### Requisitos

- Node.js 20.9 ou superior;
- npm;
- Projeto configurado no Supabase.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/BraidoLuis/NB-Arquitetura.git
```

Entre na pasta:

```bash
cd NB-Arquitetura
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local` a partir do `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_SUA_CHAVE
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Painel administrativo:

```text
http://localhost:3000/admin
```

---

## 🗄️ Configuração do Supabase

As instruções completas estão disponíveis em:

[`SUPABASE.md`](./SUPABASE.md)

O arquivo responsável por criar tabelas, políticas, função administrativa, conteúdo inicial e bucket é:

```text
supabase/setup.sql
```

Nunca coloque no código ou nas variáveis públicas:

- Senha do banco;
- Secret key;
- `service_role`.

---

## 📄 Currículo

O currículo utilizado no site está localizado em:

```text
public/images/Portfólio-Natasha.pdf
```

O botão de download está configurado em:

```text
app/sobre/page.tsx
```

---

## 🖼️ Gerenciamento das imagens

- A primeira imagem da lista é utilizada como capa;
- As setas do painel alteram a ordem;
- O enquadramento define o ponto focal da capa nos cards;
- Cada arquivo pode ter no máximo 1,5 MB;
- Recomenda-se utilizar WebP ou JPEG otimizado;
- As imagens enviadas pelo painel ficam no Supabase Storage;
- Imagens antigas presentes em `public/images` continuam funcionando normalmente.

---

## 🧪 Comandos disponíveis

Executar em desenvolvimento:

```bash
npm run dev
```

Validar o código:

```bash
npm run lint
```

Gerar a compilação de produção:

```bash
npm run build
```

Executar a compilação:

```bash
npm run start
```

---

## 📦 Deploy

O projeto utiliza deploy contínuo pela Vercel.

Fluxo:

1. O código é enviado para o GitHub;
2. Pull Requests geram Preview Deployments;
3. O merge na `main` gera um deployment de produção;
4. A Vercel utiliza as variáveis do Supabase configuradas no projeto.

Variáveis necessárias:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

As variáveis devem estar cadastradas nos ambientes **Production** e **Preview** da Vercel.

---

## 👩‍💻 Projeto desenvolvido para

**Natasha Almeida Bandeira**  
Arquitetura e Interiores

Portfólio desenvolvido para apresentar sua trajetória, seus projetos e sua identidade profissional por meio de uma experiência digital moderna, visual e administrável.