# Guebly Scaffold Desktop (Electron)

App desktop com painel para colar a estrutura (tree) e gerar pastas + arquivos automaticamente.

## Rodar local (dev)
1) Instale Node.js (LTS)
2) `npm install`
3) `npm start`

## Gerar instalador (.exe) localmente (Windows)
`npm run dist:win`

Saída: `dist/`

## Publicar .exe automaticamente no GitHub Releases
1) Suba o repo
2) Crie uma tag:
   - `git tag v1.0.0`
   - `git push origin v1.0.0`

O GitHub Actions vai buildar e anexar o instalador `.exe` no Release.

## Nota sobre bloqueio do Windows (Smart App Control)
Sem assinatura (code signing), é normal o Windows alertar/ bloquear builds baixadas da internet.
Para reduzir avisos de forma real: assine o instalador com um certificado de code signing.
