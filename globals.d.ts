export {};
declare global {
  interface ProcessEnv {
    STRIPE_SECRET_PAYMENT_INTENT_WEBHOOK_ENDPOINT_SECRET: string;
    STRIPE_SECRET_KEY: string;
    SUPERFAST_HOST: any;
    STRIPE_PUBLIC_KEY: string;
    PAYMENT_IMPLEMENTATIONS: any;
    STOREFRONT_CURRENCY: any;
    ENABLE_JS_API_CLIENT_PROFILING: any;
    SUPERFAST_TENANT_IDENTIFIER: any;
    CRYSTALLIZE_ACCESS_TOKEN_ID: any;
    STOREFRONT_THEME: any;
    CRYSTALLIZE_TENANT_ID: any;
    STOREFRONT_STATIC_LOGO_URL: string;
    STOREFRONT_LANGUAGE: any;
    CRYSTALLIZE_TENANT_IDENTIFIER: any;
    STOREFRONT_IDENTIFIER: any;
    SUPERFAST_ACCESS_TOKEN_SECRET: any;
    STOREFRONT_CONFIG_FILE: any;
    STORAGE_DSN: any;
    MAILER_DSN: any;
    JWT_SECRET: any;
    NODE_ENV: "development" | "production" | "test";
  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
