import { Logger } from 'ts-framework-common';
import { HttpError, BaseRequest, BaseResponse, HttpCode } from "ts-framework";

export type MaintenanceValue = boolean | (() => boolean) | (() => Promise<boolean>);

export interface MaintenanceOptions {
  logger?: Logger;
  verbose?: boolean;
}

export default class Maintenance {
  /**
   * The express middleware for handling maintenance mode.
   * 
   * @param req The request instance
   * @param res The response instance
   * @param next The reference to the middleware chain
   */
  public static middleware(active: MaintenanceValue, options: MaintenanceOptions = {}) {
    const logger = options.logger || Logger.getInstance();

    if (options.verbose) {
      logger.info(`Initializing server middleware: Versioning`);
    }

    return (req: BaseRequest, res: BaseResponse, next: Function) => {
      if (typeof active === 'function') {
        // If it's a function lets call it
        const result = active();
        if (result instanceof Promise) {
          return result.then((isActive) => {
            if (isActive) {
              // Send the error with next because we're in the callback function
              next(new HttpError('Server in maintenance mode', HttpCode.Server.SERVICE_UNAVAILABLE));
            } else next();
          })
        }
        if (typeof result === 'boolean' && result) {
          return next(new HttpError('Server in maintenance mode', HttpCode.Server.SERVICE_UNAVAILABLE));
        }
      }
      // Throw an error if its a boolean and it's true
      if (typeof active === 'boolean' && active) {
        return next(new HttpError('Server in maintenance mode', HttpCode.Server.SERVICE_UNAVAILABLE));
      }

      // Continue the request
      next();
    }
  }
}