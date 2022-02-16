declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAPBOX_ACCESS: string;
    }
  }
}

export {}
