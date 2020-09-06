export interface PluginInstance {
  execute(pathToRepo: string): Promise<Record<string, unknown> | Record<string, unknown>>;
}
