import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
  }

  // export interface Window {
  //   electron: ElectronAPI;
  //   api: unknown;
  // }
}