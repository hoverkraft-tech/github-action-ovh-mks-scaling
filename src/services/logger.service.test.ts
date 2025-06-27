import { LoggerService } from "./logger.service";
import { debug, info } from "@actions/core";

jest.mock("@actions/core", () => ({
  info: jest.fn(),
  debug: jest.fn(),
}));

describe("LoggerService", () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
