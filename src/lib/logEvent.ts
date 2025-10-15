import { LanguageType } from "@/modules/constants/language";

export async function logEvent(
  type: "visit" | "calculate" | "copy",
  language: LanguageType
) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, language }),
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
