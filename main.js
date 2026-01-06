const { app, BrowserWindow, ipcMain, dialog, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
  const iconPath = path.join(__dirname, 'build', 'icon.png');
  const icon = fs.existsSync(iconPath) ? nativeImage.createFromPath(iconPath) : undefined;

  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    backgroundColor: '#0b0b12',
    title: 'Guebly Scaffold',
    icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// --------------------
// Helpers (tree -> filesystem)
// --------------------
function normalizeLine(line) {
  let s = String(line || '').replace(/\r?\n$/, '');
  const hashIdx = s.indexOf(' #');
  if (hashIdx !== -1) s = s.slice(0, hashIdx);
  return s.trimEnd();
}

function getDepthAndName(rawLine) {
  // Prefix blocks: "│   " or "    " (4 chars each)
  const m = rawLine.match(/^((?:\u2502\s{3}|\s{4})*)(.*)$/); // \u2502 = │
  const prefix = m ? m[1] : '';
  const rest = m ? m[2] : rawLine;

  const depth = Math.floor(prefix.length / 4);

  let name = rest
    .replace(/^[\u251C\u2514]\u2500\u2500\s?/, '') // ├── or └──
    .replace(/^[\u2500\u2500]+\s?/, '')
    .trim();

  return { depth, name };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeStubFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath).toLowerCase();

  let content = '';

  if (base === 'package.json') {
    content = JSON.stringify(
      {
        name: path.basename(path.dirname(filePath)),
        version: '0.0.1',
        private: true,
        scripts: {
          start: 'node dist/main.js',
          'start:dev': 'nest start --watch',
          build: 'nest build'
        }
      },
      null,
      2
    ) + '\n';
  } else if (base === 'readme.md') {
    content = `# ${path.basename(path.dirname(filePath))}\n\nProjeto gerado automaticamente (estrutura + stubs).\n`;
  } else if (ext === '.ts') {
    content = `/**\n * Auto-generated stub\n * TODO: implementar\n */\n\nexport {};\n`;
  } else if (ext === '.yml' || ext === '.yaml') {
    content = `# Auto-generated stub\n`;
  } else if (base.includes('.env') || ext === '.env') {
    content = `# Auto-generated stub\n`;
  } else if (ext === '.md') {
    content = `# Auto-generated stub\n`;
  } else if (ext) {
    content = `/* Auto-generated stub */\n`;
  } else {
    content = `# Auto-generated stub\n`;
  }

  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
}

function generateFromTree(treeText, outRoot, opts = {}) {
  const projectFolderName = (opts.projectFolderName || '').trim();
  const linesRaw = String(treeText || '').split(/\r?\n/);

  const lines = linesRaw
    .map(normalizeLine)
    .filter(l => l && !l.startsWith('Cole aqui') && !l.startsWith('Dicas:'));

  if (!lines.length) {
    throw new Error('Estrutura vazia. Cole um tree valido.');
  }

  // optional root marker as first line: "my-project/"
  let startIdx = 0;
  let rootName = null;

  if (!lines[0].includes('──') && (lines[0].endsWith('/') || lines[0].endsWith('\\'))) {
    rootName = lines[0].replace(/[\/\\]+$/, '');
    startIdx = 1;
  }

  const finalRoot = rootName
    ? path.join(outRoot, rootName)
    : (projectFolderName ? path.join(outRoot, projectFolderName) : outRoot);

  if (fs.existsSync(finalRoot)) {
    throw new Error(`A pasta de destino ja existe: ${finalRoot}`);
  }

  ensureDir(finalRoot);

  const stack = [finalRoot];

  for (let i = startIdx; i < lines.length; i++) {
    const rawLine = lines[i];
    const { depth, name } = getDepthAndName(rawLine);
    if (!name) continue;

    const clean = name.replace(/^[•\-\*]\s+/, '');
    const parentDepth = Math.min(depth, stack.length - 1);
    const parentDir = stack[parentDepth];

    const isDir = clean.endsWith('/') || clean.endsWith('\\');
    const entryName = clean.replace(/[\/\\]+$/, '');
    const fullPath = path.join(parentDir, entryName);

    if (isDir) {
      ensureDir(fullPath);
      stack.length = parentDepth + 1;
      stack.push(fullPath);
    } else {
      ensureDir(path.dirname(fullPath));
      writeStubFile(fullPath);
      stack.length = parentDepth + 1;
    }
  }

  return finalRoot;
}

// --------------------
// IPC
// --------------------
ipcMain.handle('pick-output-dir', async () => {
  const res = await dialog.showOpenDialog({
    title: 'Selecione a pasta onde o projeto sera gerado',
    properties: ['openDirectory', 'createDirectory']
  });
  if (res.canceled) return null;
  return res.filePaths[0] || null;
});

ipcMain.handle('generate', async (_evt, payload) => {
  const { treeText, outputDir, projectFolderName } = payload || {};
  if (!outputDir) throw new Error('Selecione a pasta de saida.');
  if (!treeText || !String(treeText).trim()) throw new Error('Cole a estrutura do projeto.');

  const finalRoot = generateFromTree(treeText, outputDir, { projectFolderName });
  return { ok: true, finalRoot };
});
