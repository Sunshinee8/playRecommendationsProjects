interface AppConfig {
    serverBaseUrl: string;
  }
//   const ENV = import.meta.env.VITE_RUN_TIME_ENV;
  const CONFIG_MAP: Record<string, AppConfig> = {
    dev: {
      serverBaseUrl: "http://127.0.0.1:3000",
    },
    prod: {
      serverBaseUrl: "",
    },
  };
  
//   export const baseConfig = CONFIG_MAP[ENV] || CONFIG_MAP.prod;
  
export const baseConfig=CONFIG_MAP.prod;
  