export interface PluginInstance {
  execute(pathToRepo: string): Promise<void>;
}
