interface Configuration {
  readonly CLIENT_ID: string;
  readonly CLIENT_SECRET: string;
  readonly COOKIE_SESSION_SECRET: string;
  readonly JWT_SECRET: string;
  readonly MONGO_CONNECTION_STRING: string;
  readonly PLUGINS_PATH: string;
  readonly PORT: number;
  readonly TMP: string;
}

export default (): Configuration => ({
  CLIENT_ID: process.env.CLIENT_ID || 'client_id',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'client_secret',
  COOKIE_SESSION_SECRET: process.env.COOKIE_SECRET || 'cookie_session_secret',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/solid',
  PLUGINS_PATH: process.env.PLUGINS_PATH || '/plugins',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  TMP: process.env.TMPDIR || '/tmp',
});
