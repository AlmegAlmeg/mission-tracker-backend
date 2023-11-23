import { ZodError } from "zod";

export function parseErrors(rawErrors: ZodError) {
  const errors = {} as Record<string, string>;
  const formattedErrors = rawErrors.format() as Record<string, any>;

  for (const key in formattedErrors) {
    if (!formattedErrors[key]?._errors) continue;
    errors[key] = formattedErrors[key]?._errors[0];
  }

  return { message: "Validation error", errors: { ...errors } };
}
