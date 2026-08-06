<<<<<<< HEAD
# NB Arquitetura e Interiores

Portfólio responsivo desenvolvido em Next.js, React, TypeScript e CSS. Esta versão está preparada para desenvolvimento local e deploy direto na Vercel.

## Rodar no computador

Tenha o Node.js 20.9 ou superior instalado. Abra o terminal na pasta do projeto e execute:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Onde fazer as alterações

- Página inicial: `app/page.tsx`
- Cabeçalho, menu e footer: `app/components.tsx`
- Cores, tipografia e responsividade: `app/globals.css`
- Dados dos projetos: `app/data.ts`
- Sobre mim: `app/sobre/page.tsx`
- Projetos: `app/projetos/page.tsx`
- Interiores: `app/interiores/page.tsx`
- Design: `app/design/page.tsx`
- Contato: `app/contato/page.tsx`
- Imagens: `public/images/`
- Currículo: `public/curriculo-nb.txt`

## Substituir o currículo por PDF

1. Coloque o arquivo em `public/curriculo-nb.pdf`.
2. Abra `app/sobre/page.tsx`.
3. Troque `href="/curriculo-nb.txt"` por `href="/curriculo-nb.pdf"`.

## Contatos

Os contatos de demonstração estão em `app/components.tsx` e `app/contato/page.tsx`. Substitua o e-mail, os links do Instagram e LinkedIn e o número do WhatsApp. No link do WhatsApp, use o número com código do país e DDD, apenas com algarismos.

## Publicar na Vercel

### Pelo GitHub

1. Crie um repositório no GitHub e envie os arquivos desta pasta.
2. Na Vercel, selecione **Add New → Project**.
3. Importe o repositório.
4. A Vercel reconhecerá automaticamente o Next.js.
5. Clique em **Deploy**.

### Pela Vercel CLI

```bash
npm install -g vercel
vercel
```

Não é necessário configurar variáveis de ambiente para a versão atual.
=======
# NB-Arquitetura
>>>>>>> 8716b702ca4a64789341099b1e16b0461f3c674d
