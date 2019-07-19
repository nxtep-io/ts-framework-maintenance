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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbnRlbmFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvTWFpbnRlbmFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBNkQ7QUFDN0QsK0NBQThFO0FBUzlFLE1BQXFCLFdBQVc7SUFDOUI7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUF3QixFQUFFLFVBQThCLEVBQUU7UUFDakYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXRELElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxPQUFPLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWMsRUFBRSxFQUFFO1lBQzdELElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxrQ0FBa0M7Z0JBQ2xDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO2dCQUN4QixJQUFJLE1BQU0sWUFBWSxPQUFPLEVBQUU7b0JBQzdCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUM5QixJQUFJLFFBQVEsRUFBRTs0QkFDWixrRUFBa0U7NEJBQ2xFLElBQUksQ0FBQyxJQUFJLHdCQUFTLENBQUMsNEJBQTRCLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO3lCQUN4Rjs7NEJBQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFBO2lCQUNIO2dCQUNELElBQUksT0FBTyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sRUFBRTtvQkFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSx3QkFBUyxDQUFDLDRCQUE0QixFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztpQkFDL0Y7YUFDRjtZQUNELGdEQUFnRDtZQUNoRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksd0JBQVMsQ0FBQyw0QkFBNEIsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7YUFDL0Y7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF4Q0QsOEJBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgSHR0cEVycm9yLCBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBIdHRwQ29kZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcblxuZXhwb3J0IHR5cGUgTWFpbnRlbmFuY2VWYWx1ZSA9IGJvb2xlYW4gfCAoKCkgPT4gYm9vbGVhbikgfCAoKCkgPT4gUHJvbWlzZTxib29sZWFuPik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbnRlbmFuY2VPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIHZlcmJvc2U/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWludGVuYW5jZSB7XG4gIC8qKlxuICAgKiBUaGUgZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBtYWludGVuYW5jZSBtb2RlLlxuICAgKiBcbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcmVzIFRoZSByZXNwb25zZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbmV4dCBUaGUgcmVmZXJlbmNlIHRvIHRoZSBtaWRkbGV3YXJlIGNoYWluXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1pZGRsZXdhcmUoYWN0aXZlOiBNYWludGVuYW5jZVZhbHVlLCBvcHRpb25zOiBNYWludGVuYW5jZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgbG9nZ2VyLmluZm8oYEluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogVmVyc2lvbmluZ2ApO1xuICAgIH1cblxuICAgIHJldHVybiAocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBJZiBpdCdzIGEgZnVuY3Rpb24gbGV0cyBjYWxsIGl0XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGFjdGl2ZSgpO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbigoaXNBY3RpdmUpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAvLyBTZW5kIHRoZSBlcnJvciB3aXRoIG5leHQgYmVjYXVzZSB3ZSdyZSBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgICAgbmV4dChuZXcgSHR0cEVycm9yKCdTZXJ2ZXIgaW4gbWFpbnRlbmFuY2UgbW9kZScsIEh0dHBDb2RlLlNlcnZlci5TRVJWSUNFX1VOQVZBSUxBQkxFKSk7XG4gICAgICAgICAgICB9IGVsc2UgbmV4dCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdib29sZWFuJyAmJiByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChuZXcgSHR0cEVycm9yKCdTZXJ2ZXIgaW4gbWFpbnRlbmFuY2UgbW9kZScsIEh0dHBDb2RlLlNlcnZlci5TRVJWSUNFX1VOQVZBSUxBQkxFKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIGl0cyBhIGJvb2xlYW4gYW5kIGl0J3MgdHJ1ZVxuICAgICAgaWYgKHR5cGVvZiBhY3RpdmUgPT09ICdib29sZWFuJyAmJiBhY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQobmV3IEh0dHBFcnJvcignU2VydmVyIGluIG1haW50ZW5hbmNlIG1vZGUnLCBIdHRwQ29kZS5TZXJ2ZXIuU0VSVklDRV9VTkFWQUlMQUJMRSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBDb250aW51ZSB0aGUgcmVxdWVzdFxuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfVxufSJdfQ==