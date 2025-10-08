import z from "zod";

export const LanguageEnum = z.enum(["en", "es", "ar", "tr", "fr"]);
export type LanguageType = z.infer<typeof LanguageEnum>;

export const languageOptions = [
  { value: "en", label: "English", icon: "🇬🇧" },
  { value: "es", label: "Español", icon: "🇪🇸" },
  { value: "fr", label: "Français", icon: "🇫🇷" },
  { value: "tr", label: "Türkçe", icon: "🇹🇷" },
  { value: "ar", label: "العربية", icon: "🇸🇦" },
];
