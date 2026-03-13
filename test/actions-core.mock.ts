export const debug = jest.fn<(message: string) => void>();
export const getInput = jest.fn<(name: string, options?: { required?: boolean }) => string>();
export const info = jest.fn<(message: string) => void>();
export const setFailed = jest.fn<(message: string) => void>();
export const setOutput = jest.fn<(name: string, value: unknown) => void>();
