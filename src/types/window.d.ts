declare global {
  interface Window {
    navigation?: {
      addEventListener: (
        event: string,
        cb: (e: { destination: { url: string | URL } }) => void,
      ) => void;
      removeEventListener: (
        event: string,
        cb: (e: { destination: { url: string | URL } }) => void,
      ) => void;
    };
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
  }
}

export type {};
