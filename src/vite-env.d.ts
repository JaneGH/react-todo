interface ImportMetaEnv {
  readonly VITE_AIRTABLE_BASE_ID: string;
  readonly VITE_TABLE_NAME: string;
  readonly VITE_AIRTABLE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}