interface AppInfoContextType {
  message: string;
  setMessage: (active: string) => void;
  loading: boolean;
  setLoading: (active: boolean) => void;
  error: string;
  setError: (active: string) => void;
}
