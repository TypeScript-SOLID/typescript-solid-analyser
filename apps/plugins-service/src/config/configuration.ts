interface Configuration {
  readonly MONGO_CONNECTION_STRING: string;
  readonly PLUGINS_PATH: string;
  readonly PORT: number;
}

export const configuration = (): Configuration => ({
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/solid',
  PLUGINS_PATH: process.env.PLUGINS_PATH || '/plugins',
  PORT: parseInt(process.env.PORT, 10) || 3000,
});
