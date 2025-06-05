export const loggerClient = (error: unknown) => {
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[${timestamp}] [CLIENT ERROR]:`, message);
  }
};
