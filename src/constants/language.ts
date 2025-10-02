import z from "zod";

export const LanguageEnum = z.enum(["en", "es"]);
export type LanguageType = z.infer<typeof LanguageEnum>;

export const languageOptions: { value: LanguageType; label: string }[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "es",
    label: "Español",
  },
];
