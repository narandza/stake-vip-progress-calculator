import z from "zod";

export const LanguageEnum = z.enum(["en", "es"]);
export type LanguageType = z.infer<typeof LanguageEnum>;
