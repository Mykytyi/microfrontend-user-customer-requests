/**
 * Backend service error class used for throwing errors
 * returned from backend services
 */
export default class BackendServiceError extends Error {
  public readonly status: number;

  public readonly statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super('');
    if (message) {
      this.message = message;
    }
    this.status = status;
    this.statusText = statusText;
  }

  /**
   * Wrap to http response json
   * @returns {any}
   */
  public wrapToResponse(): any {
    return {
      status: this.status,
      statusText: this.statusText,
      message: this.message,
    };
  }
}
