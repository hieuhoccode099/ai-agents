import { Logger } from "../core/logger";
export const handleError = (error, defaultMessage) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Logger.error(defaultMessage, errorMessage);
    return {
        success: false,
        message: defaultMessage,
        error: errorMessage,
    };
};
//# sourceMappingURL=error-handler.js.map