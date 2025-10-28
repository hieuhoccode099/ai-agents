import { Logger } from "../core/logger";

export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
}

export const handleError = (
  error: unknown,
  defaultMessage: string
): ErrorResponse => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  Logger.error(defaultMessage, errorMessage);

  return {
    success: false,
    message: defaultMessage,
    error: errorMessage,
  };
};
