interface Configuration {
  readonly COOKIE_SESSION_SECRET: string;
  readonly JWT_SECRET: string;
  readonly PLUGINS_SERVICE_URL: string;
  readonly PORT: number;
}

export const configuration = (): Configuration => ({
  COOKIE_SESSION_SECRET: process.env.COOKIE_SECRET || 'cookie_session_secret',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  PLUGINS_SERVICE_URL: process.env.PLUGINS_SERVICE_URL || 'http://localhost:3000/plugins',
  PORT: parseInt(process.env.PORT, 10) || 3000,
});
