# Changelog

Todas as mudanças relevantes do projeto serão documentadas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2025

### Adicionado
- Interface desktop Electron com dark mode
- Suporte completo ao formato `tree` padrão (com `├──`, `└──`, `│`)
- Geração de stubs inteligentes por tipo de arquivo (`.ts`, `.md`, `.yml`, `.env`, `package.json`)
- Seleção de pasta base via diálogo nativo do sistema
- Campo opcional de subpasta/nome do projeto
- Botões de "Inserir exemplo" e "Limpar"
- Log de saída com caminho final gerado
- Build automatizado via GitHub Actions (Windows x64, NSIS installer)
- Configuração de ícone personalizado (`.ico` e `.png`)
- Proteção contra sobrescrita de pastas existentes
- Funcionamento 100% local (sem acesso à internet)

---

## Versões futuras

Ideias e melhorias planejadas:

- [ ] Suporte a macOS e Linux
- [ ] Preview da árvore antes de gerar
- [ ] Histórico das últimas estruturas usadas
- [ ] Suporte a templates customizados de stub
- [ ] Drag & drop de arquivo `.txt` com o tree
- [ ] Tema claro (light mode)
