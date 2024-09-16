declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
        readonly NEXT_PUBLIC_BACKEND_API_ENDPOINT: string;
    }
}