import { vi } from "vitest";

export const debug = vi.fn<(message: string) => void>();
export const getInput =
  vi.fn<(name: string, options?: { required?: boolean }) => string>();
export const info = vi.fn<(message: string) => void>();
export const setFailed = vi.fn<(message: string) => void>();
export const setOutput = vi.fn<(name: string, value: unknown) => void>();
