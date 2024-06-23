import { WebContainer, WebContainerProcess } from "@webcontainer/api";

export interface WebContainerState {
  instance: WebContainer | null;
  devProcess: WebContainerProcess | null;
  ready: boolean;
  error: string;
  devUrl: string;
  fileMounted: boolean;
}
