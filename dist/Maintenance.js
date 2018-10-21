"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_common_1 = require("ts-framework-common");
const ts_framework_1 = require("ts-framework");
class Maintenance {
    /**
     * The express middleware for handling maintenance mode.
     *
     * @param req The request instance
     * @param res The response instance
     * @param next The reference to the middleware chain
     */
    static middleware(active, options = {}) {
        const logger = options.logger || ts_framework_common_1.Logger.getInstance();
        if (options.verbose) {
            logger.info(`Initializing server middleware: Versioning`);
        }
        return (req, res, next) => {
            if (typeof active === 'function') {
                // If it's a function lets call it
                const result = active();
                if (result instanceof Promise) {
                    return result.then((isActive) => {
                        if (isActive) {
                            // Send the error with next because we're in the callback function
                            next(new ts_framework_1.HttpError('Server in maintenance mode', ts_framework_1.HttpCode.Server.SERVICE_UNAVAILABLE));
                        }
                        else
                            next();
                    });
                }
                if (typeof result === 'boolean' && result) {
                    return next(new ts_framework_1.HttpError('Server in maintenance mode', ts_framework_1.HttpCode.Server.SERVICE_UNAVAILABLE));
                }
            }
            // Throw an error if its a boolean and it's true
            if (typeof active === 'boolean' && active) {
                return next(new ts_framework_1.HttpError('Server in maintenance mode', ts_framework_1.HttpCode.Server.SERVICE_UNAVAILABLE));
            }
            // Continue the request
            next();
        };
    }
}
exports.default = Maintenance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbnRlbmFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvTWFpbnRlbmFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBNkM7QUFDN0MsK0NBQThFO0FBUzlFO0lBQ0U7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUF3QixFQUFFLFVBQThCLEVBQUU7UUFDakYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWMsRUFBRSxFQUFFO1lBQzdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLGtDQUFrQztnQkFDbEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNiLGtFQUFrRTs0QkFDbEUsSUFBSSxDQUFDLElBQUksd0JBQVMsQ0FBQyw0QkFBNEIsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3pGLENBQUM7d0JBQUMsSUFBSTs0QkFBQyxJQUFJLEVBQUUsQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUE7Z0JBQ0osQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFTLENBQUMsNEJBQTRCLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxDQUFDO1lBQ0gsQ0FBQztZQUNELGdEQUFnRDtZQUNoRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFTLENBQUMsNEJBQTRCLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF4Q0QsOEJBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBIdHRwRXJyb3IsIEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIEh0dHBDb2RlIH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuXG5leHBvcnQgdHlwZSBNYWludGVuYW5jZVZhbHVlID0gYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKSB8ICgoKSA9PiBQcm9taXNlPGJvb2xlYW4+KTtcblxuZXhwb3J0IGludGVyZmFjZSBNYWludGVuYW5jZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIHZlcmJvc2U/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWludGVuYW5jZSB7XG4gIC8qKlxuICAgKiBUaGUgZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBtYWludGVuYW5jZSBtb2RlLlxuICAgKiBcbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcmVzIFRoZSByZXNwb25zZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbmV4dCBUaGUgcmVmZXJlbmNlIHRvIHRoZSBtaWRkbGV3YXJlIGNoYWluXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1pZGRsZXdhcmUoYWN0aXZlOiBNYWludGVuYW5jZVZhbHVlLCBvcHRpb25zOiBNYWludGVuYW5jZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgbG9nZ2VyLmluZm8oYEluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogVmVyc2lvbmluZ2ApO1xuICAgIH1cblxuICAgIHJldHVybiAocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBJZiBpdCdzIGEgZnVuY3Rpb24gbGV0cyBjYWxsIGl0XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGFjdGl2ZSgpO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbigoaXNBY3RpdmUpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAvLyBTZW5kIHRoZSBlcnJvciB3aXRoIG5leHQgYmVjYXVzZSB3ZSdyZSBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgICAgbmV4dChuZXcgSHR0cEVycm9yKCdTZXJ2ZXIgaW4gbWFpbnRlbmFuY2UgbW9kZScsIEh0dHBDb2RlLlNlcnZlci5TRVJWSUNFX1VOQVZBSUxBQkxFKSk7XG4gICAgICAgICAgICB9IGVsc2UgbmV4dCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJyAmJiByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChuZXcgSHR0cEVycm9yKCdTZXJ2ZXIgaW4gbWFpbnRlbmFuY2UgbW9kZScsIEh0dHBDb2RlLlNlcnZlci5TRVJWSUNFX1VOQVZBSUxBQkxFKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIGl0cyBhIGJvb2xlYW4gYW5kIGl0J3MgdHJ1ZVxuICAgICAgaWYgKHR5cGVvZiBhY3RpdmUgPT09ICdib29sZWFuJyAmJiBhY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobmV3IEh0dHBFcnJvcignU2VydmVyIGluIG1haW50ZW5hbmNlIG1vZGUnLCBIdHRwQ29kZS5TZXJ2ZXIuU0VSVklDRV9VTkFWQUlMQUJMRSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBDb250aW51ZSB0aGUgcmVxdWVzdFxuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfVxufSJdfQ==