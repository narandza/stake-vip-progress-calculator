import z from "zod";

export const LanguageEnum = z.enum(["en", "es", "ar", "tr", "fr"]);
export type LanguageType = z.infer<typeof LanguageEnum>;

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "tr", label: "Türkçe" },
  { value: "ar", label: "العربية" },
];
