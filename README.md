<div align="center">
  <img src="assets/guebly.png" alt="Guebly Logo" width="180" />

  <h1>Guebly Scaffold</h1>

  <p><strong>App desktop para gerar estrutura de projetos a partir de um "tree" colado.</strong></p>

  <p>
    <a href="#-como-usar">Como usar</a> •
    <a href="#-instalação-para-devs">Dev</a> •
    <a href="#-gerar-instalador-exe">Build</a> •
    <a href="#-distribuição-via-github-actions">CI/CD</a> •
    <a href="#-contribuindo">Contribuir</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Electron-30.x-47848F?logo=electron&logoColor=white" alt="Electron" />
    <img src="https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=white" alt="Windows" />
    <img src="https://img.shields.io/badge/Guebly-guebly.com.br-black" alt="Guebly" />
    <img src="https://img.shields.io/badge/License-All%20rights%20reserved-red" alt="License" />
  </p>
</div>

---

## Sobre

O **Guebly Scaffold** é uma ferramenta desktop desenvolvida pela [Guebly](https://www.guebly.com.br) — empresa de tecnologia especializada em automações inteligentes, plataformas interativas e sistemas personalizados.

O app resolve um problema concreto do dia a dia: você recebe de uma IA (ou do comando `tree`) uma estrutura de projeto, e precisa criar todas as pastas e arquivos manualmente. O Guebly Scaffold faz isso em segundos, gerando toda a árvore de diretórios com arquivos stub prontos para edição.

> ✅ **Fluxo:** cole a estrutura → escolha a pasta de saída → o app cria tudo automaticamente.

---

## O que o app faz

- ✅ Cria **pastas e subpastas** conforme a árvore colada
- ✅ Cria **arquivos** com conteúdo stub básico
- ✅ Suporta tipos comuns com stubs inteligentes: `.ts`, `.md`, `.yml`, `.yaml`, `.env`, `package.json`, etc.
- ✅ Roda **100% localmente** — nenhum dado é enviado para a internet

## O que o app NÃO faz

- ❌ Não gera o código real dos arquivos — apenas stubs (placeholders)
- ❌ Não é um gerador de projetos completo (tipo `create-react-app` ou `nest new`)
- ❌ Para projetos com conteúdo real, use templates base + IA para preencher

---

## Requisitos

### Para usar o app (usuário final)
- Windows 10 ou superior (x64)
- Baixar o instalador `.exe` na aba [Releases](../../releases)

### Para rodar em dev ou gerar o build
- **Node.js LTS** (recomendado: v20+)
- **Windows** (para gerar `.exe` localmente com NSIS)
- **Git** (para versionar e usar o CI)

---

## Instalação para devs

```bash
# Clone o repositório
git clone https://github.com/guebly/GueblyScaffold.git
cd GueblyScaffold

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm start
```

---

## Gerar instalador `.exe`

No Windows, rode na raiz do projeto:

```bash
npm run dist:win
```

O instalador será gerado em `dist/`, com nome parecido com:

```
dist/Guebly Scaffold Setup 1.0.0.exe
```

Para abrir a pasta `dist/` rapidamente:

```bat
start dist
```

> **Obs:** Sem assinatura digital (code signing), o Windows pode exibir o alerta do SmartScreen. Isso é esperado para executáveis não assinados. Clique em "Mais informações" → "Executar assim mesmo".

---

## Distribuição via GitHub Actions

O projeto inclui um workflow em `.github/workflows/release.yml` que:

1. Roda automaticamente em push de tags `v*.*.*` (ou manualmente via `workflow_dispatch`)
2. Compila o instalador `.exe` no GitHub (runner Windows)
3. Sobe o artefato para download direto na aba **Actions → Artifacts**

### Como disparar uma release

```bash
git tag v1.0.1
git push origin v1.0.1
```

Acesse a aba **Actions** no GitHub para acompanhar e depois baixar o artefato gerado.

> **Nota sobre permissões:** dependendo das configurações do repositório/organização, o token do GitHub pode não ter permissão de escrita para criar Releases automáticas. Nesse caso, use os **Artifacts** do workflow run diretamente.

---

## Como usar o app

1. Abra o **Guebly Scaffold Desktop**
2. Na área **"1) Cole a estrutura"**, cole o seu tree
3. Clique em **Selecionar** e escolha a pasta base de destino
4. _(Opcional)_ Preencha o campo **Subpasta** com o nome do projeto
   - Se o seu tree já começa com `nome-do-projeto/`, deixe em branco
5. Clique em **Gerar estrutura**
6. O log exibirá o caminho final criado

---

## Formato do "tree" aceito

| Elemento | Exemplo |
|---|---|
| Pasta raiz | `meu-projeto/` |
| Arquivo | `├── README.md` |
| Subpasta | `└── src/` |
| Arquivo em subpasta | `    ├── main.ts` |
| Comentário (ignorado) | `├── docker-compose.yml  # comentário` |

**Regras:**
- Pastas devem terminar com `/`
- Linhas com `├──` e `└──` são aceitas
- Prefixos `│   ` e indentação de 4 espaços são suportados
- Comentários após ` #` são ignorados automaticamente

---

## Exemplo de tree

```text
guebly-growth-engine/
├── docker-compose.yml        # Orquestração
├── .env.example
├── README.md
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
        │   └── brain.service.ts
        └── outreach/
            ├── whatsapp.provider.ts
            └── email.provider.ts
```

---

## Stubs gerados por tipo de arquivo

| Arquivo/extensão | Conteúdo do stub |
|---|---|
| `package.json` | JSON com `name`, `version`, scripts básicos |
| `README.md` / `*.md` | Título `# nome-do-projeto` |
| `*.ts` | `/** Auto-generated stub */` + `export {};` |
| `*.yml` / `*.yaml` | `# Auto-generated stub` |
| `.env*` | `# Auto-generated stub` |
| Outros | `/* Auto-generated stub */` |

---

## Problemas comuns

**"A pasta de destino já existe"**
O app não sobrescreve pastas existentes por segurança. Apague a pasta ou escolha outro destino.

**"Minha árvore ficou errada"**
Verifique: pasta sem `/` no final, indentação quebrada ao copiar/colar, ou caracteres especiais fora do padrão.

**"Windows bloqueia o instalador"**
Clique em "Mais informações" → "Executar assim mesmo". Para eliminar o alerta definitivamente, use um certificado de assinatura digital (code signing).

---

## Estrutura do projeto

```
.
├── main.js                   # Processo principal Electron + lógica de geração
├── preload.js                # Bridge segura (contextIsolation)
├── renderer/
│   ├── index.html            # Interface do app
│   ├── styles.css            # Estilos (dark mode)
│   └── renderer.js           # Lógica da UI
├── assets/
│   └── guebly.png            # Logo Guebly
├── build/
│   ├── icon.ico              # Ícone Windows (≥256px)
│   └── icon.png
└── .github/
    └── workflows/
        └── release.yml       # CI — build automático no GitHub Actions
```

---

## Segurança e privacidade

- O app funciona **100% localmente**
- Não há comunicação com servidores externos
- Nenhum dado (tree, caminhos, nomes) é transmitido pela internet
- Você tem controle total sobre onde os arquivos são criados

---

## Contribuindo

Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes de contribuição.

---

## Changelog

Veja o arquivo [CHANGELOG.md](CHANGELOG.md) para o histórico de versões.

---

## Sobre a Guebly

A [Guebly](https://www.guebly.com.br) é uma empresa de tecnologia brasileira especializada em **automações inteligentes, plataformas interativas, sistemas personalizados e integrações com APIs** — inteligência aplicada para escalar negócios.

---

## Licença

© Guebly. Todos os direitos reservados.
