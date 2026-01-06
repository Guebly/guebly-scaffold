const $ = (id) => document.getElementById(id);

const statusEl = $("status");
const logEl = $("log");
const treeEl = $("tree");
const outputEl = $("outputDir");
const projectEl = $("projectName");

function setStatus(text, ok=true){
  statusEl.textContent = text;
  statusEl.style.color = ok ? "rgba(255,255,255,0.75)" : "rgba(239,68,68,0.95)";
}

function log(text){
  logEl.textContent = text;
}

const example = `guebly-growth-engine/
├── docker-compose.yml        # Orquestração de Banco, Redis e Evolution API
├── .env.example              # Variáveis de ambiente
├── README.md                 # A documentação completa
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
`;

$("btnExample").addEventListener("click", () => {
  treeEl.value = example;
  setStatus("Exemplo inserido");
});

$("btnClear").addEventListener("click", () => {
  treeEl.value = "";
  log("");
  setStatus("Pronto");
});

$("btnPick").addEventListener("click", async () => {
  try{
    const dir = await window.guebly.pickOutputDir();
    if (!dir) return;
    outputEl.value = dir;
    setStatus("Pasta selecionada");
  }catch(e){
    setStatus("Erro ao selecionar pasta", false);
    log(String(e?.message || e));
  }
});

$("btnGenerate").addEventListener("click", async () => {
  setStatus("Gerando...", true);
  log("Processando estrutura...");
  try{
    const payload = {
      treeText: treeEl.value,
      outputDir: outputEl.value,
      projectFolderName: projectEl.value,
    };
    const res = await window.guebly.generate(payload);
    log(`✅ Gerado em:\n${res.finalRoot}\n\nObs: arquivos sao stubs (placeholders).`);
    setStatus("Concluído ✅");
  }catch(e){
    setStatus("Falhou ❌", false);
    log(`❌ Erro:\n${String(e?.message || e)}`);
  }
});
