<div align="center">

<img src="assets/guebly.png" alt="Guebly Scaffold" width="90" />

# Guebly Scaffold

**Gere toda a estrutura de pastas e arquivos de um projeto a partir de um tree colado — em segundos.**

Um app desktop Electron que transforma a saida do comando `tree` (ou qualquer arvore copiada de uma IA) em pastas e arquivos reais no seu computador. Tudo roda 100% local, sem enviar nenhum dado para a internet.

[![Electron](https://img.shields.io/badge/Electron-30.x-47848F?style=flat-square&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Platform](https://img.shields.io/badge/Plataforma-Windows-0078D6?style=flat-square&logo=windows&logoColor=white)](#requisitos)
[![License](https://img.shields.io/badge/Licen%C3%A7a-Propriet%C3%A1ria-red?style=flat-square)](#licen%C3%A7a)
[![Feito pela Guebly](https://img.shields.io/badge/feito%20por-Guebly-9854F1?style=flat-square)](https://www.guebly.com.br)

[Como usar](#como-usar) · [Instalacao dev](#instala%C3%A7%C3%A3o-para-devs) · [Gerar build](#gerar-instalador-exe) · [CI/CD](#distribui%C3%A7%C3%A3o-via-github-actions) · [Contribuir](#contribuindo)

</div>

---

## Sobre

O **Guebly Scaffold** e uma ferramenta desktop desenvolvida pela [Guebly](https://www.guebly.com.br) — empresa de tecnologia brasileira especializada em automacoes inteligentes, plataformas interativas e sistemas personalizados.

O app resolve um problema concreto do dia a dia: voce recebe de uma IA (ou do comando `tree`) uma estrutura de projeto, e precisa criar todas as pastas e arquivos manualmente. O Guebly Scaffold faz isso em segundos, gerando toda a arvore de diretorios com arquivos stub prontos para edicao.

> **Fluxo:** cole a estrutura → escolha a pasta de saida → o app cria tudo automaticamente.

---

## Funcionalidades

- Cria **pastas e subpastas** conforme a arvore colada
- Cria **arquivos** com conteudo stub basico (placeholders editaveis)
- Suporta tipos comuns com stubs inteligentes: `.ts`, `.md`, `.yml`, `.yaml`, `.env`, `package.json`, entre outros
- Roda **100% localmente** — nenhum dado e enviado para a internet
- Interface dark mode com log de execucao em tempo real

### O que o app NAO faz

- Nao gera o codigo real dos arquivos — apenas stubs (placeholders)
- Nao e um gerador de projetos completo (tipo `create-react-app` ou `nest new`)
- Para projetos com conteudo real, use templates base + IA para preencher

---

## Stack tecnologica

| Tecnologia | Funcao | Detalhes |
|---|---|---|
| **Electron 30** | Framework desktop | Processo principal + renderer isolado |
| **JavaScript (ES2023)** | Linguagem | Logica de parsing e geracao de arquivos |
| **HTML/CSS** | Interface | Dark mode nativo, layout responsivo |
| **electron-builder** | Empacotamento | Gera instalador NSIS para Windows x64 |
| **GitHub Actions** | CI/CD | Build automatico em push de tags `v*.*.*` |

---

## Requisitos

### Para usar o app (usuario final)

- Windows 10 ou superior (x64)
- Baixar o instalador `.exe` na aba [Releases](../../releases)

### Para rodar em dev ou gerar o build

- **Node.js LTS** (recomendado: v20+)
- **Windows** (para gerar `.exe` localmente com NSIS)
- **Git** (para versionar e usar o CI)

---

## Instalacao para devs

```bash
# Clone o repositorio
git clone https://github.com/Guebly/guebly-scaffold.git
cd guebly-scaffold

# Instale as dependencias
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

O instalador sera gerado em `dist/`, com nome parecido com:

```
dist/Guebly Scaffold Setup 1.0.0.exe
```

Para abrir a pasta `dist/` rapidamente:

```bat
start dist
```

> **Obs:** Sem assinatura digital (code signing), o Windows pode exibir o alerta do SmartScreen. Isso e esperado para executaveis nao assinados. Clique em "Mais informacoes" → "Executar assim mesmo".

---

## Distribuicao via GitHub Actions

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

> **Nota sobre permissoes:** dependendo das configuracoes do repositorio/organizacao, o token do GitHub pode nao ter permissao de escrita para criar Releases automaticas. Nesse caso, use os **Artifacts** do workflow run diretamente.

---

## Como usar

1. Abra o **Guebly Scaffold Desktop**
2. Na area **"1) Cole a estrutura"**, cole o seu tree
3. Clique em **Selecionar** e escolha a pasta base de destino
4. _(Opcional)_ Preencha o campo **Subpasta** com o nome do projeto — se o seu tree ja comeca com `nome-do-projeto/`, deixe em branco
5. Clique em **Gerar estrutura**
6. O log exibira o caminho final criado

---

## Formato do tree aceito

| Elemento | Exemplo |
|---|---|
| Pasta raiz | `meu-projeto/` |
| Arquivo | `├── README.md` |
| Subpasta | `└── src/` |
| Arquivo em subpasta | `    ├── main.ts` |
| Comentario (ignorado) | `├── docker-compose.yml  # comentario` |

**Regras de parsing:**

- Pastas devem terminar com `/`
- Linhas com `├──` e `└──` sao aceitas
- Prefixos `│   ` e indentacao de 4 espacos sao suportados
- Comentarios apos `#` sao ignorados automaticamente
- Linhas vazias e linhas sem nome de arquivo/pasta sao ignoradas

### Exemplo de tree

```text
guebly-growth-engine/
├── docker-compose.yml        # Orquestracao
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

| Arquivo / extensao | Conteudo do stub |
|---|---|
| `package.json` | JSON com `name`, `version`, scripts basicos |
| `README.md` / `*.md` | Titulo `# nome-do-projeto` |
| `*.ts` | `/** Auto-generated stub */` + `export {};` |
| `*.yml` / `*.yaml` | `# Auto-generated stub` |
| `.env*` | `# Auto-generated stub` |
| Outros | `/* Auto-generated stub */` |

---

## Estrutura do projeto

```
.
├── main.js                   # Processo principal Electron + logica de geracao
├── preload.js                # Bridge segura (contextIsolation)
├── renderer/
│   ├── index.html            # Interface do app
│   ├── styles.css            # Estilos (dark mode)
│   └── renderer.js           # Logica da UI
├── assets/
│   └── guebly.png            # Logo Guebly
├── build/
│   ├── icon.ico              # Icone Windows (>=256px)
│   └── icon.png
├── package.json
└── .github/
    └── workflows/
        └── release.yml       # CI — build automatico no GitHub Actions
```

---

## Problemas comuns

**"A pasta de destino ja existe"**
O app nao sobrescreve pastas existentes por seguranca. Apague a pasta ou escolha outro destino.

**"Minha arvore ficou errada"**
Verifique: pasta sem `/` no final, indentacao quebrada ao copiar/colar, ou caracteres especiais fora do padrao.

**"Windows bloqueia o instalador"**
Clique em "Mais informacoes" → "Executar assim mesmo". Para eliminar o alerta definitivamente, use um certificado de assinatura digital (code signing).

**"Erro ao instalar dependencias"**
Certifique-se de estar usando Node.js v20+ e que o `npm` esta atualizado (`npm install -g npm@latest`).

---

## Seguranca e privacidade

- O app funciona **100% localmente**
- Nao ha comunicacao com servidores externos
- Nenhum dado (tree, caminhos, nomes) e transmitido pela internet
- Voce tem controle total sobre onde os arquivos sao criados

---

## Contribuindo

Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes de contribuicao.

---

## Changelog

Veja o arquivo [CHANGELOG.md](CHANGELOG.md) para o historico de versoes.

---

## Sobre a Guebly

A [Guebly](https://www.guebly.com.br) e uma empresa de tecnologia brasileira especializada em **automacoes inteligentes, plataformas interativas, sistemas personalizados e integracoes com APIs** — inteligencia aplicada para escalar negocios.

---

## Licenca

© Guebly. Todos os direitos reservados.
