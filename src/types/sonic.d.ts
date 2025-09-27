declare const SonicNet: {
  SonicSocket: new (options?: any) => {
    send(message: string, callback?: () => void): void;
  };
  SonicServer: new (options?: any) => {
    on(event: "message", callback: (msg: string) => void): void;
    start(): void;
    stop(): void;
  };
  SonicCoder: new (options?: any) => {
    charToFreq(char: string): number;
    freqToChar(freq: number): string | null;
  };
};
