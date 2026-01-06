const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('guebly', {
  pickOutputDir: () => ipcRenderer.invoke('pick-output-dir'),
  generate: (payload) => ipcRenderer.invoke('generate', payload),
});
