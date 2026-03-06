# Contribuindo com o Guebly Scaffold

Obrigado pelo interesse em contribuir! Este documento explica como participar do desenvolvimento do projeto.

---

## Como contribuir

### Reportando bugs

1. Verifique se o bug já foi reportado nas [Issues](../../issues)
2. Se não encontrar, abra uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. comportamento atual
   - Sistema operacional e versão do app
   - Screenshot ou log de erro, se aplicável

### Sugerindo melhorias

1. Abra uma issue com o label `enhancement`
2. Descreva a melhoria proposta e o problema que ela resolve

### Enviando código (Pull Requests)

1. Faça um fork do repositório
2. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feat/nome-da-feature
   ```
3. Faça suas alterações
4. Teste localmente com `npm start`
5. Abra um Pull Request descrevendo o que foi alterado

---

## Ambiente de desenvolvimento

```bash
# Clonar
git clone https://github.com/guebly/GueblyScaffold.git
cd GueblyScaffold

# Instalar dependências
npm install

# Rodar em modo dev
npm start

# Gerar instalador (Windows)
npm run dist:win
```

---

## Convenções

- **Commits:** use mensagens claras em português ou inglês
  - `feat: adiciona suporte a arquivos .jsx`
  - `fix: corrige parsing de tree com espaços extras`
  - `docs: atualiza README com exemplos`
- **Código:** mantenha o estilo existente (vanilla JS, sem transpiladores)
- **Issues e PRs:** em português ou inglês

---

## Dúvidas

Acesse [guebly.com.br](https://www.guebly.com.br) ou abra uma issue.
