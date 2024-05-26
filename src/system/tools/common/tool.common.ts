export type Status = "success" | "error";

export type ResultProcess = {
  status: Status;
  message?: string | null;
  error?: string | null;
};

export type OnProcess = ({ status, message, error }: ResultProcess) => void;

export function wait(seconds: number): Promise<void> {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


export class StringBuilder {
  private buffer: string = "";

  public append(str: string): void {
    this.buffer = this.buffer.concat(str);
  }

  public toString(): string {
    return this.buffer;
  }

  public clear(): void {
    this.buffer = "";
  }
}

export const AsyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const minutesToMilliseconds = (minutes: number) => {
  return minutes * 60000; // 1 minuto = 60000 milisegundos
};

export const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const groupBy = <T>(array: T[], callback: (item: T) => string): Record<string, T[]> => {
  return array.reduce((grouped, item) => {
    const key = callback(item);
    (grouped[key] = grouped[key] || []).push(item);
    return grouped;
  }, {} as Record<string, T[]>);
};
