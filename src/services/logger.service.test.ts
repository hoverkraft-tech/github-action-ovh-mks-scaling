import { debug, info } from "@actions/core";
import { vi } from "vitest";
import { LoggerService } from "./logger.service.js";

vi.mock("@actions/core", () => ({
  info: vi.fn(),
  debug: vi.fn(),
}));

describe("LoggerService", () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("info", () => {
    it("should call info with the correct message", () => {
      const message = "This is an info message";

      loggerService.info(message);
      expect(info).toHaveBeenCalledWith(message);
    });
  });

  describe("debug", () => {
    it("should call debug with the correct message", () => {
      const message = "This is a debug message";

      loggerService.debug(message);
      expect(debug).toHaveBeenCalledWith(message);
    });
  });
});
