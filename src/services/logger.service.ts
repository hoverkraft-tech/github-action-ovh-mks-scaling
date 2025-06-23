import { debug, info } from "@actions/core";

export class LoggerService {
  info(message: string): void {
    info(message);
  }

  debug(message: string) {
    debug(message);
  }
}
