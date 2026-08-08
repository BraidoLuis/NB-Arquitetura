# Configuração do painel administrativo

## 1. Criar o projeto

Crie um projeto no Supabase e abra **SQL Editor**. Copie e execute todo o arquivo `supabase/setup.sql`.

## 2. Criar o acesso da Natasha

Em **Authentication > Users**, crie uma usuária com o e-mail da Natasha e uma senha forte. Depois, no final de `supabase/setup.sql`, substitua `EMAIL_DA_NATASHA` pelo e-mail usado e execute somente a última instrução `insert into public.admins...`.

## 3. Variáveis locais

Copie `.env.example` para `.env.local` e preencha os valores encontrados em **Project Settings > API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
```

Nunca coloque a `service_role` no código ou na Vercel.

## 4. Rodar e acessar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000/admin`. Na Vercel, cadastre as mesmas duas variáveis em **Settings > Environment Variables**.

## Regras já aplicadas

- O bucket aceita apenas JPEG, PNG, WebP e AVIF.
- Cada arquivo pode ter no máximo 1,5 MB (1.572.864 bytes).
- Visitantes apenas leem projetos publicados e imagens.
- Somente usuários adicionados à tabela `admins` podem cadastrar, editar ou excluir.
- A primeira imagem da lista é usada como capa.
- Ao excluir um projeto, as imagens enviadas pelo painel também são removidas do Storage.
