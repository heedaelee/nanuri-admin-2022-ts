interface AppInfoContextType {
  message: string;
  setMessage: (active: string) => void;
  loading: boolean;
  setLoading: (active: boolean) => void;
  error: string;
  setError: (active: string) => void;
}
declare module "*.png";

declare global {
  interface Window {
    Kakao: any;
  }
}
