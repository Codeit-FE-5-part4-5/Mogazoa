declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL: string;
    readonly NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
    readonly NEXT_PUBLIC_KAKAO_CLIENT_SECRET: string;
    readonly NEXT_PUBLIC_KAKAO_REDIRECT_URI: string;
    readonly NEXT_PUBLIC_KAKAO_SIGNUP_URI: string;
    readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    readonly NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    readonly NEXT_PUBLIC_GOOGLE_REDIRECT_URI: string;
    readonly NEXT_PUBLIC_GOOGLE_SIGNUP_URI: string;
  }
}
