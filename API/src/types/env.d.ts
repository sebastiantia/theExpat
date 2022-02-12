declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REIDS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
    }
  }
}

export {}
