import { BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';

export function createTray(window: BrowserWindow) {
  const tray = new Tray(
    path.resolve(__dirname, '..', '..', 'resources', 'rotionTemplate.png'),
  );

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document');
      },
    },
    { type: 'separator' },
    { label: 'Documentos Recentes', enabled: false },
    {
      label: 'Discover',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Ignite',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'React Native',
      accelerator: 'CommandOrControl+3',
      acceleratorWorksWhenHidden: false,
    },
    { type: 'separator' },
    { label: 'Sair do Rotion', role: 'quit' },
  ]);

  tray.setContextMenu(menu);
}
