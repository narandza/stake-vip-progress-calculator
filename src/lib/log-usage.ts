"use server";

import { supabase } from "@/lib/supabase";
import { LanguageType } from "@/modules/constants/language";

export async function logUsage(
  type: "visit" | "calculate" | "copy",
  language: LanguageType
) {
  try {
    const { error } = await supabase
      .from("usage_logs")
      .insert([{ type, language }]);

    if (error) {
      console.error("Failed to log usage:", error.message);
    }
  } catch (err) {
    console.error("Unexpected error logging usage:", err);
  }
}
