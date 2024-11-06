/// <reference types='vite/client' />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_CODEX_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
