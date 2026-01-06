# Guebly Scaffold Desktop

App desktop (Windows) para **gerar pastas e arquivos automaticamente** a partir de uma estrutura “tree” colada (como o ChatGPT normalmente monta).

> ✅ Fluxo: você cola a estrutura do projeto → escolhe a pasta de saída → o app cria **toda a árvore de pastas** e cria **arquivos stub** (placeholders) nos caminhos informados.

---

## Sumário

- [O que este app faz](#o-que-este-app-faz)
- [O que ele NÃO faz](#o-que-ele-não-faz)
- [Requisitos](#requisitos)
- [Rodar em modo dev](#rodar-em-modo-dev)
- [Gerar instalador `.exe` no Windows](#gerar-instalador-exe-no-windows)
- [Distribuir para outras pessoas](#distribuir-para-outras-pessoas)
- [Como usar o app](#como-usar-o-app)
- [Formato do “tree” aceito](#formato-do-tree-aceito)
- [Exemplo completo de estrutura](#exemplo-completo-de-estrutura)
- [Saída gerada](#saída-gerada)
- [Dicas e problemas comuns](#dicas-e-problemas-comuns)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Segurança e privacidade](#segurança-e-privacidade)
- [Licença](#licença)

---

## O que este app faz

- ✅ Cria **pastas e subpastas** conforme a árvore colada
- ✅ Cria **arquivos** conforme os nomes colados
- ✅ Gera conteúdo básico (stub) para alguns tipos comuns:
  - `.ts`, `.md`, `.yml/.yaml`, `.env*`, etc.
- ✅ Tudo roda **localmente** (não envia dados para internet)

---

## O que ele NÃO faz

- ❌ Não “adivinha” o código completo de um projeto apenas pela estrutura.
  - A estrutura (tree) não contém o conteúdo real dos arquivos.
- ❌ Não gera automaticamente um projeto Nest/React completo “pronto e perfeito” sem template.
  - Para isso, o caminho certo é usar **templates** (repo base) e/ou IA para preencher conteúdo.

---

## Requisitos

### Para rodar em dev / gerar instalador

- **Node.js (LTS)** instalado
- **Windows** (para gerar `.exe` localmente)
- Git (se você for versionar no GitHub)

---

## Rodar em modo dev

Na raiz do projeto:

```bash
npm install
npm start
```

Isso abre o app Electron em modo desenvolvimento.

---

## Gerar instalador `.exe` no Windows

Na raiz do projeto:

```bash
npm install
npm run dist:win
```

O instalador será gerado na pasta `dist/`, normalmente com nome parecido com:

- `dist/Guebly Scaffold Setup 1.0.0.exe`

Para abrir a pasta rapidamente:

```bat
start dist
```

---

## Distribuir para outras pessoas

### Opção 1 (mais simples): você gera o `.exe` e manda

- Gere o instalador (`npm run dist:win`)
- Envie o arquivo `.exe` para quem vai usar

**Observação importante:** sem assinatura digital (code signing), o Windows pode mostrar alerta (SmartScreen / Smart App Control). Isso é normal para executáveis novos e não assinados.

### Opção 2 (recomendada para distribuição): GitHub Actions (CI)

Se o seu repositório tiver workflow, você pode:

- gerar o instalador automaticamente no GitHub
- disponibilizar por release ou artifacts

> Dependendo das permissões do repositório/organização, o GitHub pode bloquear “read & write” do token e impedir criação de Release automática.  
> Nesse caso, use “Artifacts” (download do arquivo direto do workflow run).

---

## Como usar o app

1. Abra o **Guebly Scaffold Desktop**
2. Na área “1) Cole a estrutura”, cole sua árvore (tree)
3. Clique em **Selecionar** e escolha a **pasta base** onde o projeto será criado
4. (Opcional) Preencha “Subpasta” (nome do projeto)
   - se o seu tree já começa com `nome-do-projeto/`, deixe em branco
5. Clique em **Gerar estrutura**
6. O app vai mostrar o caminho final gerado no log

---

## Formato do “tree” aceito

O app suporta o padrão mais comum de árvore:

- Pastas terminam com `/`
- Linhas com `├──` e `└──` são aceitas
- Prefixos `│   ` e indentação são aceitos
- Comentários após ` #` são ignorados

Exemplos de linhas válidas:

- `meu-projeto/`
- `├── README.md`
- `└── src/`
- `    ├── main.ts`
- `    └── app.module.ts`
- `├── docker-compose.yml        # comentário`

---

## Exemplo completo de estrutura

Cole algo assim:

```text
guebly-growth-engine/
├── docker-compose.yml        # Orquestração
├── .env.example              # Variáveis de ambiente
├── README.md                 # Documentação
├── package.json
└── src/
    ├── main.ts
    ├── app.module.ts
    ├── config/
    │   ├── queue.config.ts
    │   └── openai.config.ts
    └── modules/
        ├── mining/
        │   ├── mining.service.ts
        │   └── adapters/
        ├── brain/
        │   ├── brain.service.ts
        │   └── prompts/
        ├── outreach/
        │   ├── whatsapp.provider.ts
        │   ├── email.provider.ts
        │   └── meta-ads.provider.ts
        └── orchestration/
            ├── campaign.processor.ts
            └── scheduler.service.ts
```

---

## Saída gerada

Se você escolher a pasta base `C:\Projetos` e colar um tree que começa com `guebly-growth-engine/`, o app vai gerar:

```text
C:\Projetos\guebly-growth-engine\
  docker-compose.yml
  .env.example
  README.md
  package.json
  src\
    main.ts
    app.module.ts
    config\
      queue.config.ts
      openai.config.ts
    modules\
      ...
```

E cada arquivo criado terá um **conteúdo stub** (placeholder), por exemplo:

- `.ts` → um comentário + `export {};`
- `.md` → um título básico
- `.yml` → comentário básico

---

## Dicas e problemas comuns

### “A pasta de destino já existe”

O app, por padrão, não sobrescreve.

- Apague a pasta existente
- ou escolha outro local/nome

### “Minha árvore ficou errada”

Normalmente é por:

- pasta sem `/` no final
- indentação quebrada ao copiar/colar
- tree com caracteres diferentes do padrão

### “Windows bloqueia o instalador”

Sem assinatura digital, pode acontecer:

- clique em “Mais informações”
- “Executar assim mesmo”

Para reduzir alertas de forma real:

- use **code signing** (certificado de assinatura)

---

## Estrutura do projeto

Principais arquivos:

```text
.
├── main.js                 # Processo principal (Electron)
├── preload.js              # Bridge segura (contextIsolation)
├── renderer/               # UI (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   └── renderer.js
├── assets/
│   └── guebly.png          # Logo
├── build/
│   ├── icon.ico            # Ícone Windows (>=256)
│   └── icon.png
└── .github/workflows/
    └── release.yml         # CI (se habilitado)
```

---

## Segurança e privacidade

- O app trabalha **somente localmente**.
- Não envia a estrutura colada para nenhum servidor.
- Você escolhe a pasta de destino e ele apenas cria arquivos/pastas.

---

## Licença

All rights reserved
