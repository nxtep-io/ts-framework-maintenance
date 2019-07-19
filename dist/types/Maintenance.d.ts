import { LoggerInstance } from 'ts-framework-common';
import { BaseRequest, BaseResponse } from "ts-framework";
export declare type MaintenanceValue = boolean | (() => boolean) | (() => Promise<boolean>);
export interface MaintenanceOptions {
    logger?: LoggerInstance;
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
    static middleware(active: MaintenanceValue, options?: MaintenanceOptions): (req: BaseRequest, res: BaseResponse, next: Function) => any;
}
